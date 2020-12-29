// Get max/min number in array: max | min
// ------------------------------------------------------------
export const arrayMaxMin = (arr, type) => {
  let n;
  if (type === 'max') {
    n = Math.max(...arr);
  } else if (type === 'min') {
    n = Math.min(...arr);
  }
  return n;
};

// Usage (also see tests):
// 1.
// const arr = [1, 6, 234234, 23];
// console.log(arrayMaxMin(arr, 'max')); // 234234
// console.log(arrayMaxMin(arr, 'min')); // 1
// 2.
// const arrOfObjs = {
//   '2010-03-22': 42,
//   '2010-03-23': 43,
//   '2010-03-24': 422,
//   '2010-03-27': 242,
// };
// console.log(arrayMaxMin(Object.values(arrOfObjs), 'max')); // 422
// console.log(arrayMaxMin(Object.values(arrOfObjs), 'min')); // 42
