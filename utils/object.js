export function isEmptyObject(obj){
    //return true if obj is empty
    return Object.entries(obj).length === 0 && obj.constructor === Object
}