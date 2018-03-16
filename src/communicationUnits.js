const defaultMessage = { name: "defaultName", content: "" };

function Message( { recipient, message = defaultMessage } ) {
    if(!recipient)
        console.error("This message has no recipient!");

    return { recipient, message };
}

function Event( { message = defaultMessage } ) {
    return new Message({ recipient: '*', message });
}

module.exports.Message = Message;
module.exports.Event = Event;