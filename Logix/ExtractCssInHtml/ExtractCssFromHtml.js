const { processHtmlStyleTags } = require("./ProcessHtmlStyleTags.js");
const { getMessages } = require("../Midware/GetMessage.js");
const vscode = require("vscode");
const path = require("path");

/**
 * Extracts all CSS from style tags in an HTML file and creates a separate CSS file
 */

async function extractCssFromHtml() {
  try {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const languageId = document.languageId;

    if (languageId !== "html" && languageId !== "htm") {
      return vscode.window.showErrorMessage(
        getMessages("notHtmlFile", vscode.env.language)
      );
    }

    const text = document.getText();

    const processed = processHtmlStyleTags(text, languageId);

    if (processed.styleTagRanges.length === 0) {
      vscode.window.showInformationMessage(
        getMessages("noStyleTagsFound", vscode.env.language)
      );
      return;
    }

    let allCssContent = "";
    for (const range of processed.styleTagRanges) {
      allCssContent += `/* CSS from style tag at line ${
        document.positionAt(range.fullMatchStart).line + 1
      } */\n`;
      allCssContent += range.content.trim() + "\n\n";
    }

    const filePath = document.uri.fsPath;
    const fileDir = path.dirname(filePath);
    const fileName = path.basename(filePath, path.extname(filePath));

    const userFileName = await vscode.window.showInputBox({
      prompt: "CSS dosyası için isim girin",
      placeHolder: `${fileName}.css`,
      value: `${fileName}.css`,
    });

    let cssFileName;
    if (!userFileName) {
      const randomStr = Math.random().toString(36).substring(2, 8);
      cssFileName = `${fileName}_${randomStr}.css`;
    } else {
      cssFileName = userFileName.endsWith(".css")
        ? userFileName
        : `${userFileName}.css`;
    }

    const cssFilePath = path.join(fileDir, cssFileName);

    const fs = require("fs");
    fs.writeFileSync(cssFilePath, allCssContent);

    let newHtmlContent = text;

    for (let i = processed.styleTagRanges.length - 1; i >= 0; i--) {
      const range = processed.styleTagRanges[i];
      newHtmlContent =
        newHtmlContent.substring(0, range.fullMatchStart) +
        newHtmlContent.substring(range.fullMatchEnd);
    }

    const headEndMatch = /<\/head>/i.exec(newHtmlContent);
    if (!headEndMatch) {
      vscode.window.showErrorMessage(
        getMessages("noHeadTagFound", vscode.env.language)
      );
      return;
    }

    const headEndPos = headEndMatch.index;
    const linkTag = `\t<link rel="stylesheet" href="${cssFileName}">\n`;

    newHtmlContent =
      newHtmlContent.substring(0, headEndPos) +
      linkTag +
      newHtmlContent.substring(headEndPos);

    const edit = new vscode.WorkspaceEdit();
    edit.replace(
      document.uri,
      new vscode.Range(0, 0, document.lineCount, 0),
      newHtmlContent
    );
    await vscode.workspace.applyEdit(edit);

    vscode.workspace.openTextDocument(cssFilePath).then((doc) => {
      vscode.window.showTextDocument(doc);
    });

    vscode.window.showInformationMessage(
      getMessages("cssExtractSuccess", vscode.env.language).replace(
        "{0}",
        cssFileName
      )
    );
  } catch (error) {
    vscode.window.showErrorMessage(
      getMessages("cssExtractFailed", vscode.env.language).replace(
        "{0}",
        error.message
      )
    );
  }
}

module.exports = { extractCssFromHtml };
