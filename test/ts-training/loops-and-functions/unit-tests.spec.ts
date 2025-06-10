import { test, expect } from '@playwright/test';
import { isEvenOrOdd, greetings, voteAge } from '../../../tasks/conditional-functions';
import { isInputArray } from '../../../code_training/arrays/isArray';
import { cloneArray } from '../../../code_training/arrays/cloneArray';
import { firstArrayElements } from '../../../code_training/arrays/firstArrayElements';
import { lastArrayElements } from '../../../code_training/arrays/lastArrayElements';
import { joinArr } from '../../../code_training/arrays/joinArr';
import { sortArrayAsc } from '../../../code_training/arrays/sortArray';
import {dashesEven} from '../../../code_training/arrays/dashesEven'

test.describe('function isEvenOrOdd', { tag: '@unit' }, () => {
  test('is even', async () => {
    const result: string = isEvenOrOdd(2);
    expect(result).toStrictEqual('2 є парним числом');
  });

  test('is odd', async () => {
    const result: string = isEvenOrOdd(2.11);
    expect(result).toStrictEqual('2.11 не є парним числом');
  });
});

test.describe('function greetings', { tag: '@unit' }, () => {
  test('evening', async () => {
    const result: string = greetings(23);
    expect(result).toStrictEqual('Доброго вечора!');
  });

  test('afternoon', async () => {
    const result: string = greetings(12.11);
    expect(result).toStrictEqual('Доброго дня!');
  });

  test('morning', async () => {
    const result: string = greetings(10);
    expect(result).toStrictEqual('Доброго ранку!');
  });
});

test.describe('elections functionality', { tag: '@unit' }, () => {
  test('can vote', async () => {
    const result: string = voteAge(18);
    expect(result).toStrictEqual('Ви можете голосувати.');
  });

  test('cannot vote', async () => {
    const result: string = voteAge(11);
    expect(result).toStrictEqual('Ви ще не можете голосувати.');
  });
});

test('not array', async () => {
  const result: string = '1234adad';
  expect(isInputArray(result)).toEqual(false);
});

test('array', async () => {
  const result: Array<string | number> = ['1234adad', 2, 3];
  expect(isInputArray(result)).toEqual(true);
});

test('clonned array are same inside but different as object is memmory', async () => {
  const testArray: Array<any> = [1, '1', false];
  const result: Array<any> = cloneArray(testArray);
  expect(result).not.toBe(testArray);
  console.log(`old arrays is ${testArray} || new arrays is ${result}`);
});

test('fist 2 elements returnal', async () => {
  const testArray: Array<any> = [1, '1', false];
  const result: any = firstArrayElements(testArray, 2);
  expect(result).toEqual([1, '1']);
});

test('default first element', async () => {
  const testArray: Array<any> = [1, '1', false];
  const result: any = firstArrayElements(testArray);
  expect(result).toEqual([1]);
});

test('last 2 elements returnal', async () => {
  const testArray: Array<any> = [false, '1', 2, 3, 4];
  const result: any = lastArrayElements(testArray, 2);
  expect(result).toEqual([4, 3]);
});
test('default last element', async () => {
  const testArray: Array<any> = [1, '1', false];
  const result: any = lastArrayElements(testArray);
  expect(result).toEqual([false]);
});

test('array is joined', async () => {
  const testArray: Array<any> = [1, '1', false];
  const result: any = joinArr(testArray, '-');
  expect(result).toEqual('1-1-false');
});

test('dashes appears after even', async() => {
  const testArr: Array<string> = ['13455566621'];
  const result: string = dashesEven(testArr);
  expect(result).toEqual('1345556-6-6-21')
})

test('array sorted is ascending', async () => {
  const testArray: Array<any> = [99, -1, 19, 0, -9, 9];
  const result: Array<number> = sortArrayAsc(testArray);
  expect(result).toEqual([-9, -1, 0, 9, 19, 99]);
});
