import { Text, View, Image } from "react-native";

export default function ScreenNotification({ data }) {
	return (
		<>
			<Text>{data.textNfc}</Text>
		</>
	);
	return (
		<View style={data?.style?.container} >
			{data?.title && <Text style={data?.style?.title} >{data.title}</Text>}
			{data?.text && <Text style={data?.style?.text} >{data.text}</Text>}
			{data?.img && <Image style={data?.style?.img} source={{ uri: data.img }} />}
		</View>
	);
}