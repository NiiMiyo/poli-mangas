// import { Theme } from "react-native-paper/lib/typescript/src/types";

import { Theme } from "./types";

export const defaultTheme: Theme = {
	// Tema escuro ou claro
	dark: true,

	// O quão redondo são as bordas
	roundness: 1,

	animation: {
		// Escala para todas as animações
		scale: 1,
	},

	colors: {
		// Cor primária do app
		primary: "#744de7",
		// Cor secundária do app
		accent: "#69d2e7",

		// Cor de fundo para as páginas
		background: "#744de7",
		// Cor de fundo para elementos que contém outros elementos
		surface: "#ffffff",
		// Cor dos textos
		text: "#ffffff",

		// Cor dos elementos desativados
		disabled: "#a0a0a0",
		// Cor dos textos de placeholder
		placeholder: "#fafafa",
		// Cor para os backdrops
		backdrop: "#ffffff",

		// Daqui pra baixo não tinha na documentação
		error: "#ff0000",
		notification: "#ffffff",

		onBackground: "#ffffff",
		onSurface: "#000000",
	},
	// Várias fontes usadas pelos elementos
	fonts: {
		light: {
			fontFamily: "Roboto",
		},
		medium: {
			fontFamily: "Roboto",
		},
		regular: {
			fontFamily: "Roboto",
		},
		thin: {
			fontFamily: "Roboto",
		},
	},

	// Modo de cor para temas escuros
	mode: "exact",

	// exact
	// Onde tudo é como antes. Appbar e BottomNavigation ainda usarão a cor primária por padrão.

	// adaptative
	// Onde seguimos as Material design guidelines;
	// a superfície usará sobreposição branca com opacidade para mostrar a elevação;
	// Appbar e BottomNavigation usarão a cor da superfície como plano de fundo.

	// Material design guidelines -> https://material.io/design/color/dark-theme.html
};
