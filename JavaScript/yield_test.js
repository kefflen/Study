

function* average() {
    let values = [], value
    console.log("On average")
    while (value === undefined || !isNaN(value)) {   
        console.log("On while with value = ", {value, values})
        value = yield
        if (Number.isFinite(value)) values.push(value)
    }
    console.log("Out while with value = ", {value, values})
    yield values.reduce((n, m) => n+m)/values.length

}
a = average()
a.next()
a.next(20)
a.next(20)
a.next(30)
a.next(35)
a.next(10)
let b = a.next("End")
console.log(b)

function* yieldFrom_like() {
    yield* [1, 2, 3, 4]
    yield* ["a", "b", "c"]
    yield "End"
}
console.log(Array.from(yieldFrom_like()))
for (i of yieldFrom_like()) {
    console.log(i)
}