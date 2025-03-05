const fs = require("fs");
const path = require("path");

/**
 * Minifies CSS code
 
 * @param {string} cssContent - CSS content to minify
 * @returns {string} - Minified CSS content
*/

function minifyCss(cssContent) {
    cssContent = cssContent.replace(/\/\*[\s\S]*?\*\//g, '');
    
    cssContent = cssContent.replace(/\s+/g, ' ');
    
    cssContent = cssContent.replace(/\s*{\s*/g, '{');
    cssContent = cssContent.replace(/\s*}\s*/g, '}');
    cssContent = cssContent.replace(/\s*:\s*/g, ':');
    cssContent = cssContent.replace(/\s*;\s*/g, ';');
    cssContent = cssContent.replace(/\s*,\s*/g, ',');
    
    cssContent = cssContent.replace(/;\}/g, '}');
    
    cssContent = cssContent.trim();
    
    return cssContent;
}

/**
 * Minifies CSS file and saves it to a new file
 
 * @param {string} filePath - Path to the CSS file
 * @returns {string} - Path to the minified CSS file
*/

function minifyCssFile(filePath) {
    const cssContent = fs.readFileSync(filePath, 'utf8');

    const minifiedCss = minifyCss(cssContent);
    
    const fileDir = path.dirname(filePath);
    const fileName = path.basename(filePath, '.css');
    const outputFilePath = path.join(fileDir, `${fileName}.min.css`);
    
    fs.writeFileSync(outputFilePath, minifiedCss, 'utf8');
    
    return outputFilePath;
}

/**
 * Minifies CSS content in-place
 
 * @param {string} cssContent - CSS content to minify
 * @returns {string} - Minified CSS content
*/

function minifyCssInPlace(cssContent) {
    return minifyCss(cssContent);
}

module.exports = { minifyCss, minifyCssFile, minifyCssInPlace };
