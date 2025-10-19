import { StatusBar } from "expo-status-bar";
import NfcManager from "react-native-nfc-manager";
import { readNfc } from "./src/functions/nfc.js";

import Screen from "./src/screen/Screen.js";

NfcManager.start();

export default function App() {
	readNfc();
	return (
		<>
			{/* <Screen /> */}
			<StatusBar style="auto" />
		</>
	);
}
