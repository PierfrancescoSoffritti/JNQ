function Message({ recipient = '*', message = { type: "default", content: "" } }) {

    return { recipient, message };
}

module.exports = Message;