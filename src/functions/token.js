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

/**
 * @author VAMPETA
 * @brief OBTEM O TOKEN EXPO PARA PUSH NOTIFICATION
 * @return RETORNA O TOKEN EXPO
*/
export function useToken() {
	const [token, setToken] = useState(null);

	useEffect(() => {
		(async () => {
			if (!Device.isDevice) return (null);
			const settings = await Notifications.getPermissionsAsync();
			if (settings.status !== "granted") {
				const res = await Notifications.requestPermissionsAsync();
				if (res.status !== "granted") return (null);
			}
			try {
				const projectId = Constants.expoConfig.extra.eas.projectId;
				setToken((await Notifications.getExpoPushTokenAsync({ projectId })).data);
			} catch (error) {
				setToken(error.message);
			}
		})();
	}, []);
	return (token);
}