const settings = {
  "enabledFlag": 'true',
};

const settingsCopy = {...settings};

settingsCopy.newFlag = 'true';

console.log(settings)
console.log(settingsCopy);
