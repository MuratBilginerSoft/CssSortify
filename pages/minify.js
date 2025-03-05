/**
 * CSS Minify Module
 * Minifies CSS code and saves it to a new file
 */

/**
 * Minifies CSS code
 * @param {string} cssContent - CSS content to minify
 * @returns {string} - Minified CSS content
 */
function minifyCss(cssContent) {
    // Remove comments
    cssContent = cssContent.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Remove whitespace
    cssContent = cssContent.replace(/\s+/g, ' ');
    
    // Remove spaces before and after brackets, colons, semicolons
    cssContent = cssContent.replace(/\s*{\s*/g, '{');
    cssContent = cssContent.replace(/\s*}\s*/g, '}');
    cssContent = cssContent.replace(/\s*:\s*/g, ':');
    cssContent = cssContent.replace(/\s*;\s*/g, ';');
    cssContent = cssContent.replace(/\s*,\s*/g, ',');
    
    // Remove last semicolons before closing brackets
    cssContent = cssContent.replace(/;\}/g, '}');
    
    // Remove leading and trailing whitespace
    cssContent = cssContent.trim();
    
    return cssContent;
}

/**
 * Minifies CSS file and saves it to a new file
 * @param {string} filePath - Path to the CSS file
 * @param {boolean} isNested - Whether the file has nested CSS
 * @returns {string} - Path to the minified CSS file
 */
function minifyCssFile(filePath, isNested = false) {
    const fs = require('fs');
    const path = require('path');
    
    // Read the file content
    const cssContent = fs.readFileSync(filePath, 'utf8');
    
    // Minify the CSS content
    const minifiedCss = minifyCss(cssContent);
    
    // Create the output file path
    const fileDir = path.dirname(filePath);
    const fileName = path.basename(filePath, '.css');
    const outputFilePath = path.join(fileDir, `${fileName}.min.css`);
    
    // Write the minified CSS to the output file
    fs.writeFileSync(outputFilePath, minifiedCss, 'utf8');
    
    return outputFilePath;
}

/**
 * Minifies CSS content in-place
 * @param {string} cssContent - CSS content to minify
 * @param {boolean} isNested - Whether the CSS is nested
 * @returns {string} - Minified CSS content
 */
function minifyCssInPlace(cssContent, isNested = false) {
    return minifyCss(cssContent);
}

module.exports = {
    minifyCss,
    minifyCssFile,
    minifyCssInPlace
};
