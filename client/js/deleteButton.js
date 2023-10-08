import { getToken } from "./storage.js";
import { baseUrl } from "./misc.js";

export const deleteButton = (id) => {
  const container = document.querySelector(".delete-container");

  container.innerHTML = `
  <button type="button" class="delete">Delete</button>
  `;

  const button = document.querySelector(".delete");

  button.onclick = async () => {
    const url = baseUrl + "/products/" + id;

    const doDelete = confirm("Are you really sure you want to delete this?");

    if (doDelete) {
      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await fetch(url, options);
        const json = await res.json();

        location.href = "./index.html";
      } catch (err) {
        console.log(err);
      }
    }
  };
};
