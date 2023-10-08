import { listKey } from "./misc.js";
import { saveToStorage, getFromStorage } from "./storage.js";

const cartContainer = document.querySelector(".cart-container");
const cartTotal = document.querySelector(".cart-total");
import { createMenu } from "./createMenu.js";

let cartList = getFromStorage(listKey);

createMenu();

const renderCartList = () => {
  cartContainer.innerHTML = "";
  let sum = 0;

  cartList.forEach(({ id, title, price }) => {
    cartContainer.innerHTML += `
   <li>
  <p>Id: ${id}</p>
  <p>Title: ${title}</p>
  <p>Price: ${price}</p>
  <button data-id="${id}">Remove</button>
</li>
        `;

    sum += parseFloat(price);
  });

  cartTotal.innerHTML = "Your current total is: " + "$" + sum;
  if (sum === 0) {
    cartTotal.innerHTML = "";
  }

  const removeItemFromCart = document.querySelectorAll("button");

  const removeItem = (e) => {
    const itemToDelete = e.target.dataset.id;
    console.log(itemToDelete);
    const newCartList = cartList.filter((item) => item.id !== itemToDelete);
    cartList = newCartList;
    renderCartList();
  };

  removeItemFromCart.forEach((i) => {
    i.addEventListener("click", removeItem);
  });
  saveToStorage(listKey, cartList);
};

renderCartList(cartList);
