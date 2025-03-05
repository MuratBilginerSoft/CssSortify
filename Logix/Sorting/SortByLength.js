const { parseProperties } = require("./ParseProperties.js");

/**
 * Sorts CSS properties by length in descending order (longest first)
 
 * @param {string} properties - CSS properties string
 * @param {boolean} isNested - Whether the properties are nested
 * @returns {string} - Sorted CSS properties string
*/

function sortByLengthDesc(properties, isNested = false) {
  const propertyList = parseProperties(properties);
  const sortedList = propertyList.sort((a, b) => b.length - a.length);
  const indent = isNested ? "\n        " : "\n    ";
  return sortedList.join(indent);
}

/**
 * Sorts CSS properties by length in ascending order (shortest first)
 
 * @param {string} properties - CSS properties string
 * @param {boolean} isNested - Whether the properties are nested
 * @returns {string} - Sorted CSS properties string
*/

function sortByLengthAsc(properties, isNested = false) {
  const propertyList = parseProperties(properties);
  const sortedList = propertyList.sort((a, b) => a.length - b.length);
  const indent = isNested ? "\n        " : "\n    ";
  return sortedList.join(indent);
}

module.exports = { sortByLengthDesc, sortByLengthAsc };
