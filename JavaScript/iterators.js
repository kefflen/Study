let l = [1, 2, 3]
l.length
let obj = {
    clients: ["Ana", "Pedro", "João"],
    idades: [20, 22, 19],
    [Symbol.iterator]: function () {
        let iterable = this.clients.map((value, index) => {
            return `Nome: ${value}; idade: ${this.idades[index]}`
        })
        return {
            next: () => ({
                done: iterable.length === 0,
                value: iterable.shift()
            })
        }
    }
}
function PessoaIterable (name, idade, college, course) {
    return {
        name, idade, college, course,
        [Symbol.iterator]: function* () {
            yield this.name
            yield this.idade
            yield this.college
            yield this.course
        }
    }
}
let peoples = [new PessoaIterable("Kefflen", 23, "Fatec", "ADS"), new PessoaIterable("Joao", 19, "Fatec", "ADS")]
for (let client of obj) {
    console.log("Cliente: ", client)
}
for (pearson of peoples) {
    [name, idade, college, course] = pearson
    console.log(name, idade, college, course)
}
