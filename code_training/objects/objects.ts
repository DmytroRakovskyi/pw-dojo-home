const book = {
  title: 'Peace',
  author: 'Dmytro',
  pages: '1',
  'is available': true,
};

console.log([book.author, book.title, book.pages]);

// book.isAvailable = true; if js
console.log([book.author, book.title, book.pages, book['is available']]);

function showKeyValue(obj) {
  for (const key in obj) {
    console.log(`${key} : ${obj[key]}`);
  }
}

showKeyValue(book);

const complexObject = {
  profile: {
    email: 'dad@gmail.com',
    adress: null,
    currencies: ['EUR', 'USD'],
  },
};
console.log(complexObject.profile.email);

const checkProperty = (prop, obj) => {
  if (prop in obj) {
    return 'there is a property';
  } else {
    return 'there is no property';
  }
};

console.log(checkProperty('profile', complexObject));
console.log(Object.keys(book).length);

const settings1 = {
  enabledFlag: 'true',
};

const settingsCopy = { ...settings1 };

/**
 * Spread Method
let clone = { ...userDetails }

// Object.assign() Method
let clone = Object.assign({}, userDetails)

// JSON.parse() Method
let clone = JSON.parse(JSON.stringify(userDetails))
 * 
 * 
 */
