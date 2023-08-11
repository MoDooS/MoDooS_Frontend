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
        danger: '#F14A58',
        bg1: '#FAFAFA',
        red: '#B1000F',
        input_red: '#F14A58',
        sky_blue: '#5B76FF',
        blue: '#000AFD',
        dark_blue: '#445275',
        yellow: '#FFB801',
        orange: '#FD8900',
        green: '#016A1C',
        gray: '#ECEFF4',
        gray_30: '#D9D9D9',
        gray_40: '#F9FAFB',
        gray_60: '#DEDEDE',
        gray_70: '#728197',
        gray_90: '#9AA8BC',

        purple: '#5C17E5',
        purple_sub: '#AC11F4',
        purple_thr: '#AC03FB',
        bg1: '#F9FAFB',
        backdrop: 'rgba(0,0,0,0.3)',
      },
      boxShadow: {
        neumorphism: '0px 10px 20px 0px rgba(0, 0, 0, 0.16)',
      },
      borderWidth: px0_10,
      // fontSize: px0_100, // fontsize를 rem 대신 px로 할거면 주석 해제
      fontSize: rem0_5,
      lineHeight: px0_100,
      width: px0_1000,
      height: px0_1000,
      maxWidth: px0_1000,
      maxHeight: px0_1000,
      minWidth: px0_1000,
      minHeight: px0_1000,
      spacing: px0_300,
      borderRadius: px0_100,
      top: px0_1000,
      left: px0_1000,
      right: px0_1000,
    },
    zIndex: {
      header: 80,
      dropdown: 90,
      backdrop_1: 100,
      backdrop_2: 101,
      modal_component: 102,
    },
    zIndex: {
      header: 80,
      dropdown: 90,
      backdrop_1: 100,
      backdrop_2: 101,
      modal_component: 102,
    },
  },
  plugins: [],
};
