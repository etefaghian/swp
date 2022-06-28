import { appendFileSync, writeFileSync } from "fs";

export const logger = (service, data) => appendFileSync(service, data + ",");
