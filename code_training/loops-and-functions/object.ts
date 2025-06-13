const student: {
  firstName: string;
  lastName: string;
  course: string;
  ['fake location']: string;
  age: number;
  adresses: Array<string>;
  sideEffect: {
    first: Array<any>;
    second: { secondHard: Array<number> };
  };
  sayHi(): void;
}  = {
  'firstName': 'name',
  'lastName': 'lastName',
  'course': 'QA DOJO',
  'age': 19,
  'fake location': 'Poland',
  'adresses': ['Ukraine', 'Kyiv', 'Perova st'],
  'sideEffect': {
    first: [1,2,3,4],
    second: {
        secondHard: [222,3]
    },
  },
  sayHi() {
    console.log(`Hi ${this.firstName}`)
  }
};

student.sayHi()