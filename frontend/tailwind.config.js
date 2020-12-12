module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Gitinsight logo colors
        'git-orange-light': '#eb933e',
        'git-orange-dark': '#d46931',
        'git-purple': '#7f376d',
        'git-green-light': '#86b436',
        'git-green-dark': '#608225',
        'git-turquoise': '#75fcfd',
        'git-magenta': '#e84a6c',
        'git-yellow': '#fbf050',

        // Personal favorite colors
        'fav-orange-light': '#fea100',
        'fav-orangeMiddle': '#f98e1f',
        'fav-orange-dark': '#e46119',
        'fav-pinkShock': '#fc3769',
        'fav-purple-light': '#9e4784',
        'fav-purpleMiddle': '#89326f',
        'fav-purple-dark': '#4d1e40',
        'fav-blue': '#5694f1',
        'fav-green-light': '#78b600',
        'fav-green-dark': '#568300',
        'fav-beige-light': '#f2f2ea',
        'fav-beige-dark': '#e8e6da',
        'fav-occre-light': '#807067',
        'fav-occreMiddle': '#6b5b54',
        'fav-occre-dark': '#352f2b',
        'fav-coffee': '#4c3000',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
