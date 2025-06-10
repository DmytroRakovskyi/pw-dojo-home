/**
 * 
 * @param arr 
 * @param separator 
 * @returns array joined into a string
 */
export function joinArr (arr: Array<any>, separator:string = ','):string {
return arr.join(separator);
}