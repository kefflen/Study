


let n1 = {teste: 1, teste2: 2}
let n2 = n1

r = new WeakSet()
r.add(n1)
console.log(r.has(n1))
console.log(r.has(n2))
delete n1
console.log(r.has(n2))
delete n2
console.log(r)
