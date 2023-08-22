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
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
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
 * Display movements in html friendly way
 * @param {Array} movements 
 */
const displayMovements = function(movements, sort = false) {
  containerMovements.innerHTML = '';

  const moves = sort ? [...movements].sort((a,b) => a-b) : movements;

  moves.forEach(function(move, i) {
    const type = move > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
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
   displayMovements(account.movements);

   // display balance
   calcDisplayBalance(account);

   // display summary
   calcDisplaySummary(account);
}

let currentAccount;

// login user on form click, if valid
btnLogin.addEventListener('click', function(e) {
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 1;

    // clear input fields
    inputLoginPin.value = '';
    inputLoginUsername.value = '';

    inputLoginPin.blur();

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
    updateUi(currentAccount);
  }
});

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(move => move >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    updateUi(currentAccount);
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
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
