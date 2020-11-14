const DefaultObj = require("./defaultObj")

function groupedByOne(prop) {
    let grouped = DefaultObj(Array)
    return function (objs) {
        for (obj of objs) {
            grouped[obj[prop]].push(obj)
        }
        return grouped
    }
}
function groupByMany(types) {
    let obj = defaultObj(Array)
    function inner(objs) {
        for (let item of objs) {
            let prop = "("
            for (key in types) {
                if (key == 0) {
                    prop += `${item[types[key]]}`
                } else {
                    prop += `,${item[types[key]]}`
                }
            }
            prop += ")"
            obj[prop].push(item)
        }
        return obj
    }
    return inner
}

module.exports = {
    groupedByOne,
    groupByMany
}