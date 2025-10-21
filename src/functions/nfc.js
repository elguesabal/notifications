import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { useEffect, useRef } from "react";

function decodeText(payload) {
	const langLength = payload[0];
	const textBytes = payload.slice(1 + langLength);
	return String.fromCharCode.apply(null, textBytes);
}

export function useReadNfc(setData) {
	const reading = useRef(false);

	async function startNfc() {
		if (reading.current) return ;
		reading.current = true;

		try {
			await NfcManager.requestTechnology(NfcTech.Ndef);
			const tag = await NfcManager.getTag();

			if (tag?.ndefMessage?.length > 0) {
				const text = decodeText(tag.ndefMessage[0].payload);
				console.log("Texto lido:", text);
				// Alert.alert("Tag detectada", text);
				setData({ textNfc: text });
			}
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