import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import { useRef, useState, useEffect } from "react";

/**
 * @author VAMPETA
 * @brief DECODIFICA O BINARIO DO NFC PARA TEXTO
 * @param payload BINARIO PARA SER CODIFICADO
*/
function decodeText(payload) {
	return (String.fromCharCode.apply(null, payload.slice(1 + payload[0])));
}

/**
 * @author VAMPETA
 * @brief DECODIFICA O BINARIO DO NFC PARA URI
 * @param payload BINARIO PARA SER CODIFICADO
*/
function decodeUri(payload) {
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

	return ((uriPrefixes[payload[0]] || "") + String.fromCharCode.apply(null, payload.slice(1)));
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
				const tag = await NfcManager.getTag();
				if (tag?.ndefMessage?.length <= 0) return;
				if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) setNfc(decodeText(tag.ndefMessage[0].payload));
				if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) setNfc(decodeUri(tag.ndefMessage[0].payload));
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