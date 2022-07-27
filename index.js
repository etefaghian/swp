import { convertor } from "./convertor.js";
import { InstrumentedService1, service1Verifier } from "./service1.js";
import { InstrumentedService3, service3Verifier } from "./service3.js";
import { InstrumentedService4 } from "./service4.js";
import { InstrumentedService5 } from "./service5.js";

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
service1Verifier();
service3Verifier();
