import { readFileSync, writeFileSync } from "fs";
import { logger } from "./logger.js";
import meld from "meld";

export class Service1 {
  memory = [];
  constructor() {
    this.memory = Array(100).fill("empty");

    for (let index = 20; index < this.memory.length; index++) {
      this.memory[index] = "data";
    }

    for (let i = 20; i < this.memory.length; i = i + 5) {
      this.memory[i] = "corrupt";
    }
  }

  run() {
    const runs = Array.from({ length: 1000 }, () => {
      const num = Math.floor(Math.random() * 200);
      return num;
    });

    for (let index = 0; index < runs.length; index++) {
      const run = runs[index];
      this.requestMemory(run);
    }
  }

  requestMemory(address) {
    try {
      //check address in correct range or not
      this.checkAddressInSuitableRange(address);
      this.checkInCorrectAddress(address);
      this.checkPermissions(address);

      //read data from memory
      const data = this.readDataFromMem(address);
      this.checkIsDataAvailable(data);
      this.checkCorruptedStoredData(data);
    } catch (error) {
      Math.random() < 0.8 && this.generatePageFault();
    }
  }

  checkAddressInSuitableRange(address) {
    return (
      (address > 0 && address < this.memory.length) || this.throwError("range")
    );
  }

  checkPermissions(address) {
    return address >= 5 || this.throwError("per");
  }

  checkInCorrectAddress(address) {
    return typeof address === "number" || this.throwError("type");
  }

  checkCorruptedStoredData(data) {
    return data !== "corrupt" || this.throwError("cor");
  }

  checkIsDataAvailable(data) {
    return data !== "empty" || this.throwError("emp");
  }

  readDataFromMem(address) {
    return this.memory[address];
  }

  generatePageFault(address) {
    return "page-fault";
  }

  throwError(message) {
    throw new Error(message);
  }
}

const service1 = new Service1();

for (const item of Object.getOwnPropertyNames(Service1.prototype)) {
  if (item === "constructor") {
    continue;
  }
  meld.before(service1, item, (data) => {
    logger("service1", item);
  });
}

export const InstrumentedService1 = service1;

export const service1Verifier = () => {
  const file = String(readFileSync("./output/" + "service1-convert" + ".txt"));

  const fileArray = file.split(",");

  for (let i = 0; i < fileArray.length; i++) {
    const element = fileArray[i];
    if (element === "p3" && fileArray[i + 1] !== "p4") {
      logger("service1-res", false);
    } else {
      logger("service1-res", true);
    }
  }
};
