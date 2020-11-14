

function PutOnSpace(text, spaces) {
    len = text.length
    if (spaces > len) {
        text = text + " ".repeat(spaces - len)
    }
    return text
}

function TableView(obj, propsConfig) {
    let text = ""
    for (let propConfig of propsConfig.split(",")) {
        let [prop, spaces] = propConfig.split(".")
        let value = String(obj[prop.trim()])
        if (spaces) {
            if (spaces.endsWith("b")) {
                spaces = Number(spaces.slice(0, -1))
                len = value.length
                if (spaces > len) {
                    text += value + " ".repeat(spaces - len)
                } else {
                    text += value
                } 
            } else if(spaces.endsWith("s")) {
                spaces = Number(spaces.slice(0, -1))
                text += value + " ".repeat(spaces)
            }
        } else {
            text += value
        }
        
    }
    return text
}

let products = [
    {
        product: "Apple",
        price: 5,
        stock: 100,
        type: "Fruit"
    },
    {
        product: "Smartphone",
        price: 1200,
        stock: 50,
        type: "Electronic"
    },
    {
        product: "Detergent",
        price: 16,
        stock: 1000,
        type: "Health"
    }
]
console.log(PutOnSpace("Product", 20) + PutOnSpace("price", 6) + "stock; type\n" + "-".repeat(35))
for (let product of products) {
    console.log(TableView(product, "product.20b, price.6b, stock.2s, type"))
}
/* Output:
Product             price stock; type
-----------------------------------
Apple               5     100  Fruit
Smartphone          1200  50  Electronic
Detergent           16    1000  Health
*/

