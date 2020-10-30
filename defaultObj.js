function* zip(...iterables) {
    let repeat = iterables.reduce((r, it) => {
        if (r == -1 || r > it.length) {
            return it.length
        } else return r
    }, -1)
    for (let i=0; i < repeat; i++) {
        let arr = []
        for (let it of iterables) {
            arr.push(it[i])
        }
        yield arr
    }
}
function DefaultObj(initializer) {
    //Initializer need to be a 'Contructor function', like Array or Object
    return new Proxy({
        update(prop, obj) {
            Object.assign(this[prop], obj)
        }
    }, {
        get(that, prop) {
            if (!(prop in that)) that[prop] = initializer()
            return that[prop]
        }
    })
}

function DefaultObjWithIterator(initializer) {
    //Initializer need to be a 'Contructor function', like Array or Object
    return new Proxy({
        update(prop, obj) {
            Object.assign(this[prop], obj)
        },
        [Symbol.iterator]: function* () {
            for (let prop in this) {
                if (typeof initializer() === typeof this.prop && typeof this.prop === "object") {
                    yield* zip(Object.keys(this[prop]), Object.values(this[prop]))
                } else if (typeof initializer() === typeof this.prop && typeof this.prop === "array") {
                    yield* this[prop]
                }
            }
        },
    }, {
        get(that, prop) {
            if (!(prop in that)) that[prop] = initializer()
            return that[prop]
        }
    })
}

products = new DefaultObjWithIterator(Object)
Object.assign(products.massa, {"macarrao": 4, "lazanha": 10, "ravioli": 12})
Object.assign(products.salgados, {"pastel": 6, "hambuguer": 17, "batata": 5})
products.update("sucos", {"laranja": 4, "laranjaAcerola": 7, "Vitamina": 10})
console.log(products)
for (let product of products) {
    console.log(product)
}