function rfc3986EncodeURIComponent (str) {  
    return encodeURIComponent(str).replace(/[']/g, escape);  
}

module.exports = rfc3986EncodeURIComponent