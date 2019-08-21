import newValidator from "../utils/validator.js";
import {isEmptyObject} from "../utils/object.js";
import {authedUser} from "../models/user.js";
import {newSuccessResponse,newFailureResponse,responseCode} from "../controllers/response.js";
function newAuthController(){
    const controller = {}
        controller.register = async function(registerPayload){
            const rules = {
                email : [
                    {
                        rule : "isEmail",
                        value: true
                    }               
                ],
                firstName:[
                    {
                        rule: "notEmpty",
                        value: true
                    }
                ],
                lastName:[
                    {rule: "notEmpty",
                    value: true}
                ],
                password:[
                    {
                    rule:"minlength",
                    value: 8
                }
                ],
                retypedpassword:[{
                    rule:"notEmpty",
                    value:true
                },{
                    rule:"isMatching",
                    value:registerPayload.password
                }]
            };
            const validator = newValidator();
            const errors = validator.validate(registerPayload, rules);
            if( !isEmptyObject(errors)){
                //smt went wrong
                return newFailureResponse(responseCode.auth.register.ivalid_input,errors);
            }   
            //register with firebase
            await firebase.auth().createUserWithEmailAndPassword(registerPayload.email, registerPayload.password)
            firebase.auth().currentUser.updateProfile({
                displayName:`${registerPayload.firstName} ${registerPayload.lastName}`
            })
            firebase.auth().currentUser.sendEmailVerification();
            return newSuccessResponse(responseCode.auth.register.success,firebase.auth().currentUser)

        };
    controller.login = async function(loginPayload){
        const loginResult  = await firebase
        .auth()
        .signInWithEmailAndPassword(loginPayload.email, loginPayload.password)
        authedUser.id = loginResult.user.email;
        authedUser.name  = loginResult.user.displayName;
        return newSuccessResponse(responseCode.auth.login.success, authedUser)
    };
    return controller;
};

export default newAuthController;