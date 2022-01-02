import { todos } from "./stores";

export default class LocalStorage {
  static async getAll() {
    return JSON.parse(localStorage.getItem("todos") || "[]");
  }

  static async save(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

