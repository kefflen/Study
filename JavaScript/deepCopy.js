//Problem: Copiar um array de array vai criar um novo array, mas seu conteudo sera igual ao array copiado.
//  então ao modificar um array contido no principal, vai afetar o outro array de onde o conteudo foi copiado


function deepCopy(iterable) {
    let copied = Array.from(iterable)
    for (let index in copied) {
        if (Array.isArray(copied[index])) copied[index] = deepCopy(copied[index])
    }
    return copied
}

let list_1 = [[0, 1, 2, 3, 4], ["a", "b", "c", "d", "e"], [[],[]]]
let list_2 = Array.from(list_1)
let myCopy = deepCopy(list_1)
let otherCopy = _.deepCopy(list_1)
list_1.push("Only in list 1")
list_2.push("Only in list 2")
list_2[0].push(100)
list_1[2].push("Nani")
list_1[2][0].push("Hi")

console.log({list_1, list_2, myCopy, otherCopy})
