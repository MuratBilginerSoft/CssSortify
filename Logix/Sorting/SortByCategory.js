const { parseProperties } = require("./ParseProperties.js");
const { boxModelProps, positioningProps, typographyProps, visualProps, animationProps, listTableProps, uiProps, otherProps } = require("../Utils/Lists.js");

/**
 * Sorts CSS properties by category
 
 * @param {string} properties - CSS properties string
 * @param {boolean} isNested - Whether the properties are nested
 * @returns {string} - Sorted CSS properties string
*/

function sortByCategory(properties, isNested = false) {
  const propertyList = parseProperties(properties);

  const sortedList = propertyList.sort((a, b) => {
    const propA = a.split(":")[0].trim();
    const propB = b.split(":")[0].trim();

    const categoryA = getCssPropertyCategory(propA);
    const categoryB = getCssPropertyCategory(propB);

    if (categoryA !== categoryB) {
      return categoryA - categoryB;
    }

    const flexProps = [
      "display",
      "flex-direction",
      "flex-wrap",
      "flex-flow",
      "justify-content",
      "align-items",
      "align-content",
      "gap",
      "row-gap",
      "column-gap",
      "flex",
      "flex-grow",
      "flex-shrink",
      "flex-basis",
      "align-self",
      "order",
    ];

    if (flexProps.includes(propA) && flexProps.includes(propB)) {
      return flexProps.indexOf(propA) - flexProps.indexOf(propB);
    }

    return propA.localeCompare(propB);
  });

  const indent = isNested ? "\n        " : "\n    ";
  return sortedList.join(indent);
}

/**
 * Determines the category of a CSS property
 
 * @param {string} property - CSS property name
 * @returns {number} - Category number (1-9)
*/

function getCssPropertyCategory(property) {
  
  if (positioningProps.includes(property)) return 1;
  if (boxModelProps.includes(property)) return 2;
  if (typographyProps.includes(property)) return 3;
  if (visualProps.includes(property)) return 4;
  if (animationProps.includes(property)) return 5;
  if (listTableProps.includes(property)) return 6;
  if (uiProps.includes(property)) return 7;
  if (otherProps.includes(property)) return 8;

  return 9;
}

module.exports = { sortByCategory };
