// class BankAccount {
//   private balance: number;
//   accountHolder: string;
//   accountId: string;
//   currency: string;
//   accountType: string;
//   pin: string;

//   constructor(
//     balance: number,
//     accountHolder: string,
//     accountId: string,
//     currency: string,
//     accountType: string,
//     pin: string,

//   )
//   {
//     this.accountHolder = accountHolder;
//     this.accountId = accountId;
//     this.accountType = accountType;
//     this.balance = balance;
//     this.currency = currency;
//     this.pin = this.generatePin().toString();
//   }

//   private generatePin() {
//     return Math.round((Math.random() + 1) * 1000);
//   }

//   getBalance(pin: string) {
//     if (pin === this.pin) {
//       return this.balance;
//     } else return new Error('Please provide correct pin');
//   }

//   addMoney(moneyAmount:number){
//     this.balance = this.balance + moneyAmount;
//   }
// }

// const account = new BankAccount(1000, 'Dmytro', '21Dc', 'EUR', 'Premium');
// console.log(account.getBalance(account.pin));
