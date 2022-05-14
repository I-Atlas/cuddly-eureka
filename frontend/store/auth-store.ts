import { makeAutoObservable } from "mobx";
import { SafeLocalStorage } from "helpers/safe-local-storage";

export interface IUser {
  first_name: string;
  last_name: string;
  name: string;
  email: string;
}

export interface IUserToAuthJSON {
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  token: string;
}

export class AuthStore {
  user = {} as IUser;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  async logout() {
    try {
      SafeLocalStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.error(e);
    }
  }
}
