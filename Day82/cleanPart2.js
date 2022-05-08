// Function Code

const budget = Object.freeze([
  { value: 250, description: "Sold old TV 📺", user: "jonas" },
  { value: -45, description: "Groceries 🥑", user: "jonas" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "jonas" },
  { value: 300, description: "Freelancing 👩‍💻", user: "jonas" },
  { value: -1100, description: "New iPhone 📱", user: "jonas" },
  { value: -20, description: "Candy 🍭", user: "matilda" },
  { value: -125, description: "Toys 🚂", user: "matilda" },
  { value: -1800, description: "New Laptop 💻", user: "jonas" },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const checkLimit = (spendingLimits, user) => spendingLimits?.[user] ?? 0;

// Pure Function :D
const addExpense = function (
  state,
  spendingLimit,
  value,
  description,
  user = "jonas"
) {
  const cleanUser = user.toLowerCase();
  // const lim = spendingLimits[user] ? spendingLimits[user] : 0;
  const limit = checkLimit(spendingLimit, cleanUser);

  return value <= limit
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

const checkBudget = (finalBudget, spendingLimit) =>
  finalBudget.map((budget) =>
    budget.value < -checkLimit(spendingLimit, budget.user)
      ? { ...budget, flag: "limit" }
      : budget
  );

const logBigExpenses = function (finalBudget, limit) {
  //   let output = "";
  //   for (var entry of budget)
  //     output += entry.value <= -limit ? `${entry.description.slice(-2)} / ` : "";
  //   output = output.slice(0, -2); // Remove last '/ '
  //   console.log(output);

  return (
    finalBudget
      .filter((budget) => budget.value <= -limit)
      // .map((expense) => expense.description.slice(-2))
      // .join("/");
      .reduce(
        (accu, expense) => `${accu} ${expense.description.slice(-2)}/`,
        ""
      )
      .slice(0, -1)
  );
};

// Tried composing (Expirimental)
const finalBudget = addExpense(
  addExpense(
    addExpense(budget, spendingLimits, 10, "Pizza 🍕"),
    100,
    "Going to movies 🍿",
    "Matilda"
  ),
  spendingLimits,
  200,
  "Stuff",
  "jonas"
);

const afterBudgetCheck = checkBudget(finalBudget, spendingLimits);

console.log(logBigExpenses(finalBudget, 1000));
console.log(`Buget at the begining is `);
console.log(budget);
console.log(`Final budget before limit check is `);
console.log(finalBudget);
console.log(`Budget after spending limit check: `);
console.log(afterBudgetCheck);
