/* tslint:disable:no-namespace */
enum UserActivityEvent {
    message_received = "message_received",
    bot_channel_join = "bot_channel_join",
    user_channel_join = "user_channel_join",
    bot_group_join = "bot_group_join",
    user_group_join = "user_group_join",
}

namespace UserActivityEvent {
    export function all(): UserActivityEvent[] {
        return [
            UserActivityEvent.message_received,
            UserActivityEvent.bot_channel_join,
            UserActivityEvent.user_channel_join,
            UserActivityEvent.bot_group_join,
            UserActivityEvent.user_group_join,
        ];
    }
}

enum MessageReceivedEvent {
    direct_mention = "direct_mention",
    direct_message = "direct_message",
    mention = "mention",
    ambient = "ambient",
}

namespace MessageReceivedEvent {
    export function all(): MessageReceivedEvent[] {
        return [
            MessageReceivedEvent.direct_mention,
            MessageReceivedEvent.direct_message,
            MessageReceivedEvent.mention,
            MessageReceivedEvent.ambient,
        ];
    }
}

enum WebsocketEvent {
    rtm_open = "rtm_open",
    rtm_close = "rtm_close",
    rtm_reconnect_failed = "rtm_reconnect_failed",
}

namespace WebsocketEvent {
    export function all(): WebsocketEvent[] {
        return [
            WebsocketEvent.rtm_open,
            WebsocketEvent.rtm_close,
            WebsocketEvent.rtm_reconnect_failed,
        ];
    }
}

type SlackEvent = UserActivityEvent | MessageReceivedEvent | WebsocketEvent;

export {
    UserActivityEvent,
    MessageReceivedEvent,
    WebsocketEvent,
    SlackEvent,
};
