/**
 * @param {string} text
 * @returns { boolean } if input is valid
 */
function isValidUrl(text) {
    try {
        const url = new URL(text);
        return url.protocol.startsWith('http:') || url.protocol.startsWith('https:');
    } catch {
        return false;
    }

}

export { isValidUrl }