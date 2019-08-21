import newChatController from "../../controllers/chatController.js";
import {subscribe} from "../../models/conversation.js";
import {currentConversation} from "../../models/message.js"
const list = `
    <div class="row p-3">
        <button class="btn btn-primary btn-block" data-toggle="modal" data-target="#modal_create_conversation">Add</button>
    </div>
    <div id = "js-listConversation">
    </div>
    
    <div id="modal_create_conversation" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Tao nhom chat</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form id="js-formCreateConversation">
                <h1>Add</h1>
                <div class="form-group">
                    <label for="name">Ten GR chat</label>
                    <input type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Nhap ten cuoc tro chuyen">
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Huy</button>
            <button id="js-btnCreateConversation" type="button" class="btn btn-primary">Tao nhom</button>
        </div>
        </div>
    </div>
    </div>
`
function onload(){
    subscribe(conversationList);
    const formCreateConversation = document.getElementById("js-formCreateConversation")
    const btnCreateConversation = document.getElementById("js-btnCreateConversation");
    btnCreateConversation.addEventListener("click",function() {
        const chatController = newChatController()
        chatController.createConversation(formCreateConversation.name.value);
        
    });
}
function onNotifyConversation(converation){
    const listConversation = document.getElementById("js-listConversation");
    const bgClass = converation.id === currentConversation ? "bg-secondary" : "";
    const newConversation = `
    <div class="d-flex ${bgClass}" id="${converation.id}">
        <div style ="width: 100px" class="pr-3">
            <img class="border border-primary rounded-circle w-100" src="https://previews.123rf.com/images/panyamail/panyamail1809/panyamail180900343/109879063-user-avatar-icon-sign-profile-symbol.jpg" alt="">
        </div>
        <div class="flex-grow-1">
            <h2>${converation.name}</h2>
        </div>
    </div>
    `
    listConversation.insertAdjacentHTML("beforeend",newConversation);   
    document.getElementById(converation.id).addEventListener('click', function(){
        const chatController = newChatController();
        if(currentConversation){
            document.getElementById(currentConversation).classList.remove("bg-secondary");
        }        
        this.classList.add("bg-secondary");
        chatController.changeConversation(converation.id);
        
    })
}

const conversationList = {
    content : list,
    onload: onload,
    onNotifyConversation: onNotifyConversation
}

export default conversationList;    