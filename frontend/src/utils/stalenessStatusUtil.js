// Set staleness output based on 'staleness' value
// ------------------------------------------------------------
export const stalenessStatus = (staleness, mode) => {
  const unit = 5 / 14;
  let output = {
    bgColor: 'bg-lime-400',
    staleness: unit,
  };
  if (staleness > unit && staleness <= unit * 2) {
    output = {
      bgColor: 'bg-lime-500',
      staleness: unit * 1.001,
    };
  }
  if (staleness > unit * 2 && staleness <= unit * 3) {
    output = {
      bgColor: 'bg-yellow-300',
      staleness: unit * 2.001,
    };
  }
  if (staleness > unit * 3 && staleness <= unit * 4) {
    output = {
      bgColor: 'bg-amber-400',
      staleness: unit * 3.001,
    };
  }
  if (staleness > unit * 4 && staleness <= unit * 5) {
    output = {
      bgColor: 'bg-amber-500',
      staleness: unit * 4.001,
    };
  }
  if (staleness > unit * 5 && staleness <= unit * 6) {
    output = {
      bgColor: 'bg-orange-400',
      staleness: unit * 5.001,
    };
  }
  if (staleness > unit * 6 && staleness <= unit * 7) {
    output = {
      bgColor: 'bg-orange-500',
      staleness: unit * 6.001,
    };
  }
  if (staleness > unit * 7 && staleness <= unit * 8) {
    output = {
      bgColor: 'bg-orange-600',
      staleness: unit * 7.001,
    };
  }
  if (staleness > unit * 8 && staleness <= unit * 9) {
    output = {
      bgColor: 'bg-red-600',
      staleness: unit * 8.001,
    };
  }
  if (staleness > unit * 9 && staleness <= unit * 10) {
    output = {
      bgColor: 'bg-red-700',
      staleness: unit * 9.001,
    };
  }
  if (staleness > unit * 10 && staleness <= unit * 11) {
    output = {
      bgColor: 'bg-red-800',
      staleness: unit * 10.001,
    };
  }
  if (staleness > unit * 11 && staleness <= unit * 12) {
    output = {
      bgColor: 'bg-red-900',
      staleness: unit * 11.001,
    };
  }
  if (staleness > unit * 12 && staleness <= unit * 13) {
    output = {
      bgColor: 'bg-amber-900',
      staleness: unit * 12.001,
    };
  }
  if (staleness > unit * 13) {
    output = {
      bgColor: 'bg-gray-900',
      staleness: unit * 13.001,
    };
  }
  return mode === 'color' ? output.bgColor : output.staleness;
};
