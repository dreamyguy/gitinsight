// Set staleness color based on 'staleness' value
// ------------------------------------------------------------
export const stalenessStatus = staleness => {
  const unit = 5 / 14;
  let color = 'bg-lime-400';
  if (staleness > unit && staleness <= unit * 2) {
    color = 'bg-lime-500';
  }
  if (staleness > unit * 2 && staleness <= unit * 3) {
    color = 'bg-yellow-300';
  }
  if (staleness > unit * 3 && staleness <= unit * 4) {
    color = 'bg-amber-400';
  }
  if (staleness > unit * 4 && staleness <= unit * 5) {
    color = 'bg-amber-500';
  }
  if (staleness > unit * 5 && staleness <= unit * 6) {
    color = 'bg-orange-400';
  }
  if (staleness > unit * 6 && staleness <= unit * 7) {
    color = 'bg-orange-500';
  }
  if (staleness > unit * 7 && staleness <= unit * 8) {
    color = 'bg-orange-600';
  }
  if (staleness > unit * 8 && staleness <= unit * 9) {
    color = 'bg-red-600';
  }
  if (staleness > unit * 9 && staleness <= unit * 10) {
    color = 'bg-red-700';
  }
  if (staleness > unit * 10 && staleness <= unit * 11) {
    color = 'bg-red-800';
  }
  if (staleness > unit * 11 && staleness <= unit * 12) {
    color = 'bg-red-900';
  }
  if (staleness > unit * 12 && staleness <= unit * 13) {
    color = 'bg-amber-900';
  }
  if (staleness > unit * 13) {
    color = 'bg-gray-900';
  }
  return color;
};
