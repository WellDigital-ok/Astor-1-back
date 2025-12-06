import express from "express";
import { Router } from "express";
import { guestsRouter } from "./router.guests.js";

export const apiRouter = Router();

apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

apiRouter.use("/list", guestsRouter);
