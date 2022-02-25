const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

const getRandomUser = async () => {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };
    addData(newUser);
};

const updateDOM = (providedData = data) => {
    // First clear 'main' div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    //Add a div for each user, holding their name and money
    providedData.forEach((user) => {
        const userElement = document.createElement('div');
        userElement.classList.add('person');
        userElement.innerHTML = `<strong>${
            user.name
        }</strong> ${formatAsMoneyVal(user.money)}`;
        main.appendChild(userElement);
    });
};

const addData = (obj) => {
    data.push(obj);

    updateDOM();
};

// ~~~~~ Array Functions ~~~~~

//Double everyone's money, then update DOM
const doubleAllMoney = () => {
    data.map((user) => {
        user.money *= 2;
    });
    updateDOM(data);
};

//Hide all users except those with >= $1,000,000
const showMillionaires = () => {
    updateDOM(data.filter((user) => user.money >= 1000000));
};

// Sort from richest to poorest ↓
const sortByRichest = () => {
    updateDOM(data.sort((a, b) => b.money - a.money));
};

// Format a number as money
const formatAsMoneyVal = (number) => {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // 12,345.67
};

// Calc total wealth
const calculateWealth = () => {
    const wealth = data.reduce((acc, user) => acc + user.money, 0);

    const totalElement = document.createElement('div');
    totalElement.classList.add('total');
    totalElement.innerHTML = `<strong>Total Wealth</strong> ${formatAsMoneyVal(
        wealth
    )}`;
    main.appendChild(totalElement);
};

getRandomUser();
getRandomUser();
getRandomUser();

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleAllMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calculateWealth);
