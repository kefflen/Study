

function Rect(a, b) {
    let _area
    return {
        a, b,
        get area() {
            if (!_area) {
                console.log("Processing")
                _area = a * b
            }
            return _area
        }
    }
}

class Rect2{
    constructor(a, b) {
        this.a = a
        this.b = b
    }
    get area() {
        console.log("Processing")
        let value = this.a * this.b
        Object.defineProperty(this, "area", {value, enumerable: true})
        return value
    }
}

r = new Rect2(20, 30)
console.log(r)
console.log(r.area)
console.log(r.area)
console.log(r.area)
console.log(r)

