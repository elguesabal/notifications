import { Linking, Platform } from "react-native";

/**
 * @author VAMPETA
 * @brief MANIPULA DADOS VINDO DA NOTIFICACAO
 * @param res CONTEM OS DADOS DA NOTIFICACAO
 * @param setData SALVA OS DADOS RECEBIDOS NA NOTIFICACAO
*/
export async function notificationHandler(res, setData) {
	const data = res.notification.request.content.data;

	if (data.url) await Linking.openURL(data.url);
	if (data) setData({ notification: data });
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