const { minifyCssFile } = require("./CreateCssMinify.js");
const { getMessages } = require("../Midware/GetMessage.js");
const vscode = require("vscode");

/**
 * Minifies the current CSS file and saves it as a .min.css file
 */

function cssMinifyExportFile() {
  try {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;

    if (document.languageId !== "css") {
      return vscode.window.showErrorMessage(
        getMessages("notCssFile", vscode.env.language)
      );
    }

    const filePath = document.uri.fsPath;

    const outputFilePath = minifyCssFile(filePath);

    vscode.window.showInformationMessage(
      getMessages("cssMinifySuccess", vscode.env.language).replace(
        "{0}",
        outputFilePath
      )
    );

    vscode.workspace.openTextDocument(outputFilePath).then((doc) => {
      vscode.window.showTextDocument(doc);
    });
  } catch (error) {
    vscode.window.showErrorMessage(
      getMessages("cssMinifyFailed", vscode.env.language).replace(
        "{0}",
        error.message
      )
    );
  }
}

module.exports = { cssMinifyExportFile };
