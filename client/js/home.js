import { tokenKey, userKey } from "./misc.js";
import { getUserName } from "./storage.js";
import { getFeaturedProducts } from "./main.js";

const user = document.querySelector("#username-login");
const logoutButton = document.querySelector(".logout");

const setUsername = (username) => {
  return (
    username.charAt(0).toUpperCase() +
    username.slice(1) +
    "! " +
    `<div class="wave">Hei</div>`
  );
};

const username = getUserName();

user.innerHTML = setUsername(username);

if (user) {
  logoutButton.innerHTML = `
  <button class="logout-button">Log out</button>
  `;
}

const removeUser = () => {
  localStorage.removeItem(userKey);
  localStorage.removeItem(tokenKey);
  void getFeaturedProducts();
  location.reload();
};

const button = document.querySelector(".logout-button");
button.addEventListener("click", removeUser);
