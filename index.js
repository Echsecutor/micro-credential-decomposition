import { v4 as uuid } from 'uuid';


// expect Object: data, Array: decomposed (possibly empty)
// add the micro credentials corresponding to data to the decomposed array
// return the root micro credential
export function decompose(data, decomposed) {
    /*
    // some debugging logs
    console.log("decomposing")
    console.log(data)
    console.log("decomposed so far:")
    console.log(decomposed)
    */

    if (Object(data) !== data) {
        throw "Data is not an object"
    }
    if (!Array.isArray(decomposed)) {
        throw "decomposed is not an Array"
    }

    var parent = { id: uuid() }
    decomposed.push(parent)

    for (var key in data) {
        if (Object(data[key]) === data[key]) { // Object or array
            child = decompose(data[key], decomposed)
            child.parent = parent.id
            child.key = key
        } else { // simple value
            var child = {
                id: uuid(),
                parent: parent.id,
                key: key,
                value: data[key]
            }
            decomposed.push(child)
        }
    }

    return parent
}