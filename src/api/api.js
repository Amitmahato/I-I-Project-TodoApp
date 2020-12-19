import { Get, Post, Delete, Patch } from "./apiHelper";
import axios from "axios";
import {
  setUser as setLocalUser,
  loadUserToStore,
} from "../auth/authentication";
import { store } from "react-context-hook";

const root = "https://todo.abhinavdev.com.np";

export async function login(credentials) {
  try {
    const response = await axios.post(`${root}/api/login`, credentials);
    if (response.data) {
      const user = {
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        email: response.data.email,
        token: response.data.token,
      };

      setLocalUser(user);
      loadUserToStore();
    }
    return response.data;
  } catch (e) {
    return null;
  }
}

export async function signup(credentials) {
  try {
    const response = await axios.post(`${root}/api/sign-up`, credentials);
    if (response.data) {
      const { first_name, last_name, email, token } = response.data;
      const user = {
        firstName: first_name,
        lastName: last_name,
        email,
        token,
      };

      setLocalUser(user);
      loadUserToStore();
    }
    return response.data;
  } catch (e) {
    return null;
  }
}

export async function postTodoItem(data) {
  try {
    const response = await Post(`${root}/api/todo/`, data, true);
    return response.data;
  } catch (err) {
    return null;
  }
}

export async function updateTodoItem(data) {
  try {
    const response = await Patch(`${root}/api/todo/${data.id}/`, data, true);
    const updatedTodo = response.data;
    const state = store.getState();
    const updatedTodoList = (state.todos || []).map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    store.set("todos", updatedTodoList);
    return response.data;
  } catch (err) {
    return null;
  }
}

export async function getBatchTodo(params) {
  try {
    const response = await Get(`${root}/api/todo/`, true, params);
    store.set("todos", response.data);
    return response.data;
  } catch (err) {
    return null;
  }
}

export async function getTodoById(id) {
  try {
    const response = await Get(`${root}/api/todo/${id}`, true);
    return response.data;
  } catch (err) {
    return null;
  }
}
