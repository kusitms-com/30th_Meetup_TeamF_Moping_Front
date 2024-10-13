import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // 다크 모드 설정 (필요 시 활성화 가능)
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',  
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',  
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',  
  ],
  theme: {
    extend: {
      colors: {
        // Gray 팔레트 (웹 접근성 대비율 준수)
        gray: {
          50: '#F8F8F8',
          100: '#F5F5F5',
          200: '#E8E8E8',
          300: '#D1D1D1',
          400: '#BFBFBF',
          500: '#A6A6A6',
          600: '#777777',
          700: '#444444',
          800: '#333333',
          900: '#222527',
        },

        // Semantic Colors (텍스트, 아이콘, 경계선 등)
        text: {
          default: '#222527',   // 기본 텍스트
          subdued: '#444444',   // 보조 텍스트
          info: '#777777',      // 정보 텍스트
          disabled: '#A6A6A6',  // 비활성화 텍스트
          heading: '#222527',   // 타이틀 텍스트
        },

        icon: {
          default: '#444444',   // 기본 아이콘 색상
          sub: '#777777',       // 보조 아이콘 색상
          disabled: '#BFBFBF',  // 비활성화 아이콘 색상
        },

        border: {
          default: '#BFBFBF',   // 기본 경계선 색상
          strong: '#A6A6A6',    // 강조된 경계선 색상
          disabled: '#E8E8E8',  // 비활성화된 경계선 색상
        },

        divider: {
          default: '#E8E8E8',   // 기본 구분선 색상
          strong: '#A6A6A6',    // 강조된 구분선 색상
        },

        background: {
          light: '#F8F8F8',     // 밝은 배경색
          deep: '#F5F5F5',      // 진한 배경색
        },

        // 기존 Primary, Secondary, Grayscale 등 컬러 팔레트
        primary: {
          0: "#FFF7F7",
          5: "#FEEBEA",
          10: "#FCD0D5",
          20: "#FCB0AB",
          30: "#FA8980",
          40: "#F96156",
          50: "#F73A2C", // 기본 상태
          60: "#CF2F24", // 눌린 상태
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
          50: "#3A91EA", // 기본 상태
          60: "#2F79C4", // 눌린 상태
          70: "#26509E",
          80: "#1A4877",
          90: "#102F51",
          100: "#05172B",
        },
        grayscale: {
          0: "#FFFFFF",
          5: "#F8F8F8",
          10: "#F0F0F0",
          20: "#E4E4E4", // 비활성화
          30: "#D8D8D8",
          40: "#C8C8C8",
          50: "#B8B8B8",
          60: "#A8A8A8",
          70: "#787878",
          80: "#555555",
          90: "#333333",
          100: "#000000",
        },
        danger: {
          surface: "#FFF7F7",
          border: "#FCD0D5",
          base: "#F73A2C", // 기본 상태
          text: "#2D0502",
        },
        success: {
          surface: "#F7FBFE",
          border: "#D8E9FB",
          base: "#3A91EA", // 기본 상태
          text: "#05172B",
        },
        warning: {
          surface: "#FFFCF7",
          border: "#FFEDC3",
          base: "#FFC35F", // 기본 상태
          text: "#3F2C00",
        },
      },

      // 폰트 설정
      fontSize: {
        "title-xlg": ["28px", { lineHeight: "150%" }],
        "title-lg": ["24px", { lineHeight: "150%" }],
        "title-md": ["22px", { lineHeight: "150%" }],
        "title-sm": ["20px", { lineHeight: "150%" }],
        "text-lg": ["18px", { lineHeight: "150%" }],
        "text-md": ["16px", { lineHeight: "150%" }],
        "text-sm": ["14px", { lineHeight: "150%" }],
        caption: ["12px", { lineHeight: "150%" }],
      },

      fontWeight: {
        100: "100",
        200: "200",
        300: "300",
      },

      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },

      // 모서리 반경 설정
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
  },
  plugins: [],
};

export default config;