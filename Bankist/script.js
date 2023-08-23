'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Dallas McGroarty',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2023-08-19T23:36:17.929Z",
    "2023-08-21T10:51:36.790Z",
  ],
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/**
 * format date
 * @param {Date} date 
 */
const formatMovementDate = function(date) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;


  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;

};

/**
 * Display movements in html friendly way
 * @param {Array} movements 
 */
const displayMovements = function(account, sort = false) {
  containerMovements.innerHTML = '';

  const moves = sort ? [...account.movements].sort((a,b) => a-b) : account.movements;

  moves.forEach(function(move, i) {
    const type = move > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.movementsDates[i]);

    const displayDate = formatMovementDate(date)

    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">$${Math.abs(move)}</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

/**
 * Calculate and display account balance
 * @param {Array} movements 
 */
const calcDisplayBalance = function(account) {
  account.balance = account.movements.reduce(function(acc, val) {
    return acc += val;
  })

  labelBalance.textContent = `$${account.balance}`;
};

/**
 * 
 * @param {Array} movements 
 */
const calcDisplaySummary = function(account) {
  const income = account.movements
    .filter(move => move > 0)
    .reduce((acc, val) => acc + val);

  labelSumIn.textContent = `$${income}`;

  const out = account.movements
    .filter(move => move < 0)
    .reduce((acc, val) => acc + val);
  labelSumOut.textContent = `$${Math.abs(out)}`;

  const interest = account.movements
    .filter(move => move > 0)
    .map(deposit => deposit * account.interestRate / 100)
    .filter(val => val >= 1)
    .reduce((acc, val) => acc + val);
  labelSumInterest.textContent = `$${interest}`;
};


/**
 * Creates a username for each account
 * @param {Array} accounts 
 */
const createUserNames = function(accounts) {
  accounts.forEach(function(account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);

/**
 * 
 * @param {Object} account 
 */
const updateUi = function(account) {
   // display movements
   displayMovements(account);

   // display balance
   calcDisplayBalance(account);

   // display summary
   calcDisplaySummary(account);
}


const startLogoutTimer = function() {
  // set time to 5 minutes
  let time = 120;

  const tick = function() {
    const min = String(Math.trunc(time / 60)).padStart(2,0);
    const sec = String(time % 60).padStart(2,0);

    // in each call print remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // when 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);

      labelWelcome.textContent = `Login in to get started`;
      containerApp.style.opacity = 0;
    }

    time--
  };

  // call timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
}

let currentAccount, curTimer;


// login user on form click, if valid
btnLogin.addEventListener('click', function(e) {
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 1;

    // current date time
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = now.getHours();
    const min = now.getMinutes();

    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // clear input fields
    inputLoginPin.value = '';
    inputLoginUsername.value = '';

    inputLoginPin.blur();

    if (curTimer) {
      clearInterval(curTimer);
      curTimer = startLogoutTimer();
    }

    curTimer = startLogoutTimer();

    updateUi(currentAccount);
  }
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    updateUi(currentAccount);

    // reset timer
    clearInterval(curTimer);
    curTimer = startLogoutTimer();
  }
});

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(move => move >= amount * 0.1)) {
    setTimeout(function(){
      currentAccount.movements.push(amount);

      currentAccount.movementsDates.push(new Date().toISOString());

      updateUi(currentAccount);

      // reset timer
      clearInterval(curTimer);
      curTimer = startLogoutTimer();
    }, 2000);
  }

  inputLoanAmount.value = '';
})

btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  inputCloseUsername.value = inputClosePin.value = '';

  const user = inputCloseUsername.value;
  const userPin = Number(inputClosePin.value);

  if (user && user === currentAccount.username && userPin === currentAccount.pin) {
    // delete account
    accounts.splice(accounts.findIndex(acc => acc.username === user), 1);
  }

  containerApp.style.opacity = 0;
});

let sorted = false;

btnSort.addEventListener('click', function(e) {
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
