import { StyleSheet, Text, View } from "react-native";

/**
 * @author VAMPETA
 * @brief TELA QUE EXIBE O TOKEN
 * @param token TOKEN DO DISPOSITIVO
*/
export default function Token({ token }) {
	return (
		<View style={styles.container} >
			<Text selectable >{token}</Text>
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