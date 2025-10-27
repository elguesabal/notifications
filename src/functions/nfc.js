import { Linking } from "react-native";
import { useRef, useState, useEffect } from "react";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import axios from "axios";

import API_URL from "../api.js";

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

/**
 * @author VAMPETA
 * @brief FAZ A REQUISICAO A API DA TAG
 * @param url URL GRAVADA NA TAG
 * @param setNfc FUNCAO QUE SALVA O RESULTADO DA REQUISICAO (SE NAO FOR REDIRECIONADO)
*/
async function request(url, setNfc) {
	try {
		const res = await axios.get(API_URL);

		if (res.status !== 200) return ;
		if (res.data.redirect) await Linking.openURL(res.data.redirect);
		if (res.data.data) setNfc(res.data.data);
	} catch (error) {
		console.log("Error: ", error);
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
				if (result.url) await request(result.url, setNfc);
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