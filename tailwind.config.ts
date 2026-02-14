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
        // TenantCloud Colors
        primary: {
          50: "#E3F2FD",
          100: "#BBDEFB",
          200: "#90CAF9",
          300: "#64B5F6",
          400: "#42A5F5",
          500: "#1E88E5",
          600: "#1976D2",
          700: "#1565C0",
          800: "#0D47A1",
          900: "#0D47A1",
        },
        tc: {
          blue: "#1E88E5",
          "blue-dark": "#1565C0",
          "blue-light": "#42A5F5",
          green: "#43A047",
          "green-dark": "#2E7D32",
          orange: "#FB8C00",
          gray: "#F5F5F5",
          "gray-dark": "#757575",
        },
      },
      spacing: {
        "18": "4.5rem",
        "20": "5rem",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
      },
      boxShadow: {
        tc: "0 2px 4px rgba(0, 0, 0, 0.1)",
        "tc-md": "0 4px 8px rgba(0, 0, 0, 0.12)",
        "tc-lg": "0 8px 16px rgba(0, 0, 0, 0.15)",
      },
      borderRadius: {
        "tc-sm": "4px",
        "tc-md": "8px",
        "tc-lg": "12px",
      },
    },
  },
  plugins: [],
};

export default config;