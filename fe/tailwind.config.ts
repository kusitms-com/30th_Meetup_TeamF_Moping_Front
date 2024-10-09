import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 컬러 팔레트 설정
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        primary: {
          0: '#FFF7F7',
          5: '#FEEBEA',
          10: '#FCD0D5',
          20: '#FCB0AB',
          30: '#FA8980',
          40: '#F96156',
          50: '#F73A2C', // normal
          60: '#CF2F24', // pressed
          70: '#A62518',
          80: '#7E1A13',
          90: '#55100A',
          100: '#2D0502',
        },
        secondary: {
          0: '#F7FBFE',
          5: '#EBF4FD',
          10: '#D8E9FB',
          20: '#B0D3F7',
          30: '#98BDF2',
          40: '#61A7EE',
          50: '#3A91EA', // normal
          60: '#2F79C4', // pressed
          70: '#26509E',
          80: '#1A4877',
          90: '#102F51',
          100: '#05172B',
        },
        grayscale: {
          0: '#FFFFFF',
          5: '#F8F8F8',
          10: '#F0F0F0',
          20: '#E4E4E4', // disabled
          30: '#D8D8D8',
          40: '#C8C8C8',
          50: '#B8B8B8',
          60: '#A8A8A8',
          70: '#787878',
          80: '#555555',
          90: '#333333',
          100: '#000000',
        },
        danger: {
          surface: '#FFF7F7',
          border: '#FCD0D5',
          base: '#F73A2C', // normal
          text: '#2D0502',
        },
        success: {
          surface: '#F7FBFE',
          border: '#D8E9FB',
          base: '#3A91EA', // normal
          text: '#05172B',
        },
        warning: {
          surface: '#FFFCF7',
          border: '#FFEDC3',
          base: '#FFC35F', // normal
          text: '#3F2C00',
        },
      },

      // 폰트 스타일 설정
      fontSize: {
        'title-xlg': ['28px', { lineHeight: '150%' }],
        'title-lg': ['24px', { lineHeight: '150%' }],
        'title-md': ['22px', { lineHeight: '150%' }],
        'title-sm': ['20px', { lineHeight: '150%' }],
        'text-lg': ['18px', { lineHeight: '150%' }],
        'text-md': ['16px', { lineHeight: '150%' }],
        'text-sm': ['14px', { lineHeight: '150%' }],
        'caption': ['12px', { lineHeight: '150%' }],
      },

      // 폰트 웨이트 설정 (문자열로 수정)
      fontWeight: {
        100: '100',
        200: '200',
        300: '300',
      },

      // 모서리 반경 설정
      borderRadius: {
        'xxsmall': '4px',
        'xsmall': '6px',
        'small': '8px',
        'medium': '12px',
        'large': '16px',
        'xlarge': '20px',
        'full': '400px',
      },
    },
  },
  plugins: [],
};

export default config;