/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			backgroundColor: {
				black: "#09090b",
				gray: "#18181b",
				zinc: "#3f3f46",
				"zinc-600": "#52525b",
			},
			textColor: {
				white: "#f4f4f5",
				gray: "#71717a",
			},
			height: {
				main: "88%",
				footer: "12%",
			},
		},
	},
	plugins: [],
}
