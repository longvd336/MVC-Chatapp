// login page
import register from "./register.js";
import view from "../view.js";
const loginScreen = `
    <div class="container">
        <div class="row">
            <div class="col-sm">
                
            </div>
            <div class="col-sm">
                <form>
                <h1>Login</h1>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <button type="button" id="js-btnMoveToRegisterPage" class="btn btn-secondary">Register</button>
                    
                </form>

            </div>
            <div class="col-sm">
                
        </div>
        </div>
    </div>

`
function onload(){
    const btnMoveToRegisterPage = document.getElementById('js-btnMoveToRegisterPage')
    btnMoveToRegisterPage.addEventListener('click', function(){
        view.setScreen(register);
    })
}
const login = {
    content : loginScreen,
    onload: onload
}
export default login;