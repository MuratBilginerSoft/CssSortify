const { getMessages } = require("../Midware/GetMessage.js");
const { planets } = require("../Utils/Lists.js");
const vscode = require("vscode");

/**
 * Converts inline styles in HTML elements to classes
*/

async function convertInlineStylesToClasses() {
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

    const styleAttributeRegex =
      /<([a-zA-Z][a-zA-Z0-9]*)[^>]*\s+style\s*=\s*["']([^"']*)["'][^>]*>/g;

    let match;
    let inlineStylesFound = false;
    let newHtmlContent = text;
    let cssClasses = {};

    while ((match = styleAttributeRegex.exec(text)) !== null) {
      inlineStylesFound = true;
      const fullMatch = match[0];
      const tagName = match[1];
      const styleContent = match[2].trim();

      if (!styleContent) continue;

      const randomNumber = Math.floor(Math.random() * 10000) + 1;

      const randomCelestialBody =
        planets[Math.floor(Math.random() * planets.length)];

      const className = `mb${
        randomCelestialBody.charAt(0).toUpperCase() +
        randomCelestialBody.slice(1)
      }${tagName.charAt(0).toUpperCase() + tagName.slice(1)}${randomNumber}`;

      cssClasses[className] = styleContent;

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
    }

    if (!inlineStylesFound) {
      vscode.window.showInformationMessage(
        getMessages("noInlineStylesFound", vscode.env.language)
      );
      return;
    }

    let cssContent = "";
    for (const className in cssClasses) {
      cssContent += `.${className} {\n\t${cssClasses[className]
        .replace(/;\s*$/, "")
        .replace(/;/g, ";\n\t")}\n}\n`;
    }

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
      const newStyleTagContent = styleTagContent + "\n" + cssContent;

      newHtmlContent = newHtmlContent.replace(
        styleTagMatch[0],
        `<style>\n${newStyleTagContent}</style>`
      );
    } else {
      const headEndMatch = /<\/head>/i.exec(newHtmlContent);
      if (headEndMatch) {
        const headEndPos = headEndMatch.index;
        const styleTag = `\t<style>\n\t\t${cssContent.replace(
          /\n/g,
          "\n\t\t"
        )}\t</style>\n`;

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
      getMessages("inlineStylesConverted", vscode.env.language)
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

module.exports = { convertInlineStylesToClasses };
