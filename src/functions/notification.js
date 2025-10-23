import { Linking, Platform } from "react-native";
import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";

/**
 * @author VAMPETA
 * @brief MANIPULA DADOS VINDO DA NOTIFICACAO
 * @param res CONTEM OS DADOS DA NOTIFICACAO
 * @param setNotification SALVA OS DADOS RECEBIDOS NA NOTIFICACAO
*/
async function notificationHandler(res, setNotification) {
	const notification = res.notification.request.content.data;

	if (notification.url) await Linking.openURL(notification.url);
	if (notification) setNotification(notification);
}

/**
 * @author VAMPETA
 * @brief HOOK QUE CAPUTRA INFORMACOES DA NOTIFICACAO CLICADA
 * @return RETORNA O CONTEUDO RECEBIDO PELA NOTIFICACAO
*/
export function useNotification() {
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		const subscription = Notifications.addNotificationResponseReceivedListener((res) => notificationHandler(res, setNotification));
		(async () => {
			const lastNotification = await Notifications.getLastNotificationResponse();
			if (lastNotification) notificationHandler(lastNotification, setNotification);
		})();
		return (() => subscription.remove());
	}, []);
	return (notification);
}

// /**
//  * @author VAMPETA
//  * @brief CRIA CANAIS DE NOTIFICACOES
// */
// export async function setChannel() {
// 	if (Platform.OS !== "android") return ;
// 	await Notifications.setNotificationChannelAsync("uno", {
// 		name: "Vou comer seu cu no uno",
// 		importance: Notifications.AndroidImportance.HIGH,
// 		sound: "uno.wav",
// 		vibrationPattern: [250, 250, 250, 250],
// 		lightColor: "#ffffffff",
// 	});
// 	await Notifications.setNotificationChannelAsync("tira", {
// 		name: "Tira que eu vou cagar",
// 		importance: Notifications.AndroidImportance.HIGH,
// 		sound: "tira.wav",
// 		vibrationPattern: [250, 250, 250, 250],
// 		lightColor: "#ffffffff",
// 	});
// }