const { minifyCssInPlace } = require("./CreateCssMinify.js");
const { getMessages } = require("../Midware/GetMessage.js");
const vscode = require("vscode");

function cssMinifyInPlace() {
  try {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;

    if (document.languageId !== "css") {
      return vscode.window.showErrorMessage(
        getMessages("notCssFile", vscode.env.language)
      );
    }

    const selection = editor.selection;
    let text;
    let range;

    if (selection.isEmpty) {
      text = document.getText();
      range = new vscode.Range(
        document.positionAt(0),
        document.positionAt(text.length)
      );
    } else {
      text = document.getText(selection);
      range = selection;
    }

    const minifiedCss = minifyCssInPlace(text);

    editor
      .edit((editBuilder) => {
        editBuilder.replace(range, minifiedCss);
      })
      .then(() => {
        vscode.window.showInformationMessage(
          getMessages("cssMinifyInPlaceSuccess", vscode.env.language)
        );
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

module.exports = { cssMinifyInPlace };
