import { StyleSheet, Text, View, Image } from "react-native";
import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";

import { getToken, notificationHandler } from "../functions/notifications.js";

export default function Screen() {
	const [token, setToken] = useState("");
	const [data, setData] = useState(null);

	useEffect(() => {
		getToken(setToken);
		const subscription = Notifications.addNotificationResponseReceivedListener((res) => notificationHandler(res, setData));
		return (() => subscription.remove());
	}, []);
	if (data) {
		return (
			<View style={data?.style?.container} >
				{data?.title && <Text style={data?.style?.title} >{data.title}</Text>}
				{data?.text && <Text style={data?.style?.text} >{data.text}</Text>}
				{data?.img && <Image style={data?.style?.img} source={{ uri: data.img }} />}
			</View>
		);
	}
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