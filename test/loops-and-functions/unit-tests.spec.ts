import { test, expect } from '@playwright/test';
import { isEvenOrOdd, greetings, voteAge } from '../../tasks/if-else';

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
