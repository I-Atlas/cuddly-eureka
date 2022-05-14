export interface JsonMap {
  [member: string]: string | number | boolean | null | JsonArray | JsonMap;
}

export type JsonArray = Array<
  string | number | boolean | null | JsonArray | JsonMap
>;

export type Json = string | number | boolean | null | JsonArray | JsonMap;

export class SafeLocalStorage {
  static setItem = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error(e);
    }
  };

  static getItem = (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  static removeItem = (key: string) => {
    try {
      return localStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  };

  static setItemObject = (key: string, value: JsonMap): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };

  static getItemObject = (key: string): JsonMap | null => {
    try {
      return JSON.parse(localStorage.getItem(key) ?? "");
    } catch (e) {
      console.error(e);
    }
    return null;
  };
}
