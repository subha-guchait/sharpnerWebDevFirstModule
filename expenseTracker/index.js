const form = document.querySelector("form");
const expenseList = document.querySelector("ul");

const amount = document.getElementById("amount");
const descrip = document.getElementById("descrip");
const catagory = document.getElementById("catagory");

form.addEventListener("submit", submitForm);

async function submitForm(event) {
  try {
    event.preventDefault();
    const expenseDetails = {
      amount: amount.value,
      desc: descrip.value,
      cat: catagory.value,
    };

    const newExpense = await axios.post(
      "http://localhost:3000/add-expense",
      expenseDetails
    );
    console.log(newExpense.data);
    displayExpense(newExpense.data);
    form.reset();
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const expenses = await axios.get("http://localhost:3000/expenses");
    for (let i = 0; i < expenses.data.length; i++) {
      displayExpense(expenses.data[i]);
    }
  } catch (err) {
    console.log(err);
  }
});

function displayExpense(expense) {
  const expenseItem = document.createElement("li");
  expenseItem.setAttribute("id", expense.id);
  expenseItem.innerHTML = `${
    expense.amount + "-" + expense.desc + "-" + expense.cat
  }`;

  // Create Delete button
  const dltBtn = document.createElement("button");
  dltBtn.className = "delete-btn";
  dltBtn.textContent = "Delete";
  expenseItem.appendChild(dltBtn);

  // Create Edit button
  const edtBtn = document.createElement("button");
  edtBtn.className = "edit-btn";
  edtBtn.textContent = "Edit";
  expenseItem.appendChild(edtBtn);

  expenseList.appendChild(expenseItem);

  dltBtn.addEventListener("click", deleteExpense);

  edtBtn.addEventListener("click", editExpense);

  async function deleteExpense(event) {
    try {
      const id = event.target.parentElement.id;
      await deleteExpenseFromApi(id);
      expenseList.removeChild(event.target.parentElement);
    } catch (err) {
      console.log(err);
    }
  }

  async function editExpense(event) {
    try {
      const id = event.target.parentElement.id;
      await deleteExpenseFromApi(id);
      amount.value = event.target.parentElement.textContent.split("-")[0];
      descrip.value = event.target.parentElement.textContent.split("-")[1];
      catagory.value = event.target.parentElement.textContent.split("-")[2];
      expenseList.removeChild(event.target.parentElement);
    } catch (err) {
      console.log(err);
    }
  }
}

function deleteExpenseFromApi(id) {
  return axios.delete(`http://localhost:3000/delete-expense/${id}`);
}
