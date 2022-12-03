'use strict';
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Konda Srikanth',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Konda Rohith',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Konda mani',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Konda laxman',
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

let currentaccount;
const displayMovement = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` 
      <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    }${type}</div>
      <div class="movements__value">${Math.abs(mov)}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
const displaybalnce = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = `${acc.balance}€`;
};
const displaysummary = function (acc) {
  const interst = acc.movements
    .filter(mov => mov > 0)
    .map(int => (int * `${acc.interestRate}`) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interst}€`;
  const deposit = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${deposit}€`;
  const withdraw = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(withdraw)}€`;
};
const updateui = function (acc) {
  displayMovement(currentaccount.movements);
  displaysummary(currentaccount);
  displaybalnce(currentaccount);
};

const crateusername = function (acc) {
  acc.map(function (accs) {
    accs.username = accs.owner
      .toLowerCase()
      .split(' ')
      .map(acc => acc[0])
      .join('');
  });
};
crateusername(accounts);
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentaccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentaccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `welcome Back ${
      currentaccount.owner.split(' ')[0]
    }`;
    containerApp.getElementsByClassName.opacity = 100;
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();

    updateui(currentaccount);
  }
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciveracc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  console.log(amount, reciveracc);
  if (
    amount > 0 &&
    reciveracc &&
    currentaccount.balance >= amount &&
    reciveracc.username !== currentaccount.username
  ) {
    currentaccount.movements.push(-amount);
    reciveracc.movements.push(amount);
    updateui(currentaccount);
  }
});
btnLoan.addEventListener('click', function (e) {
  preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > o && currentaccount.movements.some(acc => acc >= amount * 0.1)) {
    currentaccount.movements.push(amount);
    updateui(currentaccount);
  }
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentaccount.username &&
    Number(inputClosePin.value) === currentaccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === inputCloseUsername.value
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Login to get started';
  }
});
let sorting = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovement(currentaccount.movements, !sorting);
  sorting = !sorting;
});
