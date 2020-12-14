
//Function alike heapq.merge() of Python
//Iterable should be ordened
function* heapqMerge(...its) {
    let len = 0
    for (it of its) {
        len += it.length
    }
    let iterables = its.map(it => Array.from(it))
    for (let i=0; i<len; i++) {
        let prox
        for (let it of iterables) {
            if ((it.length > 0) && (!prox || it[0] < prox[0])) {
                prox = it
            }
        }
        yield prox.shift()
    }
}

let list1 = [1, 4, 7, 10]
let list2 = [2, 5, 6, 11]

//console.log(Array.from(heapqMerge(list1, list2)))
gen = heapqMerge(list1, list2)
gen.next()

list2.push(100)
gen.next()