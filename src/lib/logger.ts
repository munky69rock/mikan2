import { join } from "path";
import * as winston from "winston";

const transports = [
    new winston.transports.Console(),
];

const logger = new winston.Logger({ transports });

export {
    logger,
};
