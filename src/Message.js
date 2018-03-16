function Message({ recipient = '*', message = { name: "defaultName", content: "" } }) {

    return { recipient, message };
}

module.exports = Message;