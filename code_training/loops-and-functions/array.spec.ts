/** 
 Arrays starts from 0 index and ends with -1;
Для хранения упорядоченных коллекций существует особая структура данных, которая называется массив, Array.

When we creates const or variable for arrays we should take into consideration name

Array is the object
 */

const arr: Array<string | number> = ['zeroIndex', 'firstIndex', 'secondIndex', 3, 4];

console.log(arr[2]);
console.log(typeof arr);

/**
 Array methods
 */

/**  Метод at() принимает значение в виде целого числа и возвращает элемент массива с данным индексом. В качестве аргумента метод принимает положительные и отрицательные числа. При отрицательном значении отсчёт происходит с конца массива.
 */

console.log(arr.at(1));

/** Длина массива */

console.log(arr.length);

/** Перебор массива

loop for

 */
arr.push('lastEl');
const removedLastEl: any = arr.pop();
for (let i = 0; i < arr.length; i++) {
  arr[i] = `index: ${i} element: ${arr[i]}`;
  console.log(arr[i]);
}

console.log(removedLastEl);

/**
 Обьеднання масива
 */

let arrNew: Array<number | string> = [1, 2, 3];

let concatedArr: Array<string | number> = arr.concat(arrNew);
console.log(concatedArr);

for (const el of concatedArr) {
  console.log(el + 'Ы');
}

/**
 map should have return
 */
const mappedArray = arr.map((value) => {
  return value + ' ' + 'l';
});
console.log(mappedArray);

const filteredArray = mappedArray.filter((el, index, arr) => {
  return !el.includes('l');
});

console.log(filteredArray);
