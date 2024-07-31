"use strict";

const menu = document.querySelector("#menu");
const slider = document.querySelector(".slidebar");
const closeBtn = document.querySelector(".close-btn");
const content = document.querySelector(".content");
const form = document.querySelectorAll("form");
const movements = document.querySelector(".tran-heading");
const currentBalance = document.querySelector("#Current-balance");
menu.addEventListener("click", function () {
  console.log("clicked");
  //   slider.style.opacity = 100;
  slider.classList.remove("display");
  content.classList.add("blur-filter");
});
closeBtn.addEventListener("click", function () {
  slider.classList.add("display");
  content.classList.remove("blur-filter");
});
form.forEach((f) =>
  addEventListener("submit", (e) => {
    e.preventDefault();
  })
);
let movementsArr = [
  { type: "earning", date: "today", tags: "side hustle", amount: "1000" },
  { type: "expence", date: "yesterday", tags: "education", amount: "100" },
];
const addTransaction = function (obj) {
  let html = `   <div class="movement-row">
            <div class="movement-type-${
              obj.type
            }">${obj.type.toUpperCase()}</div>
            <div class="movement-date">${obj.date}</div>
            <div class="movement-tags">${obj.tags}</div>
            <div class="movement-value">${obj.amount}</div>
          </div>`;
  movements.insertAdjacentHTML("afterend", html);
};
// addTransaction();
movementsArr.forEach((obj) => {
  addTransaction(obj);
});
let curValue = 5000;
currentBalance.textContent = `Rs ${curValue}`;

const updateCurBal = function (val, type) {
  val = Number(val);
  if (type === "earning") {
    curValue += val;
  } else if (type === "expence") {
    if (val >= curValue) {
      alert("Insufficent Balance");
      return false;
    }
    curValue -= val;
  }

  currentBalance.textContent = `Rs ${curValue}`;
  return true;
};
const clearFields = function (amount, type, date) {
  amount = "";
  type = "";
  date = "";
};
const submitBtn1 = document.querySelector("#sbmtbtn1");
const submitBtn2 = document.querySelector("#sbmtBtn2");

submitBtn1.addEventListener("click", function () {
  const earningAmount = document.querySelector("#earning-amount").value;
  const earningType = document.querySelector("#earning-type").value;
  const earningDate = document.querySelector("#earning-date").value;
  if (!earningAmount || !earningDate || !earningType) {
    alert("input field is empty");
    return;
  }
  let newObj = {
    type: "earning",
    date: earningDate,
    tags: earningType,
    amount: earningAmount,
  };
  updateCurBal(newObj.amount, newObj.type);
  movementsArr.push(newObj);
  addTransaction(newObj);
  clearFields(earningAmount, earningType, earningDate);
});
submitBtn2.addEventListener("click", function () {
  const expenceAmount = document.querySelector("#expence-amount").value;
  const expenceType = document.querySelector("#expence-type").value;
  const expenceDate = document.querySelector("#expence-date").value;
  if (!expenceAmount || !expenceDate || !expenceType) {
    alert("input field is empty");
    return;
  }
  let newObj = {
    type: "expence",
    date: expenceDate,
    tags: expenceType,
    amount: expenceAmount,
  };

  let status = updateCurBal(newObj.amount, newObj.type);
  if (status) {
    movementsArr.push(newObj);
    addTransaction(newObj);
    clearFields(expenceAmount, expenceType, expenceDate);
  }
});
