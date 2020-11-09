const defaultObj = require("./lib/defaultObj")
//Criar uma função que retorna um obj que faz subgrupos levando em consideração dois atributos
function groupBy(types) {
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
//talvez precise de uma nova função de default obj
//Retorna um função com sub grupos de ordenação
function SubGroups() {

}


let a=1, b=2, c=3
let objs = [
    {country: "Brazil", type: a, preco: 10},
    {country: "Brazil", type: a, preco: 20},
    {country: "Brazil", type: c, preco: 30},
    {country: "Brazil", type: b, preco: 40},
    {country: "Brazil", type: b, preco: 50},
    {country: "Usa", type: c, preco: 60},
    {country: "Usa", type: a, preco: 70},
    {country: "Usa", type: b, preco: 80},
    {country: "Usa", type: a, preco: 90},
    {country: "Usa", type: b, preco: 100}
]
let grouper = groupBy(["type", "country"])
let grouped = grouper(objs)
console.log(grouped)