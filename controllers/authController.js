import newValidator from "../utils/validator.js"
function newAuthController(){
    const controller = {}
        controller.register = function(registerPayload){
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
                ]
            };
            const validator = newValidator();
            const errors = validator.validate(registerPayload, rules);
            if (errors.length != 0){
                console.log(errors);
            }
        }
    return controller;
}

export default newAuthController;