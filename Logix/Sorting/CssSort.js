const { processHtmlStyleTags } = require("../ExtractCssInHtml/ProcessHtmlStyleTags.js");
const { applyChangesToStyleTags } = require("../ExtractCssInHtml/ApplyChangesToStyleTags.js");
const { isValidCssSelection } = require("../Midware/CssValidator.js");
const { sortCssProperties } = require("./SetupCssProperties.js");
const { getMessages } = require("../Midware/GetMessage.js");
const vscode = require("vscode");

/**
 * Handles CSS sorting based on the selected sort type
 * @param {string} sortType - Type of sorting to apply
 */
async function cssSort(sortType) {
  try {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const languageId = document.languageId;
    const selection = editor.selection;
    const text = document.getText(selection);

    if (text.trim().length === 0) {
      const fullText = document.getText();
      const processed = processHtmlStyleTags(fullText, languageId);

      if (processed.isHtml) {
        if (processed.styleTagRanges.length === 0) {
          vscode.window.showInformationMessage(
            getMessages("noStyleTagsFound", vscode.env.language)
          );
          return;
        }

        const sortedText = applyChangesToStyleTags(
          processed.text,
          processed.styleTagRanges,
          (cssContent) => sortCssProperties(cssContent, sortType)
        );

        const edit = new vscode.WorkspaceEdit();
        edit.replace(
          document.uri,
          new vscode.Range(0, 0, document.lineCount, 0),
          sortedText
        );
        await vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage(
          getMessages("sortSuccess", vscode.env.language)
        );
      } else {
        const sortedText = sortCssProperties(fullText, sortType);
        const edit = new vscode.WorkspaceEdit();
        edit.replace(
          document.uri,
          new vscode.Range(0, 0, document.lineCount, 0),
          sortedText
        );
        await vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage(
          getMessages("sortSuccess", vscode.env.language)
        );
      }
    } else {
      if (languageId === "css") {
        const isValidSelection = isValidCssSelection(text);
        if (!isValidSelection.valid) {
          vscode.window.showErrorMessage(
            `Geçersiz seçim: ${isValidSelection.error}. Lütfen tam bir CSS seçiciyi seçin (örn: ".class { ... }" veya "#id { ... }")`
          );
          return;
        }
      }

      const processed = processHtmlStyleTags(text, languageId);
      let sortedText;

      if (processed.isHtml && processed.styleTagRanges.length > 0) {
        sortedText = applyChangesToStyleTags(
          processed.text,
          processed.styleTagRanges,
          (cssContent) => sortCssProperties(cssContent, sortType)
        );
      } else {
        sortedText = sortCssProperties(text, sortType);
      }

      await editor.edit((editBuilder) => {
        editBuilder.replace(selection, sortedText);
      });

      vscode.window.showInformationMessage(
        getMessages("sortSuccess", vscode.env.language)
      );
    }
  } catch (error) {
    vscode.window.showErrorMessage(
      getMessages("cssSortingFailed", vscode.env.language).replace(
        "{0}",
        error.message
      )
    );
  }
}

module.exports = { cssSort };
