import { Text, View, Image } from "react-native";

/**
 * @author VAMPETA
 * @brief TELA QUE EXIBE O CONTEUDO DA NOTIFICACAO
 * @param data INFORMACOES PASSADAS PELA NOTIFICACAO
*/
export default function Notification({ data }) {
	return (
		<View style={data?.style?.container} >
			{data?.title && <Text style={data?.style?.title} >{data.title}</Text>}
			{data?.text && <Text style={data?.style?.text} >{data.text}</Text>}
			{data?.img && <Image style={data?.style?.img} source={{ uri: data.img }} />}
		</View>
	);
}