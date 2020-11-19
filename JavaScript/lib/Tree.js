module.exports = Cell

class Cell{
    constructor(value) {
        this.value = value
    }
    insert(value) {
        if (value < this.value) {
            if (this.left) this.left.insert(value)
            else this.left = new Cell(value)
        } else {
            if (this.right) this.right.insert(value)
            else this.right = new Cell(value)
        }
    }

    insertFrom(iterable) {
        for (let value of iterable) {
            this.insert(value)
        }
    }
    *iterReverse() {
        if (this.right) yield* this.right
        yield this.value
        if (this.left) yield* this.left
    }
    *_iter () {
        if (this.left) yield* this.left
        yield this.value
        if (this.right) yield* this.right
    }

    [Symbol.iterator] = this._iter //@@iterator

    static treeFrom(iterator) {
        let main
        for (let value of iterator) {
            if (!main) {
                main = new Cell(value)
            } else {
                main.insert(value)
            }
        }
        return main
    }
}
/*
main = new Cell(10)
main.insert(5)
main.insert(2)
main.insert(3)
main.insert(11)
console.log(main)
a = Array.from(main)
b = Cell.treeFrom([1,2,6,79,4,3,2,5,7,9])
console.log(a)
console.log(Array.from(b))
*/
/*
---------------------------------------
Output
Cell {
    value: 10,
    left: Cell {
      value: 5,
      left: Cell {
        value: 2,
        right: [Cell],
        [Symbol(Symbol.iterator)]: [GeneratorFunction: _iter]
      },
      [Symbol(Symbol.iterator)]: [GeneratorFunction: _iter]
    },
    right: Cell {
      value: 11,
      [Symbol(Symbol.iterator)]: [GeneratorFunction: _iter]
    },
    [Symbol(Symbol.iterator)]: [GeneratorFunction: _iter]
  }
  [ 2, 3, 5, 10, 11 ]
  [
    1, 2, 2, 3,  4,
    5, 6, 7, 9, 79
  ]
*/