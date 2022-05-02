function transfers(data, key){
    let tmp
    if (key in data){
        tmp[key] = data[key]
    }
    return tmp
}

function crop(value, length){
    return value[length]
}
