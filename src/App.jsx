import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [budgets, setBudgets] = useState({});
  const [expenses, setExpenses] = useState({});
  const [expenseDetails, setExpenseDetails] = useState({});
  const [expenseDates, setExpenseDates] = useState({});

  const addCategory = () => {
    const defaultCategories = ["Sample Category", "Default Category"];
    if (newCategory && !categories.includes(newCategory)) {
      // Check if the new category is one of the sample categories
      if (defaultCategories.includes(newCategory)) {
        alert("This category name is not allowed. Please choose a unique name.");
      } else {
        setCategories([...categories, newCategory]);
        setBudgets({ ...budgets, [newCategory]: 0 });
        setExpenses({ ...expenses, [newCategory]: 0 });
        setExpenseDetails({ ...expenseDetails, [newCategory]: [] });
        setExpenseDates({ ...expenseDates, [newCategory]: "" });
      }
    } else {
      if (!newCategory) {
        alert("Category name cannot be empty.");
      }
    }
    setNewCategory("");
  };

  const updateBudget = (category, amount) => {
    setBudgets({ ...budgets, [category]: amount });
  };

  const addExpense = (category, amount, date, description) => {
    if (amount && date && description) {
      const newExpense = { amount: parseFloat(amount), date, description };
      setExpenseDetails({
        ...expenseDetails,
        [category]: [...(expenseDetails[category] || []), newExpense],
      });
      setExpenses({
        ...expenses,
        [category]: (expenses[category] || 0) + parseFloat(amount),
      });
    }
  };

  const handleDateChange = (category, date) => {
    setExpenseDates({ ...expenseDates, [category]: date });
  };

  const budgetData = {
    labels: categories,
    datasets: [
      {
        label: "Budget Distribution",
        data: categories.map((cat) => budgets[cat]),
        backgroundColor: [
          "#3498db",
          "#e74c3c",
          "#2ecc71",
          "#f1c40f",
          "#9b59b6",
        ],
        hoverBackgroundColor: [
          "#2980b9",
          "#c0392b",
          "#27ae60",
          "#f39c12",
          "#8e44ad",
        ],
        borderWidth: 1,
      },
    ],
  };

  const expenseData = {
    labels: categories,
    datasets: [
      {
        label: "Expense Distribution",
        data: categories.map((cat) => expenses[cat] || 0),
        backgroundColor: [
          "#8e44ad",
          "#e84393",
          "#27ae60",
          "#f39c12",
          "#3498db",
        ],
        hoverBackgroundColor: [
          "#6c3483",
          "#c0392b",
          "#1f9d55",
          "#d4ac0d",
          "#21618c",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Budget Tracker Dashboard</h1>

      <div className="mb-6">
        <div className="p-4 bg-gray-700 shadow rounded-lg">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add new category"
            className="mr-4 border border-gray-600 px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addCategory}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Category
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <div key={category} className="p-4 bg-gray-700 shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-2">{category}</h2>
            <div className="mb-2">
              <label className="block text-sm mb-1">Set Budget:</label>
              <input
                type="number"
                value={budgets[category] || 0}
                onChange={(e) => updateBudget(category, parseFloat(e.target.value) || 0)}
                placeholder="Set budget"
                className="border border-gray-600 px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Add Expense:</label>
              <input
                type="number"
                placeholder="Amount"
                className="border border-gray-600 px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mb-2"
                onBlur={(e) =>
                  addExpense(
                    category,
                    e.target.value,
                    expenseDates[category] || new Date().toISOString().split("T")[0],
                    "Default description"
                  )
                }
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Expense Date:</label>
              <input
                type="date"
                value={expenseDates[category] || ""}
                onChange={(e) => handleDateChange(category, e.target.value)}
                className="border border-gray-600 px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>
        ))}
      </div>

      {categories.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-700 shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Budget Visualization</h2>
            <div
              className="relative"
              style={{ width: "500px", height: "500px", margin: "0 auto" }}
            >
              <Pie
                data={budgetData}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: "bottom",
                      labels: {
                        color: "#ecf0f1",
                      },
                    },
                  },
                  responsive: true,
                  maintainAspectRatio: true,
                }}
              />
            </div>
          </div>

          <div className="p-4 bg-gray-700 shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Expense Visualization</h2>
            <div
              className="relative"
              style={{ width: "500px", height: "500px", margin: "0 auto" }}
            >
              <Pie
                data={expenseData}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: "bottom",
                      labels: {
                        color: "#ecf0f1",
                      },
                    },
                  },
                  responsive: true,
                  maintainAspectRatio: true,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
