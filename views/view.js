const view = {}
//function hieu ung , chuyen canh
view.setScreen = function(view){
    document.getElementById("app").innerHTML = view.content; 
    view.onload();
}

export default view;