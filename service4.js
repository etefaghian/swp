import { logger } from "./logger.js";
import { readFileSync, writeFileSync } from "fs";

import meld from "meld";
const memory = Array(1000).fill("empty");
export class Service4 {
  constructor() {}

  run() {
    const runs = Array.from({ length: 1000 }, () => {
      const mdr = Math.floor(Math.random() * 200);
      const mar = Math.floor(Math.random() * 100);
      return { mar, mdr };
    });

    for (let index = 0; index < runs.length; index++) {
      const run = runs[index];
      this.STR(run);
    }
  }

  STR(run) {
    const mar = this.readMar(run);
    const mdr = this.readMdr(run);
    this.transformDataFromRegisterToMemory(mar, mdr);
  }

  transformDataFromRegisterToMemory(mar, mdr) {
    //incorrect data with probability 0.2
    memory[mar] = Math.random() < 0.8 ? mdr : 10;
    return { mar, mdr };
  }

  readMar(run) {
    return run.mar;
  }

  readMdr(run) {
    return run.mdr;
  }
}

const service4 = new Service4();

for (const item of Object.getOwnPropertyNames(Service4.prototype)) {
  if (item === "constructor") {
    continue;
  }
  meld.before(service4, item, (data) => {
    logger("service4", item);
  });
}

meld.after(service4, "transformDataFromRegisterToMemory", (data) => {
  logger("service4", memory[data.mar] === data.mdr);
});
export const InstrumentedService4 = service4;

export const service4Verifier = () => {
  const file = String(readFileSync("./output/" + "service4-convert" + ".txt"));

  const fileArray = file.split(",");

  for (let i = 0; i < fileArray.length; i++) {
    const element = fileArray[i];
    if (element === "r1" && fileArray[i + 1] !== "r2") {
      logger("service4-res", false);
    } else {
      logger("service4-res", true);
    }
  }
};
