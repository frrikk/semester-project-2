import { createMenu } from "./createMenu.js";

createMenu();

const container = document.querySelector(".details-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const productDetailUrl = `http://localhost:1337/products/${id}`;

const getProductDetails = async () => {
  const res = await fetch(productDetailUrl);
  const data = await res.json();

  container.innerHTML = `
        <div>Title: ${data.title}</div>
        <div>Price: ${data.price}</div>
`;
};

await getProductDetails();
