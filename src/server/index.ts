import express from "express";
import path from "path";
import * as url from "url";

import { generateAreaResponse } from "./api.js";
import { getStatus } from "./status.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const app = express();
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server starts at http://localhost:${PORT}`);
});

app.use("/assets", express.static(path.join(__dirname, "./dist/assets")));

app.use("/api/area", (_1, res) => {
  const status = getStatus();
  const { statusCode, area } = generateAreaResponse(status);

  if (status === "IN_PROGRESS") {
    setTimeout(() => res.status(statusCode).send({ data: area }), 3000);
  } else {
    res.status(statusCode).send({ data: area });
  }
});

app.use("/", (_1, res) => {
  const resourcePath = path.join(__dirname, "./dist/index.html");
  res.status(200).sendFile(resourcePath);
});
