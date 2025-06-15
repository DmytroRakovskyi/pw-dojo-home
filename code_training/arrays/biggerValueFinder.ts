function biggerValueFinder(arr: Array<number>): number | string {
  if (arr[0] === arr[1]) {
    return 'числа рівні';
  } else if (arr.length !== 2) {
    throw new Error('Array is more than 2 numbers');
  } else if (arr[0] > arr[1]) {
    return arr[0];
  } else return arr[1];
}

console.log(biggerValueFinder([1, 9]));
