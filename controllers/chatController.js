import {saveMessage} from "../models/message.js";
import {changeConversation} from "../models/message.js"
import {authedUser} from "../models/user.js";
import {saveConversation} from "../models/conversation.js";
function newChatController(){
    const chatController = {};
    chatController.sendMessage = function(message){
        saveMessage({uid :authedUser.id, 
                    content:message});
    };
    chatController.createConversation= function(name){
        saveConversation(name,authedUser.id);
    };
    chatController.changeConversation = function(conversation){
        changeConversation(conversation);
    }
    return chatController;
}
export default newChatController;