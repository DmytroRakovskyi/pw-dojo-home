/**
 *
 * @param arr
 * @returns dashes between even numbers
 */
export const dashesEven = (arr: string[]): string => {
  let newArr: string[] = arr
    .concat()
    .join("")
    .split("")
    .map((el, i, arr) => {
      if (i > 0 && +arr[i - 1] % 2 === 0 && +arr[i] % 2 === 0) {
        return `-${el}`;
      } else return el;
    });

  return newArr.join("");
};
