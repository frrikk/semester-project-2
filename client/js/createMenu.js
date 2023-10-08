import { getUserName } from "./storage.js";

export const createMenu = () => {
  const { pathname } = document.location;

  const username = getUserName();

  let auth = "";

  if (username) {
    auth = `<a href="./add.html">Add a product</a>`;
  }

  const container = document.querySelector(".menu-container");

  container.innerHTML = `
        <a id="nav-logo" href="./index.html" class="${
          pathname === "./index.html" ? "active" : ""
        }">Shooless 👞</a>
        <div class="nav__misc">
            <div class="nav--profile">
                <a href="./cart.html">
                    <img src="./assets/cart.svg" alt="shopping bag" />
                </a>
            </div>
            <div class="nav--cart">
                <a href="./profile.html">
                    <img src="./assets/profile.svg" alt="profile" />
                </a>
            </div>
        </div>
            ${auth}
    `;
};
