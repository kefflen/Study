

class Deque {
    constructor(iterable=null, ValidationFn=null, priorityFn=null) {
        this.data = (iterable)? Array(...iterable) : []
        this.validation = ValidationFn
        this.priorityAtt = priorityFn
    }

    extend(iterable) {
        if (!Array.isArray(iterable)) iterable = [iterable]

        for (let value of iterable) {
            if (!this.validation || this.validation(value) == true) {
                if (!this.priorityAtt || !this.priorityAtt(value)) {
                    this.data.push(value)
                } else {
                    this.data.unshift(value)
                }
                return 1
            } else return 0
        }
    }
    get() {
        return this.data.unshift()
    }
    peek() {
        return this.data[0]
    }
    extendLeft(value) {
        this.data.unshift(value)
    }
    [Symbol.iterator] = function*() {
        let len = this.data.length
        for (let i=0; i < len; i++) {
            yield this.data.shift()
        }
    }
    pass(qtd) {
        return this.data.splice(0, qtd)
    }
}

function isElse(value) {
    return value%2 == 0
}
function multFour(value) {
    return value%4 == 0
}
d = new Deque(null, isElse, multFour)
d.extend(1)
d.extend(2)
d.extend(6)
d.extend(8)
d.extend(4)
d.extend([12, 13, 14, 15, 16, 17, 18])
for (item of d.pass(2)) {
    console.log(item)
}
console.log(d)
