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


// expect Array: decomposed containing all micro credentials, Object: root the root micro credential in decomposed
// compose and return the complex data model. Inverse of decompose.
export function compose(root, decomposed) {
    /*
    // some debugging logs
    console.log("root")
    console.log(root)
    console.log("decomposed")
    console.log(decomposed)
    */

    if (Object(root) !== root) {
        throw "root is not an object"
    }
    if (!Array.isArray(decomposed)) {
        throw "decomposed is not an Array"
    }


    const lvl_1_children = decomposed.filter((micro) => micro.parent === root.id)
    if(lvl_1_children.length === 0){
        return root.value
    }
    var data ={}
    if(lvl_1_children.filter((micro) => Number.isInteger(Number(micro.key))).length == lvl_1_children.length){ // all keys are integers -> this is an array
        var data=[]
    }

    for (var child in lvl_1_children){
        data[lvl_1_children[child].key] = compose(lvl_1_children[child], decomposed)
    }
    return data
}
