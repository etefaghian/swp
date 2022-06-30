import { readFileSync, writeFileSync } from "fs";

export const convertor = (service, mapping) => {
  const file = String(readFileSync("./output/" + service + ".txt"));
  let modifiedFile;

  for (const key in mapping) {
    if (Object.hasOwnProperty.call(mapping, key)) {
      const element = mapping[key];
      modifiedFile = file.replaceAll(new RegExp(key, "g"), element);
    }
  }

  writeFileSync("./output/" + service + ".txt", modifiedFile);
};
