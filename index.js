import { convertor } from "./convertor.js";
import { InstrumentedService1, service1Verifier } from "./service1.js";
import { InstrumentedService3, service3Verifier } from "./service3.js";
import { InstrumentedService4, service4Verifier } from "./service4.js";
import { InstrumentedService5, service5Verifier } from "./service5.js";

InstrumentedService3.run();
InstrumentedService4.run();
InstrumentedService5.run();
InstrumentedService1.run();

convertor("service1", {
  requestMemory: "p1",
  readDataFromMem: "p2",
  ",checkAddressInSuitableRange": "",
  ",checkInCorrectAddress": "",
  ",checkPermissions": "",
  ",checkIsDataAvailable": "",
  ".checkCorruptedStoredData": "",
  throwError: "p3",
  generatePageFault: "p4",
});
service1Verifier();

convertor("service3", {
  handleRun: "q1",
  generateException: "q3",
  ",goToAbortMode": "",
  generateSuperviseModeInterrupt: "q4",
  ",interruptHandler": "",
  goToSuperviseMode: "q5",
  restart: "q2",
});

convertor("service4", {
  "STR,readMar,readMdr,transformDataFromRegisterToMemory": "r1",
  true: "r2",
  "false,": "",
});
convertor("service5", {
  fetch: "t1",
  decode: "t2",
  ",invalid": "",
  valid: "t4",
  execute: "t3",
});
service1Verifier();
service3Verifier();
service4Verifier();
service5Verifier();
