/**
 * 
 * @param arr input should be an array
 * @param n - element number, default 0 position element
 * @returns amount of first elements
 */
export function firstArrayElements(arr:Array<any>,n:number = 1) {

 return arr.slice(0, n)
}