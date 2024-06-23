const BASE_URL =
  'https://currency-convertor15.p.rapidapi.com';
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
let amount1 = document.querySelector(".amount input");
let amtVal = amount1.value;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '3e380e911cmsh26e2b78d0d4eabdp193e56jsnee3885b532a9',
		'x-rapidapi-host': 'currency-convertor15.p.rapidapi.com'
	}
};
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const fetchData = async () => {
const host = 'api.frankfurter.app';
const amount = amount1.value;
const fromCurrency = fromCurr.value;
const toCurrency = toCurr.value;

fetch(`https://${host}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      console.error('Error fetching data:', data.error);
      return; // Handle the error gracefully, display an error message to the user, etc.
    }

    const conversionRate = data.rates[toCurrency];
    console.log(`${amount} ${fromCurrency} is equivalent to ${conversionRate.toFixed(2)} ${toCurrency}`); // Improved output with two decimal places
    let finalAmount=amtVal*conversionRate;
    msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

  })
  .catch(error => console.error('Error:', error)); // Catch any other errors that might occur
};
// const updateExchangeRate = async () => {
//   let amount = document.querySelector(".amount input");
//   let amtVal = amount.value;
//   if (amtVal === "" || amtVal < 1) {
//     amtVal = 1;
//     amount.value = "1";
//   }
//   const URL = `${BASE_URL}/?fromCurrency=${fromCurr.value.toLowerCase()}& toCurrency=${toCurr.value.toLowerCase()}.json`;
//   let response = await fetch(URL,options);
//   console.log(response);
//   let data = await response.json();
//   let rate = data[toCurr.value.toLowerCase()];

//   let finalAmount = amtVal * rate;
//   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
// };

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  // updateExchangeRate();
  fetchData();
});

window.addEventListener("load", () => {
  // updateExchangeRate();
  fetchData();
});