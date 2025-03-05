const { sortByCategory } = require("./SortByCategory.js");

function sortByCategoryWithSpacing(properties, isNested = false) {
  
  const sortedProperties = sortByCategory(properties, isNested);

  if (!sortedProperties || sortedProperties.trim() === "") {
    return sortedProperties;
  }
  
  const lines = sortedProperties.split("\n");
  const result = [];
  let currentCategory = "";
  let previousCategory = "";

  const positioningRegex = /^(\s*)(position|top|right|bottom|left|z-index)/;
  const flexRegex =
    /^(\s*)(display|flex-direction|flex-wrap|flex-flow|justify-content|align-items|align-content|gap|row-gap|column-gap|flex|flex-grow|flex-shrink|flex-basis|align-self|order)/;
  const gridRegex = /^(\s*)(grid|visibility|opacity)/;
  const boxModelRegex =
    /^(\s*)(width|height|min-|max-|padding|margin|box-sizing)/;
  const borderRegex = /^(\s*)(border|outline|box-shadow|border-radius)/;
  const backgroundRegex = /^(\s*)(background|color)/;
  const typographyRegex =
    /^(\s*)(font|text|line-height|letter-spacing|word|white-space)/;
  const transitionRegex = /^(\s*)(transition|animation|transform)/;
  const otherRegex =
    /^(\s*)(cursor|pointer-events|user-select|overflow|clip|mask)/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (positioningRegex.test(line)) {
      currentCategory = "positioning";
    } else if (flexRegex.test(line)) {
      currentCategory = "flex";
    } else if (gridRegex.test(line)) {
      currentCategory = "grid";
    } else if (boxModelRegex.test(line)) {
      currentCategory = "boxModel";
    } else if (borderRegex.test(line)) {
      currentCategory = "border";
    } else if (backgroundRegex.test(line)) {
      currentCategory = "background";
    } else if (typographyRegex.test(line)) {
      currentCategory = "typography";
    } else if (transitionRegex.test(line)) {
      currentCategory = "transition";
    } else if (otherRegex.test(line)) {
      currentCategory = "other";
    } else {
      currentCategory = "unknown";
    }

    if (currentCategory !== previousCategory && previousCategory !== "" 
      && line.trim() !== "") {
      const indentation = line.match(/^(\s*)/)[0];
      result.push(indentation);
    }

    result.push(line);
    previousCategory = currentCategory;
  }

  return result.join("\n");
}

module.exports = { sortByCategoryWithSpacing };
