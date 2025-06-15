// const temperature = 15;

// if (temperature >= 15) {
//     console.log('Тепло')
// }
// else {
//     console.log('Холодно')
// }

// const myAge = 20;

// if (myAge >=21) {
//     console.log('Alcohol can be sold')
// } else {
//     console.log('Alcohol cannot be solved')
// }

// const someText: string = 'lala';

// if (someText.length > 4.0) {
//     console.log('Succeses');
// } else {
//     console.log('Failure')
// }

// // date of movie
// // time of movie
// // location

// function movieControler (date, time, theater, movieTitle) {
//     if (date === 'Mon 26' && time === '19:30' && (theater === 'blue' || theater === 'red') && movieTitle === 'Lila and Stitch') {
//     console.log('Please enjoy')
// } else {
//     console.log('access denied')
// }
// };

// movieControler('Mon 26', '19:30', 'red', 'Lila and Stitch')

const date: string = "Mon 26";
const time: string = "19:30";
const theater: string = "blue";
const movieTitle: string = "Lila and Stitch";

function movieControlerNew(date, time, theater, movieTitle) {
  if (date !== "Mon 26") {
    return "denied";
  }
  if (time !== "19:30") {
    return "denied";
  }
  if (theater !== "blue" && theater !== "red") {
    return "denied";
  }
  if (movieTitle !== "Lila and Stitch") {
    return "denied";
  }
  return console.log("allowed");
}

movieControlerNew("Mon 26", "19:30", "red", "Lila and Stitch");
