function rfc3986EncodeURIComponent (str) {
	// function encodes the text 
    return encodeURIComponent(str).replace(/[']/g, escape);  
}

module.exports = rfc3986EncodeURIComponent