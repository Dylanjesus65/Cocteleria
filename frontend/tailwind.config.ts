import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6B46C1', // Púrpura principal
        secondary: '#805AD5', // Púrpura secundario
        accent: '#F3E8FF',   // Fondo lila muy suave
        darkText: '#2D3748', // Gris oscuro para lectura
        lightText: '#718096', // Gris medio
        success: '#38A169', // Verde éxito
        danger: '#E53E3E',  // Rojo error
      },
      boxShadow: {
        'soft-lg': '0 10px 15px -3px rgba(107, 70, 193, 0.15), 0 4px 6px -2px rgba(107, 70, 193, 0.1)', // Sombra morada suave
        'soft-xl': '0 20px 25px -5px rgba(107, 70, 193, 0.15), 0 10px 10px -5px rgba(107, 70, 193, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;