
// Problema quando armazena  a variavel em uma variavel

let obj1 = {
    func1() {
        console.log("func1")
        console.log(this) //this == this
        let fn = this.func2 // Have to use bind method
        fn()
    },
    func2() {
        console.log("func2")
        console.log(this) // this == Global?
    }
}
let obj2 = {
    func1: () => {
        console.log("func1")
        console.log(this) //this == {} empty obj?
        let fn = this.func2 // Has no func2
        fn()
    },
    func2: () => {
        console.log("func2")
        console.log(this)
    }
}
let obj3 = {
    func1: function ()  {
        console.log("func1")
        console.log(this) //this == this
        let fn = this.func2 // Have to use bind method
        fn()
    },
    func2: function () {
        console.log("func2")
        console.log(this) // this == Global?
    }
}

let obj4 = { // Correct
    func1() {
        console.log("func1")
        console.log(this) //this == this
        let fn = this.func2.bind(this)
        fn()
    },
    func2() {
        console.log("func2")
        console.log(this) // this == this
    }
}

//obj1.func1()
//obj2.func1()
obj3.func1()
