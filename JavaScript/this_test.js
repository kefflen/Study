



let obj1 = {
    func1() {
        console.log("func1")
        console.log(this)
        this.func2()
    },
    func2() {
        console.log("func2")
        console.log(this)
    }
}
obj1.func1()