import { listKey, tokenKey, userKey } from "./misc.js";

// Admin

export const saveToken = (token) => {
  return saveToStorage(tokenKey, token);
};

export const getToken = () => {
  return getFromStorage(tokenKey);
};

export const saveUser = (user) => {
  saveToStorage(userKey, user);
};

export const getUserName = () => {
  const user = getFromStorage(userKey);

  if (!user) {
    return null;
  }
  return user.username;
};

// Products
export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = (key) => {
  const value = localStorage.getItem(key);

  if (!value) {
    return [];
  }

  return JSON.parse(value);
};
