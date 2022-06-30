import { aop, hookName, createHook, unAop } from "to-aop";
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
      this.generatePageFault();
    }
  }

  checkAddressInSuitableRange(address) {
    return (address > 0 && address < this.memory.length) || throwError("range");
  }

  checkPermissions(address) {
    return address >= 5 || throwError("per");
  }

  checkInCorrectAddress(address) {
    return typeof address === "number" || throwError("type");
  }

  checkCorruptedStoredData(data) {
    return data !== "corrupt" || throwError("cor");
  }

  checkIsDataAvailable(data) {
    return data !== "empty" || throwError("emp");
  }

  readDataFromMem(address) {
    return this.memory[address];
  }

  generatePageFault(address) {
    return "page-fault";
  }
}

const throwError = (message) => {
  throw new Error(message);
};

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
