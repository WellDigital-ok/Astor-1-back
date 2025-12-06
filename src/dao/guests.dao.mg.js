import mongoose from "mongoose";
import { DaoMongoose } from "./defaultDaoMongoose.js";

export const SchemaGuests = new mongoose.Schema(
  {
    id: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    lastName: { type: String },
  },
  { versionKey: false }
);

const guestsModel = mongoose.model("guests", SchemaGuests);

export const nmg = new DaoMongoose(guestsModel);
