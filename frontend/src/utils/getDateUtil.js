// Output date based on a valid date value and locale
export const getDate = (date, locale) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dtFormat = new Intl.DateTimeFormat(locale || 'en-US', options);
  return dtFormat.format(date * 1e3);
};

// Usage:
// getDate('1382432573', 'en-US'); // Tuesday, October 22, 2013
// getDate('1382432573', 'pt-BR'); // terça-feira, 22 de outubro de 2013
// getDate('1382432573', 'no-NB'); // tirsdag 22. oktober 2013
// getDate('1382432573', 'sr-RS'); // уторак, 22. октобар 2013.
// getDate('1382432573'); // Tuesday, October 22, 2013
