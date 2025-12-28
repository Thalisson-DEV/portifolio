/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'terminal-black': '#0d1117', // Fundo estilo GitHub Dark
        'terminal-gray': '#161b22', // Card background
        'neon-green': '#2ea043',    // Verde GitHub/Terminal
        'neon-green-hover': '#3fb950',
        'code-keyword': '#ff7b72',  // Cores de sintaxe Java
        'code-class': '#d2a8ff',
        'code-string': '#a5d6ff',
      },
      fontFamily: {
        'mono': ['"Fira Code"', 'monospace'], // Fonte de código
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}