function newValidator(){
    const validator = {};
    validator.isEmail = function(value, rule){
        if(Boolean (rule.value) == true){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(value).toLowerCase());
        }
        return true;
    };
    validator.notEmpty = function(value, rule){
        if(Boolean(rule.value)){           
            return String(value).length !== 0;
        }
        return true;
    };
    validator.minlength = function(value, rule){
        if(Boolean(rule.value)){           
            return String(value).length >= rule.value;
        }
        return true;
    };
    validator.validate = function(object, rules){
        const keys = Object.keys(rules);
        const errors = [];
        for (const key of keys){
            const value = object[key]
            for(const rule of rules[key]){
                const ruleName = rule.rule;
                const isPassed = validator[ruleName](value,rule);
                if(isPassed === false){
                    errors.push(new Error(key + " violate "+ ruleName));                    
                }               
            }
        }
        return errors;
    };
    return validator;  
}
export default newValidator;