/**
 *
 * @param arr input should be an array
 * @param n - element number, default -1 position element
 * @returns amount of last elements
 */
export function lastArrayElements(arr: Array<any>, n: number = 1) {
  return arr.reverse().slice(0, n);
}
