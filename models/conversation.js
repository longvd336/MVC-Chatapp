import { authedUser } from "./user.js";

const conversationList = [];
const currentConversation = "";
const listSubscriber =[];

db.collection("converations").onSnapshot(function (snapShot) {
    const conversations = snapShot.docChanges();
    for (let i = 0; i < conversations.length; i++) {
        const id = conversations[i].doc.id;
        const conversation = conversations[i].doc.data();
        const existedConversation = conversationList.find(function (item) {
        return item.id === id;
        }); 
        if (existedConversation === undefined) {
            conversation.id = id;
            conversationList.push(conversation);
            notifyConversation(conversation);
        }
    }
    });

function subscribe(screen){
    listSubscriber.push(screen);
}

function saveConversation(name) {
    db.collection("converations")
    .doc()
    .set({
        name: name,
        list_uid: [authedUser.id],
    })
    .then(function() {
        console.log("Conversation created");
    })
    .catch(function(error) {
        console.error("Fail  to create conversation ", error);
    });
};

function notifyConversation(converation){
    for( let i = 0; i< listSubscriber.length; i++){
        listSubscriber[i].onNotifyConversation(converation);
        //error
    }
};

export {subscribe, saveConversation};
