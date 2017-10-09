import { SlackController } from "botkit";
import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";
import { logger } from "../lib/logger";

type SlackControllerScript = (controller: SlackController) => void;

async function loadScripts(basedir, ...args) {
    try {
        await promisify(fs.access)(basedir, fs.constants.R_OK);
        const dirs = await promisify(fs.readdir)(basedir);
        dirs.forEach(async (file) => {
            try {
                const scriptPath = `${basedir}/${file}`;
                if (!/\.js$/.test(scriptPath)) {
                    logger.warn(`not js file: ${scriptPath}`);
                    return;
                }
                const stats = await promisify(fs.stat)(scriptPath);
                if (stats.isDirectory()) {
                    return;
                }
                require(scriptPath).default(...args);
                logger.info(`load ${scriptPath}`);
            } catch (e) {
                logger.warn(e);
            }
        });
    } catch (e) {
        logger.warn(e);
    }
}

export {
    SlackControllerScript,
    loadScripts,
};
