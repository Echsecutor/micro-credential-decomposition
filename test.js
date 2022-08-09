import { decompose } from "./index.js"

function assert(boolean) {
    if (!boolean) {
        throw "Assertion failed"
    }
}

const example_data = {
    product_name: [
        {
            language: "de",
            value: "Dings"
        },
        {
            language: "en",
            value: "Stuff"
        }
    ],
    weight: {
        value: 12,
        uom: "g"
    },
    size: "large"
}

function test_decomposition() {
    var decomposed = []

    const root = decompose(example_data, decomposed)

    console.log("Decomposed data")
    console.log(example_data)
    console.log("Into")
    console.log(decomposed)

    const lvl_1_children = decomposed.filter((micro) => micro.parent === root.id)

    assert(lvl_1_children.filter((micro) => micro.key === "product_name").length === 1)

    assert(lvl_1_children.filter((micro) => micro.key === "weight").length === 1)
    const weight_mc = lvl_1_children.filter((micro) => micro.key === "weight")[0]
    const weight_children = decomposed.filter((micro) => micro.parent === weight_children.id)
    assert(weight_children.filter((micro) => micro.key === "value").length === 1)
    assert(weight_children.filter((micro) => micro.key === "value")[0].value === 12)
    assert(weight_children.filter((micro) => micro.key === "uom").length === 1)
    assert(weight_children.filter((micro) => micro.key === "uom")[0].value === "g")


    assert(lvl_1_children.filter((micro) => micro.key === "size").length === 1)
    assert(lvl_1_children.filter((micro) => micro.key === "size")[0].value === "large")
}


test_decomposition()
