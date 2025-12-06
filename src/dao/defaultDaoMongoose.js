import { ErrorNotFound } from "../models/error/errors.model.js";

function toPojo(object) {
  return JSON.parse(JSON.stringify(object));
}

export class DaoMongoose {
  #modelDb;
  constructor(mongooseModel) {
    this.#modelDb = mongooseModel;
  }

  async add(element) {
    const pojo = toPojo(await this.#modelDb.create(element));
    delete pojo._id;
    return pojo;
  }

  async findOne(condition) {
    const serched = await this.#modelDb
      .findOne(condition)
      .select({ _id: 0 })
      .lean();
    if (!serched) throw new ErrorNotFound("Not Found");
    return serched;
  }

  async findOneById(condition) {
    const serched = await this.#modelDb
      .findOne({ id: condition })
      .select({ _id: 0 })
      .lean();
    if (!serched) throw new ErrorNotFound("Not Found");
    return serched;
  }

  async findMany(condition) {
    const serched = await this.#modelDb
      .find(condition)
      .select({ _id: 0 })
      .lean();
    return serched;
  }

  async updateOne(condition, data) {
    const updater = await this.#modelDb
      .findOneAndUpdate({ id: condition }, data, {
        new: true,
        projection: { _id: 0 },
      })
      .lean();
    if (!updater) throw new ErrorNotFound("NOT FOUND");
    delete updater._id;
    return updater;
  }

  async updateMany(condition, data) {
    await this.#modelDb.updateMany(condition, data);
  }

  async deleteOne(condition) {
    const deleted = await this.#modelDb
      .findOneAndDelete({ id: condition }, { projection: { _id: 0 } })
      .lean();
    if (!deleted) throw new ErrorNotFound("NOT FOUND");
    delete deleted._id;
    return deleted;
  }

  async deleteMany(condition) {
    await this.#modelDb.deleteMany(condition);
  }
}
