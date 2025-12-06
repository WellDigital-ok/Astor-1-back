// Libery
import express from "express";
import cors from "cors";

//root
import { apiRouter } from "../routers/api/router.api.js";

//config
import { PORT } from "../config/config.js";

//mid
import { apiErrorHandler } from "../mid/error.handler.js";

//DDBB
import { conectar } from "../dao/mongoose.js";

const app = express();

await conectar();

app.use(cors({ origin: "*" }));

app.use("/api", apiRouter);
app.use(apiErrorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
