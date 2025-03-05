// @ts-nocheck

const vscode = require("vscode");
const { convertSelectedInlineStyleToClass } = require("./Logix/CssInHtml/ConvertSelectedInlineStyleToClass.js");
const { convertInlineStylesToClasses } = require("./Logix/CssInHtml/ConvertInlineStylesToClasses.js");
const { cssMinifyExportFile } = require("./Logix/CssMinify/CssMinifyExportFile.js");
const { extractCssFromHtml } = require("./Logix/ExtractCssInHtml/ExtractCssFromHtml.js");
const { cssMinifyInPlace } = require("./Logix/CssMinify/CssMinifyInPlace.js");
const { cssSort } = require("./Logix/Sorting/CssSort.js");

/**
 * Activates the extension
 * @param {vscode.ExtensionContext} context - Extension context
*/

function activate(context) {
  let disposableDesc = vscode.commands.registerCommand(
    "csssortify.sortByLength",
    () => {
      cssSort("length-desc");
    }
  );

  let disposableAsc = vscode.commands.registerCommand(
    "csssortify.sortByLengthAsc",
    () => {
      cssSort("length-asc");
    }
  );

  let disposableAlpha = vscode.commands.registerCommand(
    "csssortify.sortAlphabetically",
    () => {
      cssSort("alpha-asc");
    }
  );

  let disposableAlphaDesc = vscode.commands.registerCommand(
    "csssortify.sortAlphabeticallyDesc",
    () => {
      cssSort("alpha-desc");
    }
  );

  let disposableCategory = vscode.commands.registerCommand(
    "csssortify.sortByCategory",
    () => {
      cssSort("category");
    }
  );

  let disposableCategoryWithSpacing = vscode.commands.registerCommand(
    "csssortify.sortByCategoryWithSpacing",
    () => {
      cssSort("category-with-spacing");
    }
  );

  let disposableExtractCss = vscode.commands.registerCommand(
    "csssortify.extractCssFromHtml",
    () => {
      extractCssFromHtml();
    }
  );

  let disposableMinify = vscode.commands.registerCommand(
    "csssortify.minifyCss",
    () => {
      cssMinifyExportFile();
    }
  );

  let disposableMinifyInPlace = vscode.commands.registerCommand(
    "csssortify.minifyCssInPlace",
    () => {
      cssMinifyInPlace();
    }
  );

  let disposableConvertInlineStyles = vscode.commands.registerCommand(
    "csssortify.convertInlineStylesToClasses",
    () => {
      convertInlineStylesToClasses();
    }
  );

  let disposableConvertSelectedInlineStyleToClass =
    vscode.commands.registerCommand(
      "csssortify.convertSelectedInlineStyleToClass",
      () => {
        convertSelectedInlineStyleToClass();
      }
    );

  context.subscriptions.push(disposableDesc);
  context.subscriptions.push(disposableAsc);
  context.subscriptions.push(disposableAlpha);
  context.subscriptions.push(disposableAlphaDesc);
  context.subscriptions.push(disposableCategory);
  context.subscriptions.push(disposableCategoryWithSpacing);
  context.subscriptions.push(disposableExtractCss);
  context.subscriptions.push(disposableMinify);
  context.subscriptions.push(disposableMinifyInPlace);
  context.subscriptions.push(disposableConvertInlineStyles);
  context.subscriptions.push(disposableConvertSelectedInlineStyleToClass);
}

/**
 * Deactivates the extension
*/

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
