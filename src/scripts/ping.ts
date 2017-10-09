import { logger } from "./../lib/logger";
import { MessageReceivedEvent } from "./../lib/slack/event";
import { SlackControllerScript } from "./../lib/util";

const script: SlackControllerScript = (controller) => {
    controller.hears(/ping/i, MessageReceivedEvent.all(), (bot, message) => {
        bot.reply(message, "pong");
    });
};

export default script;
