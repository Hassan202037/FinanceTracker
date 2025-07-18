
class Transaction {
  constructor(amount, date) {
    this.amount = amount;
    this.date = date;
  }

  getAmount() {
    return this.amount;
  }

  getDate() {
    return this.date;
  }
}


class Customer {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.transactions = [];
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getTransactions() {
    return this.transactions;
  }

  getBalance() {
    return this.transactions.reduce((acc, t) => acc + t.getAmount(), 0);
  }

  addTransactions(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) {
      console.log("❌ Transaction failed: amount must be a valid number.");
      return false;
    }
    const newBalance = this.getBalance() + amount;
    if (newBalance < 0) {
      console.log(`❌ Transaction declined for ${this.name}: Insufficient balance.`);
      return false;
    }
    this.transactions.push(new Transaction(amount, new Date()));
    return true;
  }
}


class Branch {
  constructor(name) {
    this.name = name;
    this.customers = [];
  }

  getName() {
    return this.name;
  }

  getCustomers() {
    return this.customers;
  }

  addCustomer(customer) {
    if (!customer || !customer.getId || !customer.getName) {
      console.log("❌ Invalid customer object.");
      return false;
    }
    if (this.customers.some(c => c.getId() === customer.getId())) {
      console.log(`❌ Customer ${customer.getName()} already exists in branch ${this.name}.`);
      return false;
    }
    this.customers.push(customer);
    return true;
  }

  addCustomerTransaction(customerId, amount) {
    const customer = this.customers.find(c => c.getId() === customerId);
    if (!customer) {
      console.log(`❌ Customer with ID ${customerId} not found in branch ${this.name}.`);
      return false;
    }
    return customer.addTransactions(amount);
  }
}


class Bank {
  constructor(name) {
    this.name = name;
    this.branches = [];
  }

  addBranch(branch) {
    if (!branch || !branch.getName) {
      console.log("❌ Invalid branch object.");
      return false;
    }
    if (this.branches.some(b => b.getName() === branch.getName())) {
      console.log(`❌ Branch ${branch.getName()} already exists in bank ${this.name}.`);
      return false;
    }
    this.branches.push(branch);
    return true;
  }

  checkBranch(branch) {
    return this.branches.includes(branch);
  }

  findBranchByName(branchName) {
    if (typeof branchName !== 'string') return null;
    const matched = this.branches.filter(b => b.getName().toLowerCase().includes(branchName.toLowerCase()));
    return matched.length ? matched : null;
  }

  addCustomer(branch, customer) {
    if (!this.checkBranch(branch)) {
      console.log(`❌ Branch ${branch ? branch.getName() : branch} does not belong to bank ${this.name}.`);
      return false;
    }
    return branch.addCustomer(customer);
  }

  addCustomerTransaction(branch, customerId, amount) {
    if (!this.checkBranch(branch)) {
      console.log(`❌ Branch ${branch ? branch.getName() : branch} does not belong to bank ${this.name}.`);
      return false;
    }
    return branch.addCustomerTransaction(customerId, amount);
  }

  listCustomers(branch, includeTransactions) {
    if (!this.checkBranch(branch)) {
      console.log(`❌ Branch ${branch ? branch.getName() : branch} does not belong to bank ${this.name}.`);
      return;
    }

    const customers = branch.getCustomers();
    console.log(`Customers in branch: ${branch.getName()}`);
    customers.forEach(customer => {
      console.log(`- ${customer.getName()} (ID: ${customer.getId()})`);
      if (includeTransactions) {
        if (customer.getTransactions().length === 0) {
          console.log("  No transactions.");
        } else {
          customer.getTransactions().forEach(t => {
            console.log(`  Transaction: ${t.getAmount()} on ${t.getDate().toLocaleString()}`);
          });
        }
      }
    });
  }
}



const arizonaBank = new Bank("Arizona");

const westBranch = new Branch("West Branch");
const sunBranch = new Branch("Sun Branch");

const customer1 = new Customer("John", 1);
const customer2 = new Customer("Anna", 2);
const customer3 = new Customer("John", 3);

console.log("\n-- Adding branches --");
arizonaBank.addBranch(westBranch);   
arizonaBank.addBranch(sunBranch);     
arizonaBank.addBranch(westBranch);    

console.log("\n-- Finding branches --");
console.log(arizonaBank.findBranchByName("bank")); 
console.log(arizonaBank.findBranchByName("sun"));  

console.log("\n-- Adding customers --");
arizonaBank.addCustomer(westBranch, customer1); 
arizonaBank.addCustomer(westBranch, customer3); 
arizonaBank.addCustomer(sunBranch, customer1);  
arizonaBank.addCustomer(sunBranch, customer2); 

console.log("\n-- Adding customer transactions --");
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000); 
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000); 
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000); 
console.log("\n-- Customer1 trying invalid transaction (overdraft) --");
customer1.addTransactions(-10000); 

console.log("\n-- Customer1 balance --");
console.log(customer1.getBalance()); 

console.log("\n-- Listing customers with transactions in West Branch --");
arizonaBank.listCustomers(westBranch, true);

console.log("\n-- Listing customers with transactions in Sun Branch --");
arizonaBank.listCustomers(sunBranch, true);
