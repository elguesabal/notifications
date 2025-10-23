import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { useRef, useState, useEffect } from "react";

/**
 * @author VAMPETA
 * @brief DECODIFICA O BINARIO DO NFC PARA TEXTO
 * @param payload BINARIO PARA SER CODIFICADO
*/
function decodeText(payload) {
	const langLength = payload[0];
	const textBytes = payload.slice(1 + langLength);
	return String.fromCharCode.apply(null, textBytes);
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
			if (reading.current) return ;
			reading.current = true;
			try {
				await NfcManager.requestTechnology(NfcTech.Ndef);
				const tag = await NfcManager.getTag();
				if (tag?.ndefMessage?.length > 0) setNfc(decodeText(tag.ndefMessage[0].payload));
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