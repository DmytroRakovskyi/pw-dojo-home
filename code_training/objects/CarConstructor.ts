//classes and consturctors begin from uppercase

function Car(engineVolume, color) {
  this.engineVolume = engineVolume;
  this.color = color;

  this.drive = () => {
    console.log('Driving');
  };

  this.brake = () => {
    console.log('Braking');
  };

  this.startEngine = function () {
    console.log(`Brr... Brr... ${this.engineVolume}`);
  };

  this.horn = () => {
    console.log('Beep Beep Beep');
  };
}

const car1 = new Car('2000 cm3', 'black');
const car2 = new Car('6100 cm3', 'white');

console.log(car1, car2);
car1.startEngine();

//for classes there is no need for this to declare methods and properties;
class CarNew {

    engineVolume: string;
    color: string;
    productionYear: number;


    constructor(engineVolume: string, color: string, productionYear: number) {
        this.engineVolume = engineVolume;
        this.color = color;
        this.productionYear = productionYear;
    }


    drive(){
        console.log('Driving...')
    };

brake(){
        console.log('Breaking...')
    };

    startEngine() {
console.log(`starting engine brrr: ${this.engineVolume}`)
    };

    
    stopEngine() {
console.log(`starting engine brrr: ${this.engineVolume}`)
    };
}

let carBrand: CarNew = new CarNew('2000cm3', 'black', 2025);

console.log(carBrand.engineVolume);
carBrand.startEngine();
carBrand.stopEngine();


