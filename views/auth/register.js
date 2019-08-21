// register page
import view from "../view.js";
import login from "./login.js";
import newAuthController from "../../controllers/authController.js";
import {responseCode} from "../../controllers/response.js";
import messages from "../messages.js";
const registerScreen = `
    <div class="container">
        <div class="row">      
            <div class="col-sm">
                <form id = "js-formregister">
                <h1>Register</h1>
                <div id="js-alertSuccess"></div>
                <div class="form-group">
                    <label for="firstname">firstname</label>
                    <input type="text" class="form-control" id="firstName" placeholder="Enter your 1st name">
                   
                </div>
                <div class="form-group">
                    <label for="lastname">lastname</label>
                    <input type="text" class="form-control" id="lastName" placeholder="Enter your last name">
                   
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter your email">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Enter your Password">
                </div>
                <div class="form-group">
                    <label for="retypepassword">Retyped Password</label>
                    <input type="password" class="form-control" id="retypedpassword" placeholder="Retyped your Password">
                </div>
                    <button type="submit" id ="js-btnRegister"class="btn btn-primary">Submit</button>
                    <button id = "js-btnMoveToLoginPage" type="button" class="btn btn-primary">ReturnLoginPage</button>    
                </form>
            </div>
        </div>
    </div>
`
function onload(){
    const btnMoveToLoginPage = document.getElementById('js-btnMoveToLoginPage')
    const btnRegister = document.getElementById('js-btnRegister')
    const formRegister = document.getElementById('js-formregister')
    btnMoveToLoginPage.addEventListener('click', function(){
        view.setScreen(login);
    })
    btnRegister.addEventListener('click', async function(event){
        event.preventDefault();
        const registerPayload={
            firstName : formRegister.firstName.value,
            lastName :formRegister.lastName.value,
            email : formRegister.email.value,
            password : formRegister.password.value,
            retypedpassword : formRegister.retypedpassword.value,
        }
        clearErrors();
        const authController = newAuthController();
        const response = await authController.register(registerPayload);
        if(response.type == "failure"){
            switch(response.code){
                case responseCode.auth.register.ivalid_input:
                    showErrors(response.data);
                    break; 
                }
        }
        else{
            switch(response.code){
                case responseCode.auth.register.success:
                    showSuccessMessage();
            }
        }
    })
}
function showSuccessMessage(){
    const alertContent = `<div class="alert alert-success" role="alert">
        Ok!!!
        </div>`;
    document.getElementById("js-alertSuccess").innerHTML= alertContent;
    
}
function showErrors(errors){
    const fields = Object.keys(errors);
    for( let i = 0; i< fields.length; i++ ){
        const field = fields[i];
        const input = document.getElementById(field);
        input.classList.add('is-invalid');
        const inputParent = input.parentElement;
        for(let j=0; j< errors[field].length;j++ ){
            const error = errors[field][j]
            const errorFeedback = document.createElement("div");
            errorFeedback.setAttribute("class","invalid-feedback");
            errorFeedback.innerHTML = messages.error[field][error.message];
            inputParent.insertBefore(errorFeedback,input.nextSibling);
        }     
    } 
}
function clearErrors(){
    const errorFeedbacks = document.getElementsByClassName("invalid-feedback");
    while (errorFeedbacks.length >0){
        errorFeedbacks[0].remove();
    }
    const input = document.getElementsByClassName("is-invalid");
    while (input.length >0 ){
        input[0].classList.remove("is-invalid");
    }
}
const register = {
    content: registerScreen,
    onload: onload
}
export default register;