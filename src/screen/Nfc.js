import { StyleSheet, Text, View } from "react-native";

/**
 * @author VAMPETA
 * @brief TELA QUE EXIBE O CONTEUDO DO NFC
 * @param nfc INFORMACOES PASSADAS PELO NFC
*/
export default function Nfc({ nfc }) {
	return (
		<View style={styles.container} >
			<Text>{nfc}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center"
	}
});
