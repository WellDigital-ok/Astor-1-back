import { Router } from "express";

import {
  handleDelete,
  handleGet,
  handlePost,
  handlePut,
} from "../../controllers/api/controller.all.guests.js";

export const guestsRouter = Router();

guestsRouter.get("/", handleGet);
guestsRouter.post("/", handlePost);
guestsRouter.put("/:nid", handlePut);
guestsRouter.delete("/:nid", handleDelete);
