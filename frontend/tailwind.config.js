const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // false or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Personal favorite colors
        'fav-orange-light': '#fea100',
        'fav-orange-middle': '#f98e1f', // color 1 of gitinsight
        'fav-orange-dark': '#e46119', // color 2 of gitinsight
        'fav-pink-shock': '#fc3769', // color 7 of gitinsight
        'fav-purple-light': '#9e4784',
        'fav-purple-middle': '#89326f', // color 3 of gitinsight
        'fav-purple-dark': '#4d1e40',
        'fav-blue': '#5694f1',
        'fav-green-light': '#78b600', // color 5 of gitinsight
        'fav-green-dark': '#568300', // color 4 of gitinsight
        'fav-beige-light': '#f2f2ea',
        'fav-beige-dark': '#e8e6da',
        'fav-occre-light': '#807067',
        'fav-occre-middle': '#6b5b54',
        'fav-occre-dark': '#352f2b',
        'fav-coffee': '#4c3000',
        'fav-turquoise': '#75fcfd', // color 6 of gitinsight - new
        'fav-yellow': '#fbf050', // color 8 of gitinsight - new
        blueGray: colors.blueGray,
        coolGray: colors.coolGray,
        gray: colors.gray,
        trueGray: colors.trueGray,
        warmGray: colors.warmGray,
        red: colors.red,
        orange: colors.orange,
        amber: colors.amber,
        yellow: colors.yellow,
        lime: colors.lime,
        green: colors.green,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        lightBlue: colors.lightBlue,
        blue: colors.blue,
        indigo: colors.indigo,
        violet: colors.violet,
        purple: colors.purple,
        fuchsia: colors.fuchsia,
        pink: colors.pink,
        rose: colors.rose,
      },
      fontFamily: {
        sans: ['Ubuntu', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
