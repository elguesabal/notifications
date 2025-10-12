import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowBanner: true,
		shouldPlaySound: true,
		shouldSetBadge: true
	})
});

async function getToken(setToken) {
	if (!Device.isDevice) return (null);
	const settings = await Notifications.getPermissionsAsync();
	if (settings.status !== "granted") {
		const res = await Notifications.requestPermissionsAsync();
		if (res.status !== "granted") return (null);
	}
	try {
		const projectId = Constants.expoConfig.extra.eas.projectId;
		const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
		setToken(token);
		console.log(token);
	} catch (error) {
		setToken(error.message);
		console.log(error.message);
	}
}

export default function App() {
	const [token, setToken] = useState("");

	useEffect(() => { getToken(setToken) }, []);
	return (
		<View style={styles.container} >
			{/* <Text style={styles.token} >{token}</Text> */}
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	token: {
		paddingHorizontal: "10%"
	}
});
