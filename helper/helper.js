


function findIdYoutube(value) {
    const start = value.indexOf("=")
    const end = value.indexOf("&")
    if(end === -1) {
        return value.substring(start + 1)
    }
    return value.substring(start + 1, end)
}



module.exports = {findIdYoutube}