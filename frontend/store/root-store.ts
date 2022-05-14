import { createContext } from "react";
import { AuthStore } from "./auth-store";

interface State {
  authStore: AuthStore;
}

export const authStore = new AuthStore();

export const context = createContext<State>({
  authStore,
});
