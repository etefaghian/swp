import { InstrumentedMMU, MMU } from "./service1.js";
import { InstrumentedService3 } from "./service3.js";
import { InstrumentedService4 } from "./service4.js";

InstrumentedMMU.requestMemory(23);
InstrumentedService3.run();
InstrumentedService4.run();
