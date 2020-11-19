
//let lista = [1,2,3,4,5,6,7,8]

Bisect = {
    bisect(item, iterable, begin=null, end=null) {
        if (!begin) begin = 0
        if (!end) end = iterable.length
        middlePoint = Number.parseInt((begin + end) / 2)
        middleValue = iterable[middlePoint]
        if (middlePoint <= begin) {
            if (middleValue < item) {
                return middlePoint + 1
            } else {
                return middlePoint
            }
        } else {
            if (item < middleValue) {
                return  this.bisect(item, iterable, begin, middlePoint)
            }
            else {
                return this.bisect(item, iterable, middlePoint, end)
            }
        }
    }
}


let lista = [1,1,2,2,3,3,6,6,6,7,9,9,0]
console.table(lista)
x = Bisect.bisect(3, lista)
console.log(x)