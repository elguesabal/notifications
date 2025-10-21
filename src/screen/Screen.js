import { StyleSheet, View, Text } from "react-native";
import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";

import { getToken, notificationHandler } from "../functions/notifications.js";
import { useReadNfc } from "../functions/nfc.js";

import ScreenNotification from "./ScreenNotification.js";

export default function Screen() {
	const [token, setToken] = useState("");
	const [data, setData] = useState(null);

	useReadNfc(setData);

	useEffect(() => {
		getToken(setToken);
		const subscription = Notifications.addNotificationResponseReceivedListener((res) => notificationHandler(res, setData));
		(async () => {
			const lastNotification = await Notifications.getLastNotificationResponse();
			if (lastNotification) notificationHandler(lastNotification, setData);
		})();
		return (() => subscription.remove());
	}, []);
	if (data) return (<ScreenNotification data={data} />);
	return (
		<View style={styles.container} >
			<Text style={styles.token} selectable >{token}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center"
	},
	token: {
		paddingHorizontal: "10%"
	}
});
