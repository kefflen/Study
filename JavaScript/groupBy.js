function DefaultObj(initializer) {
    //Initializer need to be a 'Contructor function', like Array or Object
    return new Proxy({
    }, {
        get(that, prop) {
            if (!(prop in that)) that[prop] = initializer()
            return that[prop]
        }
    })
}


function groupedBy(prop) {
    let grouped = DefaultObj(Array)
    return function (objs) {
        for (obj of objs) {
            grouped[obj[prop]].push(obj)
        }
        return grouped
    }
}
let a=1, b=2, c=3
let objs = [
    {type: a, preco: 10},
    {type: a, preco: 20},
    {type: c, preco: 30},
    {type: b, preco: 40},
    {type: b, preco: 50},
    {type: c, preco: 60},
    {type: a, preco: 70},
    {type: b, preco: 80},
    {type: a, preco: 90},
    {type: b, preco: 100}
]
grouper = groupedBy("type")
console.log(grouper(objs))
