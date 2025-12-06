import { ErrorInvalidArgument } from "../error/errors.model.js";
import { Uid } from "../../utils/UiD.js";

export default class Guests {
  #id;
  #name;
  #lastName;

  constructor({ name, lastName }) {
    this.#id = this.valilastNameId(Uid());
    this.#name = this.validateName(name);
    this.#lastName = this.validatelastName(lastName);
  }

  // Validaciones
  valilastNameId(id) {
    if (!id) {
      throw new ErrorInvalidArgument("ID is required");
    }
    return id;
  }

  validateName(name) {
    if (!name || typeof name !== "string") {
      throw new ErrorInvalidArgument("name is required and must be a string");
    }
    return name;
  }

  validatelastName(lastName) {
    if (lastName && typeof lastName !== "string") {
      throw new ErrorInvalidArgument("lastName  must be a string");
    }
    return lastName;
  }

  // Geters

  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get lastName() {
    return this.#lastName;
  }

  // Method to access data without exposing private fields
  dto() {
    return {
      id: this.#id,
      name: this.#name,
      lastName: this.#lastName,
    };
  }
}
