/**
 *
 * @param limit
 * @returns sum of numbers between 1 and limit
 */
function sumOfNumber(limit: number): number {
  let acc: number = 0;
  for (let i = 1; i <= limit; i++) {
    acc += i;
  }
  return acc;
}
console.log(sumOfNumber(100));
