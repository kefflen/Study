

function singleDispatch(func) {
    let defl = func
    let protocol = {}
    let when = function(arg) {
        if (protocol[typeof arg]) protocol[typeof arg](arg)
        else defl(arg)
    }
    when.register = function(type, func) {
        protocol[typeof type()] = func
    }
    return when
}

let num = singleDispatch(function(arg) {
    console.log("Defalt: ", arg)
})
num.register(Number, function(arg) {
    console.log("Number: ", arg)
})



let palavra = singleDispatch(function(arg) {
    console.log("Defalt: ", arg)
})
palavra.register(String, function(arg) {
    console.log("String: ", arg)
})

num("a")
num(1)
palavra("a")
palavra(1)
