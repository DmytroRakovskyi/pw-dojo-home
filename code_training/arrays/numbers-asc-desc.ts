/**
 * 
 * @param limit 
 * @returns pushes number to array from 1 to limit
 */

const addNumbersToArrayAsc  = (limit:number):Array<number> =>  {
let arr: Array<number> = [];
for (let i = 1; i<=limit; i++) {
    arr.push(i)
}
return arr
}
console.log(addNumbersToArrayAsc(2))

/**
 * 
 * @param limit 
 * @returns pushes numbers to array from limit to 1
 */

const addNumbersToArrayDesc  = (limit:number):Array<number> =>  {
let arr: Array<number> = [];
for (let i = limit; i>0; i--) {
    arr.push(i)
}
return arr
}
console.log(addNumbersToArrayDesc(10))