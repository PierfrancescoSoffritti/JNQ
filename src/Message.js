function Message({ recipient = '*', message = { } }) {

    return { recipient, message };
}

module.exports = Message;