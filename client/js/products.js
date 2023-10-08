import { baseUrl } from "./misc.js";
import { createMenu } from "./createMenu.js";
import { getUserName } from "./storage.js";
import { addItemToCart } from "./addToCart.js";

const container = document.querySelector(".products-container");
const productsUrl = "http://localhost:1337/products";

createMenu();

export const getAllProducts = async () => {
  try {
    const res = await fetch(productsUrl);
    const data = await res.json();

    container.innerHTML = "";
    const username = getUserName();

    data.forEach((item) => {
      const { id, title, price, image } = item;
      container.innerHTML += `
       <div class="products__container">
            <div class="products--image">
                <img src="${
                  baseUrl + image.formats.small.url
                }" alt="featured-${title}">
            </div>
            <a href="details.html?id=${id}" class="products--details">
                <h3 class="title">${title}</h3>
                <p class="price">$ ${price}</p>
            </a>
            <button data-id="${id}" data-title="${title}" data-price="${price}">
                <img src="../assets/shop.svg" class="add" data-id="${id}" data-title="${title}" data-price="${price}"/>
            </button>
        ${
          username
            ? `<a href="edit.html?id=${id}"><img src="../assets/edit.svg"/></a>`
            : ""
        }
        </div>
      `;
    });

    const addItem = document.querySelectorAll("button");

    addItem.forEach((add) => {
      add.addEventListener("click", addItemToCart);
    });
  } catch (err) {
    console.log(err);
  }
};

await getAllProducts();
