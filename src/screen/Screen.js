import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";

import { getToken } from "../functions/token.js";
import { notificationHandler } from "../functions/notification.js";
import { useReadNfc } from "../functions/nfc.js";

import Token from "./Token.js";
import Notification from "./Notification.js";
import Nfc from "./Nfc.js";

/**
 * @author VAMPETA
 * @brief TELA PRINCIPAL
*/
export default function Screen() {
	const [data, setData] = useState(null);

	useReadNfc(setData);
	useEffect(() => { // CRIAR UM HOOK??
		getToken(setData);
		const subscription = Notifications.addNotificationResponseReceivedListener((res) => notificationHandler(res, setData));
		(async () => {
			const lastNotification = await Notifications.getLastNotificationResponse();
			if (lastNotification) notificationHandler(lastNotification, setData);
		})();
		return (() => subscription.remove());
	}, []);

	if (data?.nfc) return (<Nfc nfc={data.nfc} />);
	if (data?.notification) return (<Notification data={data.notification} />);
	if (data?.token) return (<Token token={data.token} />);
}