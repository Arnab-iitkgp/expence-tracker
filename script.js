"use strict";

const menu = document.querySelector("#menu");
const slider = document.querySelector(".slidebar");
const closeBtn = document.querySelector(".close-btn");
const content = document.querySelector(".content");
const form = document.querySelectorAll("form");
const movements = document.querySelector(".tran-heading");
const currentBalance = document.querySelector("#Current-balance");
const stats = document.querySelectorAll(".forStats");
const home = document.querySelectorAll(".homebtn");
const content2 = document.querySelector(".content2");
const resetbtn = document.querySelector(".reset");
const submitBtn1 = document.querySelector("#sbmtbtn1");
const submitBtn2 = document.querySelector("#sbmtBtn2");
//////variables declarartion
let movementsArr = [];
let curValue = 0;
let incTotal = 0;
let expTotal = 0;
let foodTotal = 0;
let acomTotal = 0;
let grocTotal = 0;
let eduTotal = 0;
let salaryTotal = 0;
let sideHustleTotal = 0;
/////////// currentBalanceUpdating
currentBalance.textContent = `Rs ${curValue}`;

////////Functions ////////
const init = function () {
  getLocaStorage();
  calcTotal(movementsArr);
  calcExp(movementsArr);
  calcInc(movementsArr);
};

const welcomeMsg = function () {
  let html = `<div class="movement-row">
   <h1 class="msg"> ADD A Transaction please😊</h1>
  </div>`;
  movements.insertAdjacentHTML("afterend", html);
};

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
function setLocalStorage() {
  localStorage.setItem("movements", JSON.stringify(movementsArr));
  localStorage.setItem("currentBalance", curValue);
}

function getLocaStorage() {
  let data = JSON.parse(localStorage.getItem("movements"));
  console.log(data);
  curValue = Number(localStorage.getItem("currentBalance"));
  currentBalance.textContent = `Rs ${curValue}`;
  if (!data) welcomeMsg();
  if (!data) return;
  movementsArr = data;
  movementsArr.forEach((obj) => addTransaction(obj));
}

function reset() {
  localStorage.removeItem("movements");
  localStorage.removeItem("currentBalance");
  location.reload();
}
const calcTotal = function (arr) {
  arr.forEach((mov) => {
    mov.type === "earning"
      ? (incTotal += Number(mov.amount))
      : (expTotal += Number(mov.amount));
  });
}; //calc ExpenceTotal
function calcExp(arr) {
  arr.forEach((mov) => {
    if (mov.tags === "Food") foodTotal += Number(mov.amount);
    else if (mov.tags === "Grocceries") grocTotal += Number(mov.amount);
    else if (mov.tags === "Education") eduTotal += Number(mov.amount);
    else if (mov.tags === "Acomodation") acomTotal += Number(mov.amount);
  });
}
// calc income Total
function calcInc(arr) {
  arr.forEach((mov) => {
    if (mov.tags === "Salary") salaryTotal += Number(mov.amount);
    else if (mov.tags === "side hustle") sideHustleTotal += Number(mov.amount);
  });
}
////////////////initialisation of App//////////////
init();
//////////////////////////////EVENT-LISTENERS/////////
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

resetbtn.addEventListener("click", reset);

///submit button event listeners....////

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
  setLocalStorage();
  clearFields(earningAmount, earningType, earningDate);
  location.reload();
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
    setLocalStorage();
    clearFields(expenceAmount, expenceType, expenceDate);
    location.reload();
  }
});

////////////STATS////////////

const ctx = document.getElementById("myChart");
const ctx3 = document.getElementById("myChart3");
const ctx2 = document.getElementById("myChart2");

new Chart(ctx, {
  type: "pie",
  data: {
    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "expence"],
    labels: ["Income", "Expence"],

    datasets: [
      {
        label: "Amount",
        data: [incTotal, expTotal],
        borderWidth: 2,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  },
});
new Chart(ctx2, {
  type: "pie",
  data: {
    labels: ["Food", "Accomodations", "Education", "Grocceries"],

    datasets: [
      {
        label: "Amount",
        data: [foodTotal, acomTotal, eduTotal, grocTotal],
        borderWidth: 2,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  },
});

new Chart(ctx3, {
  type: "pie",
  data: {
    labels: ["Salary", "Side Hustle"],

    datasets: [
      {
        label: "Amount",
        data: [salaryTotal, sideHustleTotal],
        borderWidth: 2,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  },
});

////////implementation of stats functionality buttons
stats.forEach((stats) => {
  stats.addEventListener("click", function () {
    content.classList.add("invisible");
    content2.classList.remove("invisible");
    content2.style.zIndex = 22;
  });
});
home.forEach((home) => {
  home.addEventListener("click", function () {
    content.classList.remove("invisible");
    content2.classList.add("invisible");
    content2.style.zIndex = -33;
  });
});

///
