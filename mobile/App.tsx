import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Rotas from './src/routes';

import { defaultTheme } from "./src/themes/defaultTheme";

export default function App() {
	return (
		<Rotas />
	);
}
