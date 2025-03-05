// @ts-nocheck
/**
 * CSS Sorting main module
 * Handles all CSS sorting operations
 */

const { sortByLengthDesc, sortByLengthAsc } = require("./SortByLength.js");
const { sortAlphabetically, sortAlphabeticallyDesc } = require("./SortByAlphabetically.js");
const { sortByCategory } = require("./SortByCategory.js");
const { sortByCategoryWithSpacing } = require("./SortByCategoryWithSpacing.js");

/**
 * Sorts CSS properties based on the specified sort type
 
 * @param {string} properties - CSS properties string
 * @param {string} sortType - Type of sorting to apply
 * @param {boolean} isNested - Whether the properties are nested
 * @returns {string} - Sorted CSS properties string
*/

function sortProperties(properties, sortType, isNested = false) {
  if (!properties || properties.trim() === "") {
    return properties;
  }

  switch (sortType) {
    case "length-desc":
      return sortByLengthDesc(properties, isNested);
    case "length-asc":
      return sortByLengthAsc(properties, isNested);
    case "alpha-asc":
      return sortAlphabetically(properties, isNested);
    case "alpha-desc":
      return sortAlphabeticallyDesc(properties, isNested);
    case "category":
      return sortByCategory(properties, isNested);
    case "category-with-spacing":
      return sortByCategoryWithSpacing(properties, isNested);
    default:
      return properties;
  }
}

/**
 * Processes CSS content with nested selectors
 
 * @param {string} text - CSS content to process
 * @param {string} sortType - Type of sorting to apply
 * @param {number} indentLevel - Level of indentation
 * @returns {string} - Processed CSS content
*/
function processNormalCss(text, sortType, indentLevel = 0) {
  const blocks = [];
  let depth = 0;
  let currentBlock = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === "{") {
      depth++;
      currentBlock += char;
    } else if (char === "}") {
      depth--;
      currentBlock += char;

      if (depth === 0) {
        blocks.push(currentBlock);
        currentBlock = "";
      }
    } else {
      currentBlock += char;
    }
  }

  const indent = "    ".repeat(indentLevel);
  const propertyIndent = "    ".repeat(indentLevel + 1);

  return blocks
    .map((block) => {
      const selectorEnd = block.indexOf("{");
      const selector = block.substring(0, selectorEnd).trim();
      const content = block.substring(selectorEnd + 1, block.length - 1);

      if (content.includes("{")) {
        const processedContent = processNormalCss(
          content,
          sortType,
          indentLevel + 1
        );
        return `${indent}${selector} {\n${processedContent}\n${indent}}`;
      } else {
        const sortedProperties = sortProperties(content.trim(), sortType);
        return `${indent}${selector} {\n${propertyIndent}${sortedProperties}\n${indent}}`;
      }
    })
    .join("\n\n");
}

/**
 * Sorts CSS properties in a text block
 
 * @param {string} text - CSS text to sort
 * @param {string} sortType - Type of sorting to apply
 * @returns {string} - Sorted CSS text
*/

function sortCssProperties(text, sortType) {
  const mediaQueryRegex = /@media[^{]+\{([\s\S]+?}\s*)\}/g;
  let result = "";
  let lastIndex = 0;

  text.replace(mediaQueryRegex, (match, cssContent, offset) => {
    if (offset > lastIndex) {
      const normalCss = text.slice(lastIndex, offset).trim();
      if (normalCss) {
        result += processNormalCss(normalCss, sortType, 0) + "\n\n";
      }
    }

    const mediaQueryHeader = match.substring(0, match.indexOf("{") + 1);
    const processedContent = processNormalCss(cssContent, sortType, 1);
    result += `${mediaQueryHeader}\n${processedContent}\n}\n\n`;

    lastIndex = offset + match.length;
  });

  const remainingCss = text.slice(lastIndex).trim();
  if (remainingCss) {
    result += processNormalCss(remainingCss, sortType, 0);
  }

  return result.trim();
}

module.exports = { sortCssProperties, processNormalCss, sortProperties };
