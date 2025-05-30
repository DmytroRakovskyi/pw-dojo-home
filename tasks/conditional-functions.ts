/**1. Парне чи непарне число
Програма, яка визначає, чи число парне або непарне.
Вхід: Число (наприклад, 4)
Вихід:
- "Число парне."
- "Число непарне."
 */

export const isEvenOrOdd = (param: number): string => {
  if (param % 2 === 0) {
    return `${param} є парним числом`;
  }
  return `${param} не є парним числом`;
};
// console.log(`Task 1 output: ${isEvenOrOdd(5)}`);
/** 
2. Привітання за часом
Залежно від часу доби, виведіть привітання: "Доброго ранку!", "Доброго дня!" або "Доброго вечора!".
Вхід: Година (наприклад, 15)
Вихід:
- Якщо год < 12: "Доброго ранку!"
- Якщо год 12–18: "Доброго дня!"
- Якщо год > 18: "Доброго вечора!"
*/


export function greetings(param: number): string {
  if (param < 0) {
    return 'Друже, ти з космосу? Час може бути лише позитивним числовим значенням';
  } else if (param < 12) {
    return 'Доброго ранку!';
  } else if (param >= 12 && param <= 18) {
    return 'Доброго дня!';
  } else return 'Доброго вечора!';
}
// export const currentHour: number = new Date().getHours();

// console.log(`Task 2 output: ${greetings(currentHour)}`);

/** 
3. Перевірка оцінки
Якщо бал >= 50 — "Тест складено".
Якщо < 50 — "Тест не складено".
Вхід: Бал (наприклад, 42)
 */

const grade: number = Math.trunc(Math.random() * 100);
console.log(grade);
export function gradeCheck(grade: number): string {
  if (grade >= 50 && grade <= 100) {
    return 'Тест складено';
  } else {
    return 'Тест не складено';
  }
}

// console.log(`Task 3 output: ${gradeCheck(grade)}`);

/**
 
4. Вік для голосування
Програма, яка перевіряє, чи можна користувачу голосувати.
Вхід: Вік (наприклад, 17)
Вихід:
- Якщо >= 18: "Ви можете голосувати."
- Інакше: "Ви ще не можете голосувати."
*/
export const voteAge = (age: number = 0): string => {
  if (age >= 18 && age <= 101) {
    return 'Ви можете голосувати.';
  } else {
    return 'Ви ще не можете голосувати.';
  }
};
// console.log(`Task 4 output: ${voteAge()}`);

/** 
5. Порівняння чисел
Вхід: Два числа (наприклад, 8 і 10)
Вихід:
- "Перше число більше."
- "Друге число більше."
- "Числа рівні."
*/

const numberCompare = (num1: number, num2: number): string => {
  if (num1 === num2) {
    return 'Числа рівні';
  } else if (num1 > num2) {
    return 'Перше число більше.';
  } else {
    return 'Друге число більше.';
  }
};

// console.log(`Task 5 output: ${numberCompare(-1,-1)}`);

/** 
6. Дорога і світлофор
Якщо зелений — переходьте.
Якщо жовтий — підготуйтеся.
Якщо червоний — зачекайте.
Вхід: Колір світлофора (наприклад, "жовтий")
*/

function trafficLight(color: string): string {
  color = color.toLowerCase();

  if (color === 'зелений') {
    return 'переходьте';
  }
  if (color === 'жовтий') {
    return 'підготуйтеся';
  }
  if (color === 'червоний') {
    return 'зачекайте';
  }

  return 'Невідомий колір, краще зачекати';
}

// console.log(`Task 6 output: ${trafficLight('червоний')}`);

/** 
7. Визначення типу числа
Програма, яка визначає, чи число додатнє, від’ємне або дорівнює нулю.
Вхід: Число (наприклад, -5)
Вихід:
- "Число додатнє."
- "Число від’ємне."
- "Число дорівнює нулю."

 */

const numberType = (num: number): string => {
  if (num > 0) {
    return 'Число додатнє.';
  } else if (num < 0) {
    return 'Число від’ємне.';
  } else if (num === 0) {
    return 'Число дорівнює нулю.';
  } else {
    return 'Якась дікуха';
  }
};

// console.log(`Task 7 output: ${numberType(999)}`);
