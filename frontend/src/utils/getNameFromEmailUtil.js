// Convert phrase to title case, capitalising every first letter
const toTitleCase = phrase =>
  phrase
    .toLowerCase()
    .replace(/.git/g, '')
    .split(/[.\-+\s]+/g)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

// Get the string before the '@' symbol and convert it to a capitalised name
export const getNameFromEmail = email => {
  const regex = /^[^@]*/gi;
  const nameRaw = email.match(regex)[0];
  return toTitleCase(nameRaw);
};

// Usage (also see tests):
// getNameFromEmail('knut@netliferesearch.com')); // Knut
// getNameFromEmail('thomas@netliferesearch.com')); // Thomas
// getNameFromEmail('nils@thunki.com')); // Nils
// getNameFromEmail('jorgen.blindheim@gmail.com')); // Jorgen Blindheim
// getNameFromEmail('andreas-naustdal@netlife.com')); // Andreas Naustdal
// getNameFromEmail('fredrik@netliferesearch.com')); // Fredrik
// getNameFromEmail('kristoffer@brabrand.no')); // Kristoffer
// getNameFromEmail('haakon.borch@netlife.com')); // Haakon Borch
// getNameFromEmail('robin@netliferesearch.com')); // Robin
// getNameFromEmail('adne.forslund@gmail.com')); // Adne Forslund
// getNameFromEmail('audun@netliferesearch.com')); // Audun
// getNameFromEmail('marius.hauken@gmail.com')); // Marius Hauken
// getNameFromEmail('raymond.julin@gmail.com')); // Raymond Julin
// getNameFromEmail('joakim@netliferesearch.com')); // Joakim
// getNameFromEmail('i@dreamyguy.com')); // I
