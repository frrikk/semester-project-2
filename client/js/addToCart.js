import { getFromStorage, saveToStorage } from "./storage.js";
import { listKey } from "./misc.js";

export const addItemToCart = (e) => {
  const item = e.target.dataset;

  const { id, title, price } = item;

  const cartItem = {
    id,
    title,
    price,
  };

  const currentItemsInCart = getFromStorage(listKey);

  currentItemsInCart.push(cartItem);
  saveToStorage(listKey, currentItemsInCart);
};
