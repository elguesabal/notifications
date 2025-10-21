import { StatusBar } from "expo-status-bar";

import Screen from "./src/screen/Screen.js";

export default function App() {
	return (
		<>
			<Screen />
			<StatusBar style="auto" />
		</>
	);
}
