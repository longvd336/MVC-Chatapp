import conversationList from "./conversation-list.js";
import chatBox from "./chat.js";
import view from "../view.js";
const screen =`
<div class = "row h-100">
    <div class="col-2 col-md-3"   id="js-conversationList">
    
    </div>
    <div class="col-10 col-md-9" id="js-chatBox">
    
    </div>
</div>
`;
function onload(){
    view.setScreen(conversationList, "js-conversationList");
    view.setScreen(chatBox, "js-chatBox");
}

export default {
    content: screen,
    onload: onload
};