/**
 *
 * @param arr
 * @returns sorted array in ascending order
 */

export function sortArrayAsc(arr: Array<number>): Array<number> {
  let newArr: Array<number> = arr.slice();
  return newArr.sort((a: number, b: number) => a - b);
}
