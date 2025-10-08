import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		// shouldShowAlert: true, // OBSOLETO
		shouldShowBanner: true,
		// shouldShowList: true,
		shouldPlaySound: true,
		shouldSetBadge: true
	})
});

async function getToken(setToken) {
	const settings = await Notifications.getPermissionsAsync();
	if (!settings.granted) await Notifications.requestPermissionsAsync();
	// setToken((await Notifications.getExpoPushTokenAsync()).data);
	try {
		const ExpoPush = await Notifications.getExpoPushTokenAsync();
		console.log("teste: ", ExpoPush);
	} catch (error) {
		console.log("erro: ", error);
	}
}

// async function notification() {
// 	await Notifications.scheduleNotificationAsync({
// 		content: {
// 			title: "title",
// 			body: "body",
// 		},
// 		trigger: {
// 		}
// 	});
// }

export default function App() {
	const [token, setToken] = useState("");

	useEffect(() => {
		getToken(setToken);
		// notification();
	}, []);
// console.log("token: ", token)
	return (
		<View style={styles.container} >
			<Text>{token}</Text>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
