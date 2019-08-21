import { authedUser } from "../../models/user.js";
import newChatController from "../../controllers/chatController.js";
import {subscribe} from "../../models/message.js";
let lastMessage;

const chatScreen = `
<div class="h-100 w-100">
    <div class="h-100 d-flex flex-column"> 
        <div class="p-3 bg-primary text-light" class="header"><h1>CHATAPP</h1></div>

        <div class="flex-grow-1 bd-highlight" id="js-chatArea" ></div>
    
        </div>
        <div class="p-3 bg-primary ">
            <form class="form-inline" id="js-formChat">
                <div class="w-100 d-flex flex-row">
                    <div class=flex-grow-1>
                        <input id="chatMsg" type="text" class="form-control w-100 " id="exampleInputEmail1" >
                    </div>
                    <div>
                        <button type="submit" class="btn btn-light ml-2">send</button>
                    </div>
                </div>
          </form>
        </div>      
    </div>
</div>
    `;
function addMessage(message){
    const msgDiv = document.createElement("div");
    const msgSpan = document.createElement("span");
    msgSpan.innerHTML = message.content;
    if(lastMessage && lastMessage.uid !== message.uid){

        msgDiv.setAttribute("class", "mt-2 ");
    }else{
        msgDiv.setAttribute("class", "mt-1 ");
    }  
    if(message.uid === authedUser.id){
        msgDiv.classList.add("text-right");
        msgSpan.setAttribute("class", "badge badge-primary")
    }
    else{
        msgSpan.setAttribute("class", "badge badge-secondary")
    }
    msgDiv.appendChild(msgSpan)
    document.getElementById("js-chatArea").appendChild(msgDiv);
    lastMessage = message;
}

function onload(){
    subscribe(chat);
    const formChat = document.getElementById("js-formChat")
    formChat.addEventListener("submit",function(event){
        event.preventDefault();
        const message = formChat.chatMsg.value
        const controller = newChatController();
        controller.sendMessage(message);
        formChat.chatMsg.value = "";
    })
}
function onNotifyMessages(messages){
    document.getElementById("js-chatArea").innerHTML ="";
    for(let i=0; i<messages.length; i++){
        addMessage(messages[i]);
    }
}

const chat = {
    content : chatScreen,
    onload : onload,
    onNotifyMessages : onNotifyMessages,
};
export default chat;