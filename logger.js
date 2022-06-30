import { readdir, unlink, appendFileSync, readdirSync } from "fs";
import { join } from "path";

const files = readdirSync("./output");

for (const file of files) {
  unlink(join("./output", file), (err) => {
    if (err) throw err;
  });
}

export const logger = (service, data) =>
  appendFileSync("./output/" + service + ".txt", data + ",");
