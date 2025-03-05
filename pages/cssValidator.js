/**
 * CSS Validator module
 * Validates CSS selections and content
 */

/**
 * Validates a CSS selection to ensure it's a complete and valid CSS block
 * @param {string} text - CSS text to validate
 * @returns {Object} - Validation result with valid flag and error message if invalid
 */
function isValidCssSelection(text) {
    if (!text.trim()) {
        return { valid: false, error: 'Boş seçim' };
    }

    const openBraces = (text.match(/\{/g) || []).length;
    const closeBraces = (text.match(/\}/g) || []).length;

    if (openBraces === 0 || closeBraces === 0) {
        return { valid: false, error: 'Seçici eksik, süslü parantezleri de seçmelisiniz' };
    }

    if (openBraces !== closeBraces) {
        return { valid: false, error: 'Açılan ve kapanan süslü parantez sayısı eşit değil' };
    }

    const firstChar = text.trim()[0];
    const lastChar = text.trim()[text.trim().length - 1];

    const validStartChars = /^[.#*\[a-zA-Z_:]/;
    if (!validStartChars.test(firstChar)) {
        return { valid: false, error: 'Seçim CSS seçicisiyle başlamıyor' };
    }

    if (lastChar !== '}') {
        return { valid: false, error: 'Seçim süslü parantezle bitmiyor' };
    }

    const properties = text.substring(text.indexOf('{') + 1, text.lastIndexOf('}')).trim();
    if (!properties) {
        return { valid: false, error: 'Seçici içi boş' };
    }

    return { valid: true };
}

module.exports = {
    isValidCssSelection
};
