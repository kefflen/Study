function defaultObj(initializer) {
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
module.exports = defaultObj
