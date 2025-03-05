/**
 
 * Extracts CSS content from HTML style tags if in HTML file, otherwise returns the original text
 
 * @param {string} text - The text to process
 * @param {string} languageId - The language ID of the document
 * @returns {Object} Object containing processed text and positions
 
*/

function processHtmlStyleTags(text, languageId) {

    if (languageId !== "html" && languageId !== "htm") {
        return {
        text,
        isHtml: false,
        styleTagRanges: [],
        };
    }

    const styleTagRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    let match;
    let styleTagRanges = [];

    while ((match = styleTagRegex.exec(text)) !== null) {
        const fullMatch = match[0];
        const openTagEndIndex = fullMatch.indexOf(">") + 1;
        const closeTagStartIndex = fullMatch.lastIndexOf("<");

        const content = match[1];

        const openTag = fullMatch.substring(0, openTagEndIndex);

        const closeTag = fullMatch.substring(closeTagStartIndex);

        const lineStart = text.lastIndexOf("\n", match.index) + 1;
        const indentation = text.substring(lineStart, match.index);

        styleTagRanges.push({
        start: match.index + openTagEndIndex,
        end: match.index + closeTagStartIndex,
        content: content,
        openTag: openTag,
        closeTag: closeTag,
        fullMatchStart: match.index,
        fullMatchEnd: match.index + fullMatch.length,
        indentation: indentation,
        });
    }

    return {
        text,
        isHtml: true,
        styleTagRanges,
    };
}

module.exports = { processHtmlStyleTags };
