import { nmg } from "../dao/guests.dao.mg.js";
import { DefaultRepository } from "./DefaultRepository.js";

export const guestsRepository = new DefaultRepository(nmg);
