import { useToken } from "../functions/token.js";
import { useNotification } from "../functions/notification.js";
import { useNfc } from "../functions/nfc.js";

import Token from "./Token.js";
import Notification from "./Notification.js";
import Nfc from "./Nfc.js";

/**
 * @author VAMPETA
 * @brief TELA PRINCIPAL
*/
export default function Screen() {
	const token = useToken();
	const notification = useNotification();
	const nfc = useNfc();

	if (nfc) return (<Nfc nfc={nfc} />);
	if (notification) return (<Notification data={notification} />);
	if (token) return (<Token token={token} />);
}