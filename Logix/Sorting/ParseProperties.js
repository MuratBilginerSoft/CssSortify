/**
 * Formats CSS property values for consistency
 * @param {string} value - CSS property value to format
 * @returns {string} - Formatted CSS property value
 */
function formatPropertyValue(value) {
    let formattedValue = value;
    
    const hasImportant = value.endsWith('!important');
    if (hasImportant) {
        formattedValue = value.slice(0, -10).trim() + ' !important';
    }
    
    formattedValue = formattedValue
        .replace(/\s+/g, ' ')           
        .replace(/\s*,\s*/g, ', ')   
        .replace(/\s*\(\s*/g, '(')
        .replace(/\s*\)\s*/g, ')')
        .trim();
    
    return formattedValue;
}

/**
 * Parses CSS properties from a string
 
 * @param {string} properties - CSS properties string
 * @returns {string[]} - Array of formatted CSS property strings
*/

function parseProperties(properties) {
    if (!properties) return [];
    
    return properties
        .split(';')
        .map(prop => prop.trim())
        .filter(prop => prop.length > 0)
        .map(prop => {
            const [key, ...valueParts] = prop.split(':');
            if (!key || valueParts.length === 0) return null;
            
            const value = valueParts.join(':').trim();
            const formattedValue = formatPropertyValue(value);
            
            return `${key.trim()}: ${formattedValue};`;
        })
        .filter(prop => prop !== null);
}

module.exports = { formatPropertyValue, parseProperties };
