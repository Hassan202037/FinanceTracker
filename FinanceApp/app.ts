// Define types
interface Entry {
  source: string;
  amount: number;
  date?: string;
}

interface SavingTarget {
  goal: string;
  amount: number;
}

// Income Elements
const incomeForm = document.getElementById("income-form") as HTMLFormElement;
const incomeSource = document.getElementById("income-source") as HTMLInputElement;
const incomeAmount = document.getElementById("income-amount") as HTMLInputElement;
const incomeDate = document.getElementById("income-date") as HTMLInputElement;
const incomeList = document.getElementById("income-list") as HTMLUListElement;

// Expense Elements
const expenseForm = document.getElementById("expense-form") as HTMLFormElement;
const expenseSource = document.getElementById("expense-source") as HTMLInputElement;
const expenseAmount = document.getElementById("expense-amount") as HTMLInputElement;
const expenseDate = document.getElementById("expense-date") as HTMLInputElement;
const expenseList = document.getElementById("expense-list") as HTMLUListElement;

// Savings Elements
const savingForm = document.getElementById("saving-form") as HTMLFormElement;
const savingGoal = document.getElementById("saving-goal") as HTMLInputElement;
const savingAmount = document.getElementById("saving-amount") as HTMLInputElement;
const savingList = document.getElementById("saving-list") as HTMLUListElement;

// Utility to save and display
function saveData(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadData<T>(key: string): T[] {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function addToList(list: HTMLUListElement, entry: string) {
  const li = document.createElement("li");
  li.textContent = entry;
  list.appendChild(li);
}

// Income handler
incomeForm.onsubmit = (e) => {
  e.preventDefault();
  const entry: Entry = {
    source: incomeSource.value,
    amount: parseFloat(incomeAmount.value),
    date: incomeDate.value,
  };

  const incomes = loadData<Entry>("incomes");
  incomes.push(entry);
  saveData("incomes", incomes);

  addToList(incomeList, `${entry.source} - $${entry.amount} on ${entry.date}`);
  incomeForm.reset();
};

// Expense handler
expenseForm.onsubmit = (e) => {
  e.preventDefault();
  const entry: Entry = {
    source: expenseSource.value,
    amount: parseFloat(expenseAmount.value),
    date: expenseDate.value,
  };

  const expenses = loadData<Entry>("expenses");
  expenses.push(entry);
  saveData("expenses", expenses);

  addToList(expenseList, `${entry.source} - $${entry.amount} on ${entry.date}`);
  expenseForm.reset();
};

// Saving handler
savingForm.onsubmit = (e) => {
  e.preventDefault();
  const entry: SavingTarget = {
    goal: savingGoal.value,
    amount: parseFloat(savingAmount.value),
  };

  const savings = loadData<SavingTarget>("savings");
  savings.push(entry);
  saveData("savings", savings);

  addToList(savingList, `${entry.goal} - $${entry.amount}`);
  savingForm.reset();
};

// Load existing data on startup
window.onload = () => {
  loadData<Entry>("incomes").forEach(e =>
    addToList(incomeList, `${e.source} - $${e.amount} on ${e.date}`)
  );

  loadData<Entry>("expenses").forEach(e =>
    addToList(expenseList, `${e.source} - $${e.amount} on ${e.date}`)
  );

  loadData<SavingTarget>("savings").forEach(e =>
    addToList(savingList, `${e.goal} - $${e.amount}`)
  );
};
const dateObj = new Date(entry.date);
const formattedDate = dateObj.toLocaleDateString('en-US'); // يظهر MM/DD/YYYY
addToList(incomeList, `${entry.source} - $${entry.amount} on ${formattedDate}`);

const formattedDate = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD
