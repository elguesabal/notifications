import { Text, View, Image } from "react-native";

/**
 * @author VAMPETA
 * @brief TELA QUE EXIBE O CONTEUDO DA NOTIFICACAO
 * @param notification INFORMACOES PASSADAS PELA NOTIFICACAO
*/
export default function Notification({ notification }) {
	return (
		<View style={notification?.style?.container} >
			{notification?.title && <Text style={notification?.style?.title} >{notification.title}</Text>}
			{notification?.text && <Text style={notification?.style?.text} >{notification.text}</Text>}
			{notification?.img && <Image style={notification?.style?.img} source={{ uri: notification.img }} />}
		</View>
	);
}