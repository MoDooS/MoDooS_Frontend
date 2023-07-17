const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_300 = { ...Array.from(Array(301)).map((_, i) => `${i}px`) };
const px0_1000 = { ...Array.from(Array(1001)).map((_, i) => `${i}px`) };
const rem0_5 = { ...Array.from(Array(60)).map((_, i) => `${i / 10}rem`) };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#AC03FB',
        secondary: '#DA99F7',
        bg1: '#FAFAFA',
        gray_60: '#DEDEDE',
        purple: '#5C17E5',
      },
      boxShadow: {
        neumorphism: '0px 9.912036895751953px 19.824073791503906px 0px rgba(0, 0, 0, 0.16)',
      },
      borderWidth: px0_10,
      // fontSize: px0_100, // fontsize를 rem 대신 px로 할거면 주석 해제
      fontSize: rem0_5,
      lineHeight: px0_100,
      width: px0_1000,
      height: px0_1000,
      maxWidth: px0_1000,
      maxHeight: px0_1000,
      spacing: px0_300,
      borderRadius: px0_100,
    },
  },
  plugins: [],
};