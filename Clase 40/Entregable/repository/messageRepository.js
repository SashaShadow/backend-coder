import MessageDTO from "../dtos/messageDTO.js";
import DAOFactory from "../factory/DAOfactory.js";

const myDAO = new DAOFactory();

class MessageRepository {
    constructor() {
        this.dao = myDAO.getMsgDAO();
    }

    async getMessages() {
        const messages = await this.dao.getElems();
        // console.log(messages.map(msg => new MessageDTO(msg)));
        return messages.map(msg => new MessageDTO(msg));
    }

    async createMessage(msg) {
        return await this.dao.postElem(msg);
    }
}

export default MessageRepository;