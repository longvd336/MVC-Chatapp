import { authedUser } from "./user.js";

let messageList = [];
let currentConversation = "";
const listSubscriber =[];

function subscribe(screen){
    listSubscriber.push(screen);
}

function changeConversation(converationId){
    currentConversation = converationId;
    fetchMessage(converationId)
}

function fetchMessage(converationId){
    messageList = [];
    let messageRef = db.collection("messages");
    let query = messageRef.where("converationId", "==", converationId);
    query.get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            messageList.push(doc.data());
        });
    });
    notifyMessages(messageList);
}
function notifyMessages(messages){
    for( let i = 0; i< listSubscriber.length; i++){
        listSubscriber[i].onNotifyMessages(messages);
    }
}

function notifyMessage(message){
    for( let i = 0; i< listSubscriber.length; i++){
        listSubscriber[i].onNotifyMessage(message);
        //error
    }
};

function saveMessage(content) {
    db.collection("messages")
    .doc()
    .set({
        converationId : currentConversation,
        userId : authedUser.id,
        content: content
    })
    .then(function() {
        console.log("message sended");
    })
    .catch(function(error) {
        console.error("Failed  to send message ", error);
    });
};



export {saveMessage, subscribe, currentConversation, changeConversation};
