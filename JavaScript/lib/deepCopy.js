function deepCopy(iterable) {
    let copied = Array.from(iterable)
    for (let index in copied) {
        if (Array.isArray(copied[index])) copied[index] = deepCopy(copied[index])
    }
    return copied
}
module.exports = deepCopy