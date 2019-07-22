// register page
import view from "../view.js";
import login from "./login.js";
import newAuthController from "../../controllers/authController.js"
const registerScreen = `
    <div class="container">
        <div class="row">
        
            <div class="col-sm">
                <form id = "js-formregister">
                <h1>Register</h1>
                <div class="form-group">
                    <label for="firstname">firstname</label>
                    <input type="text" class="form-control" id="firstname" placeholder="Enter 1st name">
                   
                </div>
                <div class="form-group">
                    <label for="lastname">lastname</label>
                    <input type="text" class="form-control" id="lastname" placeholder="Enter last name">
                   
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="enter your Password">
                </div>
                <div class="form-group">
                    <label for="retypepassword">Retyped Password</label>
                    <input type="password" class="form-control" id="retypedpassword" placeholder="enter your Password">
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
    btnRegister.addEventListener('click', function(event){
        event.preventDefault();
        const registerPayload={
            firstName : formRegister.firstname.value,
            lastName :formRegister.lastname.value,
            email : formRegister.email.value,
            password : formRegister.password.value,
            retypedpassword : formRegister.retypedpassword.value,
        }
        const authController = newAuthController();
        authController.register(registerPayload);
    })
}
const register = {
    content: registerScreen,
    onload: onload
}
export default register;