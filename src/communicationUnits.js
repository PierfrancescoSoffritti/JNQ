const defaultPayload = { name: "defaultName", content: "" };

function Message( { recipient, payload = defaultPayload } ) {
    if(!recipient)
        console.error("This message has no recipient!");

    return { recipient, payload };
}

function Event( { payload = defaultPayload } ) {
    return new Message({ recipient: '*', payload });
}

module.exports.Message = Message;
module.exports.Event = Event;