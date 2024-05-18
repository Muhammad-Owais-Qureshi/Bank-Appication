#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Customer {
    fullName;
    accountNumber;
    gender;
    mob;
    constructor(fname, accountNumber, gender, mob) {
        this.fullName = fname;
        this.accountNumber = accountNumber;
        this.gender = gender;
        this.mob = mob;
    }
}
class Bank {
    customers = [];
    account = [];
    addCustomer(obj) {
        this.customers.push(obj);
    }
    addAcount(obj) {
        this.account.push(obj);
    }
    transfer(obj) {
        let newAccount = this.account.filter((acc) => acc.accountNumber !== obj.accountNumber);
        this.account = [...newAccount, obj];
    }
}
let myBank = new Bank();
let customer1 = new Customer("Owais Qureshi", 42501, "male", 3101234567);
let customer2 = new Customer("Farooq Khan", 42502, "male", 3101234987);
let customer3 = new Customer("Qasim Ahmed", 42503, "male", 3101234874);
myBank.addCustomer(customer1);
myBank.addCustomer(customer2);
myBank.addCustomer(customer3);
myBank.addAcount({ name: customer1.fullName, accountNumber: customer1.accountNumber, balance: 1000 });
myBank.addAcount({ name: customer2.fullName, accountNumber: customer2.accountNumber, balance: 500 });
myBank.addAcount({ name: customer3.fullName, accountNumber: customer3.accountNumber, balance: 2000 });
console.log(myBank);
async function bankservice(bank) {
    let cont = true;
    while (cont) {
        let service = await inquirer.prompt([
            {
                name: "opption",
                type: "list",
                message: "Select an opption for bank service:",
                choices: ["View balance", "Cash WithDraw", "Cash Deposit", "Exit"]
            }
        ]);
        if (service.opption === "View balance") {
            let balanceView = await inquirer.prompt({
                name: "balance",
                type: "number",
                message: "Enter your Account No:"
            });
            let account = myBank.account.find((acc) => acc.accountNumber == balanceView.balance);
            if (!account) {
                console.log(chalk.red.bold("Incorrect Acount number:"));
            }
            if (account) {
                let name = myBank.account.find((n) => n.accountNumber == account?.accountNumber);
                console.log(`Dear Customer ${chalk.green.bold(name?.name)} Your balance is $${chalk.blue.bold(account.balance)} `);
            }
        }
        if (service.opption === "Cash WithDraw") {
            let withdarw = await inquirer.prompt({
                name: "balance",
                type: "number",
                message: "Enter your Account No:"
            });
            let account = myBank.account.find((acc) => acc.accountNumber == withdarw.balance);
            if (!account) {
                console.log(chalk.red.bold("Incorrect Acount number:"));
            }
            if (account) {
                let ans = await inquirer.prompt({
                    name: "withdraw",
                    type: "number",
                    message: "Enter your Amount to withdarw:"
                });
                let nbalance = account.balance - ans.withdraw;
                myBank.transfer({ name: account.name, accountNumber: account.accountNumber, balance: nbalance });
                if (account.balance < ans.withdraw) {
                    console.log(chalk.red.bold("insufficint balance"));
                }
                else {
                    console.log(chalk.green.bold("You successfully Withdraw amount"));
                }
            }
        }
        if (service.opption === "Cash Deposit") {
            let deposit = await inquirer.prompt({
                name: "deposit",
                type: "number",
                message: "Enter your Account No:"
            });
            let account = myBank.account.find((acc) => acc.accountNumber == deposit.deposit);
            if (!account) {
                console.log(chalk.red.bold("Incorrect Acount number:"));
            }
            if (account) {
                let ans = await inquirer.prompt({
                    name: "deposit",
                    type: "number",
                    message: "Enter your Amount to cash deposit:"
                });
                let nbalance = account.balance + ans.deposit;
                bank.transfer({ name: account.name, accountNumber: account.accountNumber, balance: nbalance });
                console.log(`you successfully deposit your amount your new blance is:$${chalk.blue.bold(nbalance)}`);
            }
        }
        if (service.opption === "Exit") {
            cont = false;
        }
    }
}
bankservice(myBank);
