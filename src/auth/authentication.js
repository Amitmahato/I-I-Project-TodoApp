import { store } from "react-context-hook";

export const setUser = (user) => {
  if (user) {
    localStorage.setItem("authuser", JSON.stringify(user));
  }
};

export const removeUser = () => {
  localStorage.removeItem("authuser");
  store.set("user", null);
  store.set("todos", []);
};

export const getToken = () => {
  return JSON.parse(localStorage.getItem("authuser")).token;
};

export const isAuthenticated = () => {
  return JSON.parse(localStorage.getItem("authuser"))?.token ? true : false;
};

export const loadUserToStore = () => {
  const user = JSON.parse(localStorage.getItem("authuser"));
  if (user) store.set("user", user);
};
