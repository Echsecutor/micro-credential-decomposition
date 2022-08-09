import { v4 as uuid } from 'uuid';


// expect Object: data, Array: decomposed (possibly empty)
// add the micro credentials corresponding to data to the decomposed array
// return the root micro credential
export function decompose(data, decomposed) {
    if (Object(data) !== data) {
        throw "Data is not an object"
    }
    if (Array.isArray(data)) {
        throw "decomposed is not an Array"
    }

    var parent = { id: uuid() }
    decomposed.push(parent)

    for (var key in data) {
        if (Array.isArray(data[key])) {
            for (var childObject in data[key]) {
                if (Object(childObject) === childObject) {
                    var child = decompose(childObject, decomposed)
                    child.parent = parent
                } else {
                    var child = {
                        id: uuid(),
                        parent: parent.id,
                        value: childObject
                    }
                    decomposed.push(child)
                }
            }
        } else if (Object(data[key]) === data[key]) {
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