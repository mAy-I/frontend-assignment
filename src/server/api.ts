import url from "url";
import { readFileSync } from "fs";
import { AreaResponseBody, Status } from "./types.d";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const dataset = JSON.parse(readFileSync(`${__dirname}/dataset.json`).toString());

export const generateAreaResponse = (status: Status): AreaResponseBody => {
  if (status === "ERROR") return { statusCode: 500 };
  return {
    statusCode: 200,
    area: dataset[Math.round(Math.random() * dataset.length)],
  };
};
