const vscode = require('vscode');
const { getMessage } = require('./messages');

function sortCssProperties(text, sortType) {
    try {
        const mediaQueryRegex = /@media[^{]+\{([\s\S]+?}\s*)\}/g;
        let result = '';
        let lastIndex = 0;
        
        text.replace(mediaQueryRegex, (match, cssContent, offset) => {
            if (offset > lastIndex) {
                const normalCss = text.slice(lastIndex, offset).trim();
                if (normalCss) {
                    result += processNormalCss(normalCss, sortType, 0) + '\n\n';
                }
            }
            
            const mediaQueryHeader = match.substring(0, match.indexOf('{') + 1);
            const processedContent = processNormalCss(cssContent, sortType, 1);
            result += `${mediaQueryHeader}\n${processedContent}\n}\n\n`;
            
            lastIndex = offset + match.length;
        });
        
        const remainingCss = text.slice(lastIndex).trim();
        if (remainingCss) {
            result += processNormalCss(remainingCss, sortType, 0);
        }
        
        return result.trim();
    } catch (error) {
        throw new Error(getMessage('cssSortingFailed', vscode.env.language).replace('{0}', error.message));
    }
}

function processNormalCss(text, sortType, indentLevel = 0) {
    const blocks = [];
    let depth = 0;
    let startIndex = 0;
    let inSelector = true;
    let currentBlock = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        if (char === '{') {
            depth++;
            inSelector = false;
            currentBlock += char;
        } else if (char === '}') {
            depth--;
            currentBlock += char;
            
            if (depth === 0) {
                blocks.push(currentBlock);
                currentBlock = '';
                inSelector = true;
            }
        } else {
            currentBlock += char;
        }
    }

    const indent = '    '.repeat(indentLevel);
    const propertyIndent = '    '.repeat(indentLevel + 1);

    return blocks.map(block => {
        const selectorEnd = block.indexOf('{');
        const selector = block.substring(0, selectorEnd).trim();
        const content = block.substring(selectorEnd + 1, block.length - 1);

        if (content.includes('{')) {
            const processedContent = processNormalCss(content, sortType, indentLevel + 1);
            return `${indent}${selector} {\n${processedContent}\n${indent}}`;
        } else {
            const sortedProperties = sortProperties(content.trim(), sortType);
            return `${indent}${selector} {\n${propertyIndent}${sortedProperties}\n${indent}}`;
        }
    }).join('\n\n');
}

function sortProperties(properties, sortType, isNested = false) {
    if (!properties) return '';
    
    const propertyList = properties
        .split(';')
        .map(prop => prop.trim())
        .filter(prop => prop.length > 0)
        .map(prop => {
            const [key, ...valueParts] = prop.split(':');
            if (!key || valueParts.length === 0) return null;
            
            const value = valueParts.join(':').trim();
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
            
            return `${key.trim()}: ${formattedValue};`;
        })
        .filter(prop => prop !== null)
        .sort((a, b) => {
            switch(sortType) {
                case 'length-asc':
                    return a.length - b.length;
                case 'length-desc':
                    return b.length - a.length;
                case 'alpha-asc':
                    const propA = a.split(':')[0].trim();
                    const propB = b.split(':')[0].trim();
                    return propA.localeCompare(propB);
                case 'alpha-desc':
                    const propC = a.split(':')[0].trim();
                    const propD = b.split(':')[0].trim();
                    return propD.localeCompare(propC);
                default:
                    return 0;
            }
        });

    const indent = isNested ? '\n        ' : '\n    ';
    return propertyList.join(indent);
}

function handleCssSort(sortType) {
    try {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const document = editor.document;
        const selection = editor.selection;
        const text = document.getText(selection);

        if (text.trim().length === 0) {
            const fullText = document.getText();
            const sortedText = sortCssProperties(fullText, sortType);
            
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(fullText.length)
            );
            
            return editor.edit(editBuilder => {
                editBuilder.replace(fullRange, sortedText);
            });
        }

        const isValidSelection = isValidCssSelection(text);
        if (!isValidSelection.valid) {
            vscode.window.showErrorMessage(`Geçersiz seçim: ${isValidSelection.error}. Lütfen tam bir CSS seçiciyi seçin (örn: ".class { ... }" veya "#id { ... }")`);
            return;
        }

        const sortedText = sortCssProperties(text, sortType);
        return editor.edit(editBuilder => {
            editBuilder.replace(selection, sortedText);
        });

    } catch (error) {
        vscode.window.showErrorMessage(getMessage('cssSortingFailed', vscode.env.language).replace('{0}', error.message));
    }
}

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

function activate(context) {
    let disposableDesc = vscode.commands.registerCommand('csssortify.sortByLength', () => {
        handleCssSort('length-desc');
    });

    let disposableAsc = vscode.commands.registerCommand('csssortify.sortByLengthAsc', () => {
        handleCssSort('length-asc');
    });

    let disposableAlpha = vscode.commands.registerCommand('csssortify.sortAlphabetically', () => {
        handleCssSort('alpha-asc');
    });

    let disposableAlphaDesc = vscode.commands.registerCommand('csssortify.sortAlphabeticallyDesc', () => {
        handleCssSort('alpha-desc');
    });

    context.subscriptions.push(disposableDesc);
    context.subscriptions.push(disposableAsc);
    context.subscriptions.push(disposableAlpha);
    context.subscriptions.push(disposableAlphaDesc);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
