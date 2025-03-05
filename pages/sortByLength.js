/**
 * CSS property length sorting module
 * Sorts CSS properties by their character length
 */

const { parseProperties } = require('./cssUtils');

/**
 * Sorts CSS properties by length in descending order (longest first)
 * @param {string} properties - CSS properties string
 * @param {boolean} isNested - Whether the properties are nested
 * @returns {string} - Sorted CSS properties string
 */
function sortByLengthDesc(properties, isNested = false) {
    // Parse the properties into a list
    const propertyList = parseProperties(properties);
    
    // Sort the properties by length (descending)
    const sortedList = propertyList.sort((a, b) => b.length - a.length);
    
    // Format the output with appropriate indentation
    const indent = isNested ? '\n        ' : '\n    ';
    return sortedList.join(indent);
}

/**
 * Sorts CSS properties by length in ascending order (shortest first)
 * @param {string} properties - CSS properties string
 * @param {boolean} isNested - Whether the properties are nested
 * @returns {string} - Sorted CSS properties string
 */
function sortByLengthAsc(properties, isNested = false) {
    // Parse the properties into a list
    const propertyList = parseProperties(properties);
    
    // Sort the properties by length (ascending)
    const sortedList = propertyList.sort((a, b) => a.length - b.length);
    
    // Format the output with appropriate indentation
    const indent = isNested ? '\n        ' : '\n    ';
    return sortedList.join(indent);
}

module.exports = {
    sortByLengthDesc,
    sortByLengthAsc
};
