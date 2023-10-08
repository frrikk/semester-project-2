import { createMenu } from "./createMenu.js";
import { displayMessage } from "./displayMessage.js";
import {
  baseUrl,
  warningMessage,
  errorMessage,
  successMessage,
} from "./misc.js";
import { saveToken, saveUser } from "./storage.js";

const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message");

createMenu();

const onSubmit = async (e) => {
  e.preventDefault();

  message.innerHTML = "";

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (!usernameValue || !passwordValue) {
    username.focus();
    return displayMessage("warning", warningMessage, ".message");
  }

  userLogin(usernameValue, passwordValue);
};

const userLogin = async (username, password) => {
  const url = baseUrl + "/auth/local";

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data.user) {
      displayMessage("success", successMessage, ".message");
      saveToken(data.jwt);
      saveUser(data.user);
      setTimeout(() => (document.location.href = "./index.html"), 500);
    }

    if (data.error) {
      displayMessage("error", errorMessage, ".message");
    }
  } catch (err) {
    displayMessage("error", err, ".message");
  }
};

form.addEventListener("submit", onSubmit);
