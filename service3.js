import { logger } from "./logger.js";
import { throwError } from "./throwError.js";
import { readFileSync, writeFileSync } from "fs";

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

  handleRun(run) {
    try {
      if (run === "e") {
        try {
          this.generateException();
        } catch {
          this.goToAbortMode();
        }
      }
      if (run === "r") {
        this.restart();
      }
    } catch (interrupt) {
      this.interruptHandler(interrupt.message);
    }
  }

  restart() {
    this.generateSuperviseModeInterrupt();
  }

  normalRun() {}

  interruptHandler(type) {
    if (type === "SuperviseInterrupt") {
      Math.random() < 0.8 && this.goToSuperviseMode();
    }
  }

  goToSuperviseMode() {
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

export const service3Verifier = () => {
  const file = String(readFileSync("./output/" + "service3-convert" + ".txt"));

  const fileArray = file.split(",");

  for (let i = 0; i < fileArray.length; i++) {
    const element = fileArray[i];
    if (
      ((element === "q1" && fileArray[i + 1] === "q3") || element === "q2") &&
      fileArray[i + 1] === "q4" &&
      fileArray[i + 2] !== "q5"
    ) {
      logger("service3-res", false);
    } else {
      logger("service3-res", true);
    }
  }
};
