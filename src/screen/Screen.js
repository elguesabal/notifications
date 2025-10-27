import { useToken } from "../functions/token.js";
import { useNotification } from "../functions/notification.js";
import { useNfc } from "../functions/nfc.js";

import Token from "./Token.js";
import Notification from "./Notification.js";
import Nfc from "./Nfc.js";

import { View } from "react-native";
import DynamicRenderer from "./DynamicRenderer.js";

function Teste() {
	const jsonDefinition = {
		type: "View",
		props: { style: { padding: 30, alignItems: "center" } },
		children: [
			{
				type: "Text",
				props: { style: { fontSize: 24, fontWeight: "bold" } },
				children: "UI gerada dinamicamente!",
			},
			{
				type: "TouchableOpacity",
				props: { style: { backgroundColor: "#007AFF", padding: 10, marginTop: 20 }, onPress: "handlePress" },
				children: {
					type: "Text",
					props: { style: { color: "#fff" } },
					children: "Clique aqui",
				},
			},
		],
	};

	const eventHandlers = {
		handlePress: () => alert("Botão clicado!"),
	};

	return (
		<View style={{ flex: 1 }}>
			<DynamicRenderer json={jsonDefinition} eventHandlers={eventHandlers} />
		</View>
	);
}

/**
 * @author VAMPETA
 * @brief TELA PRINCIPAL
*/
export default function Screen() {
	const token = useToken();
	const notification = useNotification();
	const nfc = useNfc();

	return (<Teste />);
	if (nfc) return (<Nfc nfc={nfc} />);
	if (notification) return (<Notification notification={notification} />);
	if (token) return (<Token token={token} />);
}