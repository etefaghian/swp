import { logger } from "./logger.js";
import { readFileSync, writeFileSync } from "fs";

import meld from "meld";

export class Service5 {
  constructor() {}

  run() {
    const runs = Array.from({ length: 1000 }, () => {
      //for 32 bit
      const operation = generateString(32);

      return { operation };
    });

    for (let index = 0; index < runs.length; index++) {
      const run = runs[index];

      const operation = this.fetch(run);
      this.decode(operation);
      this.execute();
    }
  }

  fetch(run) {
    return run.operation;
  }

  decode(operation) {
    "instruction is decoded and needed register is read";
    return operation;
  }
  execute() {
    return "instruction is executed";
  }
}

const service5 = new Service5();

for (const item of Object.getOwnPropertyNames(Service5.prototype)) {
  if (item === "constructor") {
    continue;
  }
  meld.before(service5, item, (data) => {
    logger("service5", item);
  });
}
meld.after(service5, "decode", (operation) => {
  const opcode = operation.slice(0, 3);
  const type = opcode === "111" || opcode === "011" ? "invalid" : "valid";
  logger("service5", type);
});

export const InstrumentedService5 = service5;

const characters = "01";
function generateString(length) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export const service5Verifier = () => {
  const file = String(readFileSync("./output/" + "service5-convert" + ".txt"));

  const fileArray = file.split(",");

  for (let i = 0; i < fileArray.length; i++) {
    const element = fileArray[i];
    if (
      element === "t1" &&
      fileArray[i + 1] === "t2" &&
      (fileArray[i + 2] === "t2" || fileArray[i + 2] === "t4")
    ) {
      logger("service5-res", false);
    } else {
      logger("service5-res", true);
    }
  }
};
