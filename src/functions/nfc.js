import { Linking } from "react-native";
import { useRef, useState, useEffect } from "react";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import axios from "axios";

/**
 * @author VAMPETA
 * @brief DECODIFICA O BINARIO DO NFC
 * @param tag INFORMACOES DA TAG NFC
*/
function decode(tag) {
	const uriPrefixes = [
		"", "http://www.", "https://www.", "http://", "https://",
		"tel:", "mailto:", "ftp://anonymous:anonymous@", "ftp://ftp.",
		"ftps://", "sftp://", "smb://", "nfs://", "ftp://", "dav://",
		"news:", "telnet://", "imap:", "rtsp://", "urn:", "pop:",
		"sip:", "sips:", "tftp:", "btspp://", "btl2cap://", "btgoep://",
		"tcpobex://", "irdaobex://", "file://", "urn:epc:id:",
		"urn:epc:tag:", "urn:epc:pat:", "urn:epc:raw:", "urn:epc:",
		"urn:nfc:"
	];

	if (tag?.ndefMessage?.length <= 0) return (null);
	if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) return ({ text: (uriPrefixes[tag.ndefMessage[0].payload[0]] || "") + String.fromCharCode.apply(null, tag.ndefMessage[0].payload.slice(1)) });
	if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) return ({ url: (uriPrefixes[tag.ndefMessage[0].payload[0]] || "") + String.fromCharCode.apply(null, tag.ndefMessage[0].payload.slice(1)) });
	return (null);
}


async function reqApi(url) {
	try {
		const res = await axios.get("https://jailane.vercel.app/nfc");
		console.log(res.data);
	} catch (error) {
		console.log("deu erro");
	}
}

/**
 * @author VAMPETA
 * @brief HOOK QUE LE O NFC
 * @return RETORNA O CONTEUDO LIDO NO NFC
*/
export function useNfc() {
	const reading = useRef(false);
	const [nfc, setNfc] = useState(null);

	useEffect(() => {
		NfcManager.start();
		(async function startNfc() {
			if (reading.current) return;
			reading.current = true;
			try {
				await NfcManager.requestTechnology(NfcTech.Ndef);
				const result = decode(await NfcManager.getTag());
				// if (result.url) await Linking.openURL(result.url);
				if (result.url) await reqApi(result.url);
				if (result.text) setNfc(result.text);
			} catch (error) {
				setNfc(error.message);
			} finally {
				await NfcManager.cancelTechnologyRequest();
				reading.current = false;
				setTimeout(startNfc, 200);
			}
		})();
		return (() => {
			NfcManager.cancelTechnologyRequest();
			NfcManager.stop();
		});
	}, []);
	return (nfc);
}