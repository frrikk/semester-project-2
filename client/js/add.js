import { createMenu } from "./createMenu.js";
import { displayMessage } from "./displayMessage.js";
import { getToken } from "./storage.js";
import { baseUrl } from "./misc.js";

const token = getToken();

if (!token) {
  location.href = "./index.html";
}

createMenu();

const form = document.querySelector("form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const file = document.querySelector("#add-file");
const message = document.querySelector(".message");

const addProduct = async (name, price, description) => {
  const url = baseUrl + "/products";
  const data = JSON.stringify({
    title: name,
    price: price,
    description: description,
  });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await fetch(url, options);
    const json = await res.json();

    if (json.created_at) {
      displayMessage("success", "Product created", ".message");
      form.reset();
      setTimeout(() => (message.innerHTML = ""), 2000);
    }

    if (json.error) {
      displayMessage("error", json.message + " Try to log back in", ".message");
    }

    console.log(json);
  } catch (err) {
    displayMessage("warning", "An error occurred", ".message");
  }
};

const submitForm = (e) => {
  e.preventDefault();

  message.innerHTML = "";

  const nameValue = name.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionsValue = description.value.trim();

  if (
    (nameValue.length || priceValue.length || descriptionsValue.length) === 0 ||
    isNaN(priceValue)
  ) {
    return displayMessage(
      "warning",
      "Please add values to input fields",
      ".message"
    );
  }

  addProduct(nameValue, priceValue, descriptionsValue);
};

form.addEventListener("submit", submitForm);
