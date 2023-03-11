/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				richblack: {
					50: '#e7f5fd',
					100: '#b8e1f9',
					200: '#89cdf6',
					300: '#5ab9f2',
					400: '#2aa5ee',
					500: '#118cd5',
					600: '#0d6da5',
					700: '#094e76',
					800: '#062f47',
					900: '#021018'
				},
				teal: {
					50: '#eef5f6',
					100: '#cce2e5',
					200: '#abcfd4',
					300: '#89bcc3',
					400: '#67a9b1',
					500: '#4e8f98',
					600: '#3c6f76',
					700: '#2b4f54',
					800: '#1a3033',
					900: '#091011'
				},
				camblue: {
					50: '#eff5f4',
					100: '#cfe2df',
					200: '#b0cfc9',
					300: '#90bbb3',
					400: '#70a89e',
					500: '#578f84',
					600: '#446f67',
					700: '#304f49',
					800: '#1d302c',
					900: '#0a100f'
				},
				parchment: {
					500: '#F4E9CD'
				}
			}
		}
	},
	plugins: [],
	darkMode: 'class'
};
