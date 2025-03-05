const { getMessages } = require("../Midware/GetMessage.js");
const { planets } = require("../Utils/Lists.js");
const vscode = require("vscode");

/**
 * Converts selected element's inline style to a class
*/

async function convertSelectedInlineStyleToClass() {
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

    const selection = editor.selection;

    const text = document.getText();

    let selectedText = "";

    if (selection.isEmpty) {
      const lineNumber = selection.active.line;

      const line = document.lineAt(lineNumber);

      selectedText = line.text;
    } else {
      selectedText = document.getText(selection);
    }

    const styleAttributeRegex =
      /<([a-zA-Z][a-zA-Z0-9]*)[^>]*\s+style\s*=\s*["']([^"']*)["'][^>]*>/;

    const match = styleAttributeRegex.exec(selectedText);

    if (!match) {
      vscode.window.showInformationMessage(
        getMessages("noInlineStylesFound", vscode.env.language)
      );

      return;
    }

    const fullMatch = match[0];

    const tagName = match[1];

    const styleContent = match[2].trim();

    if (!styleContent) {
      vscode.window.showInformationMessage(
        getMessages("noInlineStylesFound", vscode.env.language)
      );

      return;
    }

    const randomNumber = Math.floor(Math.random() * 1000) + 1;

    const randomCelestialBody =
      planets[Math.floor(Math.random() * planets.length)];

    const className = `mb${
      randomCelestialBody.charAt(0).toUpperCase() + randomCelestialBody.slice(1)
    }${tagName.charAt(0).toUpperCase() + tagName.slice(1)}${randomNumber}`;

    const cssContent = `.${className} {\n\t${styleContent

      .replace(/;\s*$/, "")

      .replace(/;/g, ";\n\t")}\n}`;

    let newHtmlContent = text;

    let newElement = fullMatch.replace(/\s+style\s*=\s*["'][^"']*["']/g, "");

    if (newElement.includes("class=")) {
      newElement = newElement.replace(
        /class\s*=\s*["']([^"']*)["']/g,

        (match, existingClasses) => {
          return `class="${existingClasses.trim()} ${className}"`;
        }
      );
    } else {
      newElement = newElement.replace(
        /<([a-zA-Z][a-zA-Z0-9]*)/,

        `<$1 class="${className}"`
      );
    }

    newHtmlContent = newHtmlContent.replace(fullMatch, newElement);

    const headMatch = /<head[^>]*>([\s\S]*?)<\/head>/i.exec(newHtmlContent);

    if (!headMatch) {
      vscode.window.showErrorMessage(
        getMessages("noHeadTagFound", vscode.env.language)
      );

      return;
    }

    const headContent = headMatch[1];

    const styleTagMatch = /<style[^>]*>([\s\S]*?)<\/style>/i.exec(headContent);

    if (styleTagMatch) {
      const styleTagContent = styleTagMatch[1];

      const newStyleTagContent = styleTagContent + "\n\t\t" + cssContent;

      newHtmlContent = newHtmlContent.replace(
        styleTagMatch[0],

        `<style>\n${newStyleTagContent}\n\t</style>`
      );
    } else {
      const headEndMatch = /<\/head>/i.exec(newHtmlContent);

      if (headEndMatch) {
        const headEndPos = headEndMatch.index;

        const styleTag = `\t<style>\n\t\t${cssContent}\n\t</style>\n`;

        newHtmlContent =
          newHtmlContent.substring(0, headEndPos) +
          styleTag +
          newHtmlContent.substring(headEndPos);
      }
    }

    const edit = new vscode.WorkspaceEdit();

    edit.replace(
      document.uri,

      new vscode.Range(0, 0, document.lineCount, 0),

      newHtmlContent
    );

    await vscode.workspace.applyEdit(edit);

    vscode.window.showInformationMessage(
      getMessages("selectedInlineStyleConverted", vscode.env.language)
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

module.exports = { convertSelectedInlineStyleToClass };
