import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadein: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "0.8",
          },
        },
        fadeout: {
          "0%": { opacity: "0.8", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
        fadein2: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "0.8", transform: "translateY(0px)" },
        },
      },
      colors: {
        gray: {
          30: "#F0F0F0",
          50: "#F8F8F8",
          100: "#F5F5F5",
          200: "#E8E8E8",
          300: "#D1D1D1",
          400: "#BFBFBF",
          500: "#A6A6A6",
          600: "#777777",
          700: "#444444",
          800: "#333333",
          900: "#222527",
          950: "#2c2c2c",
          1000: "#C6C6C6",
        },
        darkGray: "#1d1d1d",
        lightGray: "#e4e4e4",
        mediumGray: "#8e8e8e",
        blue: "#3a91ea",

        text: {
          default: "#222527",
          subdued: "#444444",
          info: "#777777",
          disabled: "#A6A6A6",
          heading: "#222527",
        },
        icon: {
          default: "#444444",
          sub: "#777777",
          disabled: "#BFBFBF",
        },
        border: {
          default: "#BFBFBF",
          strong: "#A6A6A6",
          disabled: "#E8E8E8",
        },
        divider: {
          default: "#E8E8E8",
          strong: "#A6A6A6",
        },
        background: {
          light: "#F8F8F8",
          deep: "#F5F5F5",
        },
        primary: {
          0: "#FFF7F7",
          5: "#FEEBEA",
          10: "#FCD0D5",
          20: "#FCB0AB",
          30: "#FA8980",
          40: "#F96156",
          50: "#F73A2C",
          60: "#CF2F24",
          70: "#A62518",
          80: "#7E1A13",
          90: "#55100A",
          100: "#2D0502",
        },
        secondary: {
          0: "#F7FBFE",
          5: "#EBF4FD",
          10: "#D8E9FB",
          20: "#B0D3F7",
          30: "#98BDF2",
          40: "#61A7EE",
          50: "#3A91EA",
          60: "#2F79C4",
          70: "#26509E",
          80: "#1A4877",
          90: "#102F51",
          100: "#05172B",
        },
        grayscale: {
          0: "#FFFFFF",
          5: "#F8F8F8",
          10: "#F0F0F0",
          20: "#E4E4E4",
          30: "#d8d8d8",
          40: "#C6C6C6",
          50: "#8E8E8E",
          60: "#717171",
          70: "#555555",
          80: "#2d2d2d",
          90: "##1D1D1D",
          100: "#000000",
        },
        danger: {
          surface: "#FFF7F7",
          border: "#FCD0D5",
          base: "#F73A2C",
          text: "#2D0502",
        },
        success: {
          surface: "#F7FBFE",
          border: "#D8E9FB",
          base: "#3A91EA",
          text: "#05172B",
        },
        warning: {
          surface: "#FFFCF7",
          border: "#FFEDC3",
          base: "#FFC35F",
          text: "#3F2C00",
        },
      },

      fontSize: {
        "title-xlg": ["28px", { lineHeight: "38px" }],
        "title-lg": ["24px", { lineHeight: "32px" }],
        "title-md": ["22px", { lineHeight: "30px" }],
        "title-sm": ["20px", { lineHeight: "28px" }],
        "text-lg": ["18px", { lineHeight: "26px" }],
        "text-md1": ["16px", { lineHeight: "24px" }],
        "text-md2": ["16px", { lineHeight: "26px" }],
        "text-sm1": ["14px", { lineHeight: "20px" }],
        "text-sm2": ["14px", { lineHeight: "22px" }],
        caption: ["12px", { lineHeight: "16px" }],
      },
      xl: ["27px", { lineHeight: "37.8px" }],
      "title-xl": ["52px", { lineHeight: "62px" }],

      fontWeight: {
        100: "400",
        200: "500",
        300: "600",
      },

      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },

      boxShadow: {
        normal: "0px 1px 2px 0px rgba(0, 0, 0, 0.08)",
        medium: "0px 1px 3px 0px rgba(0, 0, 0, 0.16)",
        strong: "0px 0px 4px 0px rgba(5, 23, 43, 0.4)",
      },

      borderRadius: {
        xxsmall: "4px",
        xsmall: "6px",
        small: "8px",
        medium: "12px",
        large: "16px",
        xlarge: "20px",
        full: "400px",
      },
    },
    animation: {
      fadein: "fadein 2s ease-in-out",
      fadein2: "fadein2 0.5s ease-in-out forwards",
      fadeout: "fadeout 0.5s ease-in-out forwards",
    },
    scrollbarHide: {
      "&::-webkit-scrollbar": {
        display: "none",
      },
      "&": {
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

export default config;
