import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { useEffect, useRef } from "react";

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
 * @param setData FUNCAO QUE SALVA AS INFORMACOES DO NFC
*/
export function useReadNfc(setData) {
	const reading = useRef(false);

	async function startNfc() {
		if (reading.current) return ;
		reading.current = true;

		try {
			await NfcManager.requestTechnology(NfcTech.Ndef);
			const tag = await NfcManager.getTag();

			if (tag?.ndefMessage?.length > 0) setData({ nfc: decodeText(tag.ndefMessage[0].payload) });
		} catch (error) {
			console.log("Erro ao ler NFC:", error);
		} finally {
			await NfcManager.cancelTechnologyRequest();
			reading.current = false;
			setTimeout(startNfc, 50);
		}
	}

	useEffect(() => {
		NfcManager.start();
		startNfc();
		return (() => {
			NfcManager.cancelTechnologyRequest();
			NfcManager.stop();
		});
	}, []);
}