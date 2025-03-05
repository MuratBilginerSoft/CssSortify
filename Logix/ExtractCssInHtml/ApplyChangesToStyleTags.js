/**
 * Applies changes to style tags in HTML content
 
 * @param {string} originalText - The original HTML text
 * @param {Array} styleTagRanges - Array of style tag ranges
 * @param {Function} transformFn - Function to transform CSS content
 * @returns {string} - The modified HTML text
 
*/

function applyChangesToStyleTags(originalText, styleTagRanges, transformFn) {
  if (styleTagRanges.length === 0) {
    return originalText;
  }

  let result = originalText;
  let offset = 0;

  for (const range of styleTagRanges) {
    const originalContent = range.content;
    let transformedContent = transformFn(originalContent);

    const desiredIndentation = "\t";

    transformedContent = transformedContent
      .split("\n")
      .map((line) => (line.trim() ? desiredIndentation + "\t" + line : line))
      .join("\n");

    if (transformedContent.length > 0 && !transformedContent.startsWith("\n")) {
      transformedContent = "\n" + transformedContent;
    }

    if (transformedContent.length > 0 && !transformedContent.endsWith("\n")) {
      transformedContent = transformedContent + "\n";
    }

    transformedContent = transformedContent + desiredIndentation;

    const startPos = range.start + offset;
    const endPos = range.end + offset;

    result =
      result.substring(0, startPos) +
      transformedContent +
      result.substring(endPos);
    offset += transformedContent.length - originalContent.length;

    const currentIndentation = range.indentation || "";
    if (currentIndentation !== desiredIndentation) {

      const fullMatchStart = range.fullMatchStart + offset;
      const lineStart = result.lastIndexOf("\n", fullMatchStart) + 1;
      const beforeStyle = result.substring(0, lineStart);
      const afterStyle = result.substring(lineStart);

      const reindentedAfterStyle = afterStyle.replace(
        currentIndentation + range.openTag,
        desiredIndentation + range.openTag
      );

      result = beforeStyle + reindentedAfterStyle;

      offset += desiredIndentation.length - currentIndentation.length;
    }
  }
  return result;
}

module.exports = { applyChangesToStyleTags };
