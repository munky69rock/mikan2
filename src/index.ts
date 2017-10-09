import { logger } from "./lib/logger";

if (!process.env.SLACK_API_TOKEN) {
    logger.error("Error: SLACK_API_TOKEN not specified.");
    process.exit(1);
}

import { slackbot, SlackController } from "botkit";
import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

import { MessageReceivedEvent } from "./lib/slack/event";
import { loadScripts } from "./lib/util";

const controller = slackbot({});
const bot = controller.spawn({
    token: process.env.SLACK_API_TOKEN,
}).startRTM();

loadScripts(path.join(__dirname, "scripts"), controller);

// FIXME: wrong type definition in Botkit.d.ts
(controller as any).setupWebserver(process.env.VCAP_APP_PORT || 8080, (err, webserver) => {
    loadScripts(path.join(__dirname, "servers"), webserver);
});
