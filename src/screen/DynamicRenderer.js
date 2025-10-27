import { View, Text, Image, TouchableOpacity } from "react-native";

const registry = {
	View,
	Text,
	Image,
	TouchableOpacity
};

export default function DynamicRenderer({ json, eventHandlers = {} }) {
	if (!json) return null;

	const { type, props = {}, children } = json;
	const Component = registry[type];

	if (!Component) return null;

	// Substitui eventos string por funções reais
	const finalProps = { ...props };
	Object.keys(finalProps).forEach(key => {
		if (typeof finalProps[key] === "string" && eventHandlers[finalProps[key]]) {
			finalProps[key] = eventHandlers[finalProps[key]];
		}
	});

	// Renderiza filhos recursivamente
	let childrenElements = null;
	if (Array.isArray(children)) {
		childrenElements = children.map((child, idx) => <DynamicRenderer key={idx} json={child} eventHandlers={eventHandlers} />);
	} else if (typeof children === "object") {
		childrenElements = <DynamicRenderer json={children} eventHandlers={eventHandlers} />;
	} else {
		childrenElements = children; // string ou número
	}

	return (<Component {...finalProps}>{childrenElements}</Component>);
}