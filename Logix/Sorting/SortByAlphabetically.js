/**
 * CSS property alphabetical sorting module
 * Sorts CSS properties alphabetically by property name
 */

const { parseProperties } = require("./ParseProperties.js");

/**
 * Sorts CSS properties alphabetically in ascending order (A-Z)
 
 * @param {string} properties - CSS properties string
 * @param {boolean} isNested - Whether the properties are nested
 * @returns {string} - Sorted CSS properties string
*/

function sortAlphabetically(properties, isNested = false) {
  const propertyList = parseProperties(properties);

  const sortedList = propertyList.sort((a, b) => {
    const propA = a.split(":")[0].trim();
    const propB = b.split(":")[0].trim();
    return propA.localeCompare(propB);
  });

  const indent = isNested ? "\n        " : "\n    ";
  return sortedList.join(indent);
}

/**
 * Sorts CSS properties alphabetically in descending order (Z-A)
 
 * @param {string} properties - CSS properties string
 * @param {boolean} isNested - Whether the properties are nested
 * @returns {string} - Sorted CSS properties string
*/

function sortAlphabeticallyDesc(properties, isNested = false) {
  const propertyList = parseProperties(properties);

  const sortedList = propertyList.sort((a, b) => {
    const propA = a.split(":")[0].trim();
    const propB = b.split(":")[0].trim();
    return propB.localeCompare(propA);
  });

  const indent = isNested ? "\n        " : "\n    ";
  return sortedList.join(indent);
}

module.exports = { sortAlphabetically, sortAlphabeticallyDesc };
