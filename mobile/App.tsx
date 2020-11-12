import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import { defaultTheme } from "./src/themes/defaultTheme";

export default function App() {
	return (
		<PaperProvider theme={defaultTheme}>
			<View style={styles.container}>
				<Text>Open up App.tsx to start working on your app!</Text>
				<StatusBar style="auto" />
			</View>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.colors.background,
		alignItems: "center",
		justifyContent: "center",
	},
});
