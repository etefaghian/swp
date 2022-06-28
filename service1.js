import { aop, hookName, createHook, unAop } from "to-aop";
import { logger } from "./logger.js";

export class MMU {
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
  requestMemory(address) {
    //check address in correct range or not
    this.checkAddressInSuitableRange(address);
    this.checkInCorrectAddress(address);
    this.checkPermissions(address);

    //read data from memory
    const data = this.readDataFromMem(address);
    this.checkIsDataAvailable(data);
    this.checkCorruptedStoredData(data);
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

const hook = createHook(
  hookName.beforeMethod,
  "requestMemory",
  ({ target, object, property, context, args, payload, meta }) => {
    //call your own hook
    logger("ser1", property);
  }
);

const mmu = new MMU();
export const InstrumentedMMU = aop(mmu, hook); // bind hook to instance
