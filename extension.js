//#region Imports
const vscode = require('vscode');
const { getMessage } = require('./messages');

//#endregion

//#region CSS Property Sorting
function sortCssProperties(text, sortType = 'length-desc') {
    try {
        const cssBlocks = text.match(/([^{]+)\s*{\s*([^}]+)}/g) || [];
        
        const sortedCss = cssBlocks.map(block => {
            const selectorMatch = block.match(/([^{]+)\s*{\s*([^}]+)}/);
            if (!selectorMatch) return block;

            const [, selector, properties] = selectorMatch;

            const sortedProperties = properties
                .split(';')
                .map(prop => prop.trim())
                .filter(prop => prop.length > 0)
                .map(prop => {
                    const [key, ...valueParts] = prop.split(':');
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
                        .replace(/\s*\)\s*/g, ') ')
                        .trim();
                    
                    return `${key.trim()}: ${formattedValue}`;
                })
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
                })
                .join(';\n    ');

            return `${selector.trim()} {\n    ${sortedProperties};\n}`;
        }).join('\n\n');

        return sortedCss;
    } catch (error) {
        throw new Error(getMessage('cssSortingFailed', vscode.env.language).replace('{0}', error.message));
    }
}
//#endregion

//#region CSS Handler
function handleCssSort(editor, sortType) {
    if (!editor) {
        vscode.window.showInformationMessage(getMessage('noFileOpen', vscode.env.language));
        return;
    }

    if (editor.document.languageId !== 'css') {
        vscode.window.showInformationMessage(getMessage('notCssFile', vscode.env.language));
        return;
    }

    try {
        const text = editor.selection.isEmpty ? editor.document.getText() : editor.document.getText(editor.selection);
        const sortedCss = sortCssProperties(text, sortType);

        editor.edit(editBuilder => {
            if (editor.selection.isEmpty) {
                const fullRange = new vscode.Range(
                    editor.document.positionAt(0),
                    editor.document.positionAt(editor.document.getText().length)
                );
                editBuilder.replace(fullRange, sortedCss);
            } else {
                editBuilder.replace(editor.selection, sortedCss);
            }
        });

        let successMessage;
        switch(sortType) {
            case 'length-desc':
                successMessage = 'sortLengthDesc';
                break;
            case 'length-asc':
                successMessage = 'sortLengthAsc';
                break;
            case 'alpha-asc':
                successMessage = 'sortAlphaAsc';
                break;
            case 'alpha-desc':
                successMessage = 'sortAlphaDesc';
                break;
        }
        vscode.window.showInformationMessage(getMessage(successMessage, vscode.env.language));
    } catch (error) {
        vscode.window.showErrorMessage(error.message);
    }
}
//#endregion

//#region Extension Lifecycle
function activate(context) {
    let disposableDesc = vscode.commands.registerCommand('csssortify.sortByLength', () => {
        handleCssSort(vscode.window.activeTextEditor, 'length-desc');
    });

    let disposableAsc = vscode.commands.registerCommand('csssortify.sortByLengthAsc', () => {
        handleCssSort(vscode.window.activeTextEditor, 'length-asc');
    });

    let disposableAlpha = vscode.commands.registerCommand('csssortify.sortAlphabetically', () => {
        handleCssSort(vscode.window.activeTextEditor, 'alpha-asc');
    });

    let disposableAlphaDesc = vscode.commands.registerCommand('csssortify.sortAlphabeticallyDesc', () => {
        handleCssSort(vscode.window.activeTextEditor, 'alpha-desc');
    });

    context.subscriptions.push(disposableDesc);
    context.subscriptions.push(disposableAsc);
    context.subscriptions.push(disposableAlpha);
    context.subscriptions.push(disposableAlphaDesc);
}

function deactivate() {}
//#endregion

//#region Exports
module.exports = {
    activate,
    deactivate
}
//#endregion
