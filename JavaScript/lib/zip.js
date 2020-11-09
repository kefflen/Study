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
module.exports = zip
