import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
export const initialStore = {
  user: null,
  todos: [],
};
