import NfcManager, { NfcTech } from "react-native-nfc-manager";

export async function readNfc() { // DEVO CRIAR UM HOOK E EVITAR ACONTECER MULTIPLAS CHAMADAS EM RERENDERIZACOES
	try {
		await NfcManager.requestTechnology(NfcTech.Ndef);
		const tag = await NfcManager.getTag();
		// console.log("Tag lida: ", tag);
		// console.log(tag.ndefMessage)
		// console.log(writeText(tag.ndefMessage.payload))
		if (tag.ndefMessage && tag.ndefMessage.length > 0) {
			const payload = tag.ndefMessage[0].payload;
			const text = writeText(payload);
			console.log("Texto da tag:", text);
		}
	} catch (error) {
		console.log("Erro: ", error);
	} finally {
		console.log("finally");
		NfcManager.cancelTechnologyRequest();
		// setTimeout(readNfc, 500);
	}
}

function writeText(payload) {
	const languageCodeLength = payload[0];
	const textBytes = payload.slice(1 + languageCodeLength);
	const text = String.fromCharCode.apply(null, textBytes);

	return (text);
}