export const getSubLocationsFromLocation = (keys, str="")=>{
    let result = {}
    keys.forEach(key=>{
let sliced = str.substring(str.indexOf(key)+key.length+2)
        result[key]= sliced.substring(0,sliced.indexOf("<")) 
    })
    return result
}
