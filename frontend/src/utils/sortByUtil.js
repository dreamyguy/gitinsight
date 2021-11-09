import sortBy from 'lodash.sortby';

// Sort array of objects by specific key
// ------------------------------------------------------------
export default function sortByUtil({ data, sort, mode }) {
  if (mode === 'desc' || mode === 'des') {
    // The second parameter, when written this way, ensures that falsey values don't break the sorting
    return sortBy(data, [o => o[sort] || '']).reverse();
  }
  // Fallback, equivalent to `mode === 'asc'`
  return sortBy(data, [o => o[sort] || '']);
}
