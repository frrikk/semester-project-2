import { createMenu } from "./createMenu.js";
import { displayMessage } from "./displayMessage.js";
import { getToken } from "./storage.js";
import { baseUrl } from "./misc.js";
import { deleteButton } from "./deleteButton.js";

const token = getToken();

if (!token) {
  location.href = "./index.html";
}

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "./index.html";
}

const productUrl = baseUrl + "/products/" + id;

const form = document.querySelector("form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const idInput = document.querySelector("#id");
const updateButton = document.querySelector("#update");
const message = document.querySelector(".message");

const updateProduct = async (
  nameValue,
  priceValue,
  descriptionsValue,
  idValue
) => {
  const url = baseUrl + "/products/" + id;
  const data = JSON.stringify({
    title: nameValue,
    price: priceValue,
    description: descriptionsValue,
    id: idValue,
  });

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();

    if (data.updated_at) {
      displayMessage("success", "Product updated", ".message");
      setTimeout(() => (message.innerHTML = ""), 2000);
    }

    if (data.error) {
      displayMessage("error", data.message, ".message");
    }
  } catch (err) {
    console.log(err);
  }
};

const submitForm = (e) => {
  e.preventDefault();
  message.innerHTML = "";

  const nameValue = name.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionsValue = description.value.trim();
  const idValue = idInput.value;

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

  updateProduct(nameValue, priceValue, descriptionsValue, idValue);
};

(async () => {
  try {
    const res = await fetch(productUrl);
    const details = await res.json();

    name.value = details.title;
    price.value = details.price;
    description.value = details.description;
    idInput.value = details.id;

    deleteButton(details.id);
  } catch (err) {
    console.log(err);
  } finally {
    // loading.style.display = "none";
    form.style.display = "block";
  }
})();

form.addEventListener("submit", submitForm);
