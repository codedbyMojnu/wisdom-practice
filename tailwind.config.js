/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#388E3C',
                secondary: '#9E9E9E',
                accent: '#D4AC0D',
                destructive: '#D32F2F',
                muted: '#E0E0E0',
                background: '#F5F5DC',
                foreground: '#240F0F',
                card: '#F5F5F0',
                border: '#CCCCCC'
            },
            fontFamily: {
                'headline': ['Alegreya', 'serif'],
                'body': ['PT Sans', 'sans-serif'],
            },
            backgroundImage: {
                'philosophy': "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')",
            }
        },
    },
    plugins: [],
}
