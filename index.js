import { convertor } from "./convertor.js";
import { InstrumentedService1 } from "./service1.js";
import { InstrumentedService3 } from "./service3.js";
import { InstrumentedService4 } from "./service4.js";

InstrumentedService1.requestMemory(23);
InstrumentedService3.run();
InstrumentedService4.run();
