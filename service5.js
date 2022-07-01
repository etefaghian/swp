import { logger } from "./logger.js";

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
      this.memory();
      this.writeBack();
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

  memory() {
    return "interaction with memory is completed";
  }
  writeBack() {
    return "all register is updated";
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
