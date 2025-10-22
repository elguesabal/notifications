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
 * @param setData FUNCAO QUE SALVA O TOKEN
*/
export async function getToken(setData) {
	if (!Device.isDevice) return (null);
	const settings = await Notifications.getPermissionsAsync();
	if (settings.status !== "granted") {
		const res = await Notifications.requestPermissionsAsync();
		if (res.status !== "granted") return (null);
	}
	try {
		const projectId = Constants.expoConfig.extra.eas.projectId;
		setData({ token: (await Notifications.getExpoPushTokenAsync({ projectId })).data });
	} catch (error) {
		setData({ token: error.message });
	}
}