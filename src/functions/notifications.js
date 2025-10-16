import { Linking } from "react-native";
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

/**
 * @author VAMPETA
 * @brief OBTEM O TOKEN EXPO PARA PUSH NOTIFICATION
 * @param setToken FUNCAO QUE SALVA O TOKEN
*/
export async function getToken(setToken) {
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

/**
 * @author VAMPETA
 * @brief MANIPULA DADOS VINDO DA NOTIFICACAO
 * @param res CONTEM OS DADOS DA NOTIFICACAO
 * @param setData SALVA OS DADOS RECEBIDOS NA NOTIFICACAO
*/
export async function notificationHandler(res, setData) {
	const data = res.notification.request.content.data;

	if (data.url) {
		await Linking.openURL(data.url);
	} else if (data) {
		setData(data);
	}
}