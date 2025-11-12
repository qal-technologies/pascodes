import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
      backgroundColor: "{colors.background}",
      color: "{colors.foreground}",
      fontFamily: "{fonts.body}",
    },
  },
  theme: {
    tokens: {
      colors: {
        // ✅ BLACK palette
        brandBlack: {
          50: { value: "#f5f5f5" },
          100: { value: "#e0e0e0" },
          200: { value: "#c2c2c2" },
          300: { value: "#a3a3a3" },
          400: { value: "#858585" },
          500: { value: "#666666" },
          600: { value: "#4d4d4d" },
          700: { value: "#333333" },
          800: { value: "#1a1a1a" },
          900: { value: "#000000" },
        },

        // ✅ NAVY / dark-blue palette
        brandNavy: {
          50: { value: "#ebf2ff" },
          100: { value: "#c8d9ff" },
          200: { value: "#a5c0ff" },
          300: { value: "#82a7ff" },
          400: { value: "#5f8eff" },
          500: { value: "#3c75ff" },
          600: { value: "#315ecc" },
          700: { value: "#274799" },
          800: { value: "#1d3066" },
          900: { value: "#142033" },
        },

        // ✅ GREEN palette
        brandGreen: {
          50: { value: "#e8fdf4" },
          100: { value: "#c6fbe8" },
          200: { value: "#a3f8dc" },
          300: { value: "#80f5cf" },
          400: { value: "#5df2c3" },
          500: { value: "#3aeebb" },
          600: { value: "#2fb89d" },
          700: { value: "#23817f" },
          800: { value: "#185961" },
          900: { value: "#0c2f30" },
        },

        // ✅ define semantic tokens directly under colors in v3
        background: {
          DEFAULT: { value: "{colors.brandBlack.900}" },
          _dark: { value: "{colors.brandBlack.50}" },
        },
        foreground: {
          DEFAULT: { value: "{colors.brandBlack.50}" },
          _dark: { value: "{colors.brandBlack.900}" },
        },
        primary: {
          DEFAULT: { value: "{colors.brandNavy.500}" },
          _dark: { value: "{colors.brandNavy.300}" },
        },
        accent: {
          DEFAULT: { value: "{colors.brandGreen.500}" },
          _dark: { value: "{colors.brandGreen.300}" },
        },
      },

      fonts: {
        heading: { value: "Poppins, sans-serif" },
        body: { value: "Inter, sans-serif" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
