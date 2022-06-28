import { aop, hookName, createHook, unAop } from "to-aop";
import { logger } from "./logger.js";
import { throwError } from "./throwError.js";

import meld from "meld";

export class Service3 {
  constructor() {}

  run() {
    const runs = Array.from({ length: 1000 }, () => {
      const num = Math.floor(Math.random() * 50);
      return num > 43 ? "r" : num < 7 ? "e" : "n";
    });

    for (let index = 0; index < runs.length; index++) {
      const run = runs[index];
      this.handleRun(run);
    }
  }

  handleRun = (run) => {
    try {
      if (run === "e") {
        try {
          this.generateException();
        } catch {
          this.goToAbortMode();
        }
      }
      if (run === "r") {
        this.generateSuperviseModeInterrupt();
      }
    } catch (interrupt) {
      this.interruptHandler(interrupt.message);
    }
  };

  interruptHandler(type) {
    if (type === "SuperviseInterrupt") {
      this.goToSuperviseInterrupt();
    }
  }

  goToSuperviseInterrupt() {
    return "set register to enter to supervise mode and enter to supervise mode";
  }

  goToAbortMode() {
    this.generateSuperviseModeInterrupt("SuperviseInterrupt");
  }

  generateSuperviseModeInterrupt() {
    throwError("SuperviseInterrupt");
  }

  generateException() {
    throwError("generate an exception");
  }
}

const service3 = new Service3();

for (const item of Object.getOwnPropertyNames(Service3.prototype)) {
  if (item === "constructor") {
    continue;
  }
  meld.before(service3, item, (data) => {
    logger("service3", item);
  });
}
export const InstrumentedService3 = service3;
