if (!process.env.SLACK_API_TOKEN) {
    console.log(`Error: SLACK_API_TOKEN not specified. ${process.env.SLACK_API_TOKEN}`);
    process.exit(1);
}

import { slackbot } from 'botkit';

const controller = slackbot({});
const bot = controller.spawn({
    token: process.env.SLACK_API_TOKEN
}).startRTM();

enum UserActivityEvent {
    message_received = "message_received",
    bot_channel_join = "bot_channel_join",
    user_channel_join = "user_channel_join",
    bot_group_join = "bot_group_join",
    user_group_join = "user_group_join",
}

enum MessageReceivedEvent {
    direct_mention = "direct_mention",
    direct_message = "direct_message",
    mention = "mention",
    ambient = "ambient",
}

enum WebsocketEvent {
    rtm_open = "rtm_open",
    rtm_close = "rtm_close",
    rtm_reconnect_failed = "rtm_reconnect_failed",
}

type SlackEvent = UserActivityEvent | MessageReceivedEvent | WebsocketEvent;

controller.hears(/hello/, [MessageReceivedEvent.direct_mention, MessageReceivedEvent.direct_message, MessageReceivedEvent.mention, MessageReceivedEvent.ambient], (bot, message) => {
    bot.reply(message, "hello");
});

// FIXME: wrong type definition in Botkit.d.ts
(<any>controller).setupWebserver(process.env.VCAP_APP_PORT || 8080, (err, webserver) => {
    webserver.get('/', (req, res) => res.send('mikan, so delicious'));
});