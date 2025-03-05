/**
 * CSS property alphabetical sorting module
 * Sorts CSS properties alphabetically by property name
 */

const { parseProperties } = require('./cssUtils');

/**
 * Sorts CSS properties alphabetically in ascending order (A-Z)
 * @param {string} properties - CSS properties string
 * @param {boolean} isNested - Whether the properties are nested
 * @returns {string} - Sorted CSS properties string
 */
function sortAlphabetically(properties, isNested = false) {
    // Parse the properties into a list
    const propertyList = parseProperties(properties);
    
    // Sort the properties alphabetically (A-Z)
    const sortedList = propertyList.sort((a, b) => {
        const propA = a.split(':')[0].trim();
        const propB = b.split(':')[0].trim();
        return propA.localeCompare(propB);
    });
    
    // Format the output with appropriate indentation
    const indent = isNested ? '\n        ' : '\n    ';
    return sortedList.join(indent);
}

/**
 * Sorts CSS properties alphabetically in descending order (Z-A)
 * @param {string} properties - CSS properties string
 * @param {boolean} isNested - Whether the properties are nested
 * @returns {string} - Sorted CSS properties string
 */
function sortAlphabeticallyDesc(properties, isNested = false) {
    // Parse the properties into a list
    const propertyList = parseProperties(properties);
    
    // Sort the properties alphabetically (Z-A)
    const sortedList = propertyList.sort((a, b) => {
        const propA = a.split(':')[0].trim();
        const propB = b.split(':')[0].trim();
        return propB.localeCompare(propA);
    });
    
    // Format the output with appropriate indentation
    const indent = isNested ? '\n        ' : '\n    ';
    return sortedList.join(indent);
}

module.exports = {
    sortAlphabetically,
    sortAlphabeticallyDesc
};
