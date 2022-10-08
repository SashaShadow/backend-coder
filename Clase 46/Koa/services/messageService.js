
class MessageService {
    constructor(repository) {
        this.repository = repository;
    }

    async getMsgs() {
        return this.repository.getMessages();
    }

    async createMsgs(msg) {
        return this.repository.createMessage(msg)
    }
}

export default MessageService;