// Previous implementation, that assigns different thousand separators according to locale:
// - Norwegian: ' '
// - English: ','
export const thousandify = (number, language) => {
  if (number || number === 0) {
    if (language) {
      return language.toLowerCase() === 'no'
        ? Number(number).toLocaleString('nb-NO').replace(/\s/g, ' ')
        : Number(number).toLocaleString('en-GB');
    }
    return Number(number).toLocaleString('en-GB');
  }
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line
    console.error(
      `[thousandify]: The number being passed is not a number, or not passed at all: ${number}, type: (${typeof number})`,
    );
  }
  return null;
};
