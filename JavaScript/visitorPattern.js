//Ref Python Cookbook - pag 344
const { Cell } = require("./lib/Tree")

class NodeVisitor {
    visit(node) {
        let clsFn = "visit_" + node.constructor.name
        let fn = (this[clsFn])? this[clsFn].bind(this) : null
        if (!fn) fn = this.genericVisitor.bind(this)
        return fn(node)
    }
}

class Evaluate extends NodeVisitor {
    visit_Add(node) {
        return this.visit(node.left) + this.visit(node.right)
    }
    visit_Sub(node) {
        return this.visit(node.left) - this.visit(node.right)
    }
    visit_Number(node) {
        return node.value
    }
}

class Number {
    constructor(value) {
        this.value = value
    }
}
class BinaryOperator{
    constructor(left, rigth) {
        this.left = left
        this.right = rigth
    }
}
class Sub extends BinaryOperator {

}
class Add extends BinaryOperator {

}

let x = Cell.treeFrom([6,2,4,3,7,9,5])

class Visitor {
    visit(node, ...args) {
        let clsFn = "visit_" + node.constructor.name
        let fn = (this[clsFn])? this[clsFn].bind(this) : null
        if (!fn) {
            fn = this.genericVisitor.bind(this)
        }
        return fn(node, ...args)
    }
    genericVisitor (node) {
        throw TypeError(`Invalid node: ${node.name}`)
    }
    visit_Cell(node, value=0) {
        let total = value
        if (node.left) {
            total = this.visit(node.left, total)
        }
        if (node.right) {
            total = this.visit(node.right, total)
        }
        return total += node.value
    }
}



let v = new Visitor()
let value = v.visit(x)
console.log(value) // output: 36
let res = new Add(new Number(40), new Number(20)) // 40 + 20 =  60
res = new Sub(new Number(10), res) // 10 - 60 = -50
calculator = new Evaluate()
result = calculator.visit(res)
console.log({result}) // output: { result: -50 }