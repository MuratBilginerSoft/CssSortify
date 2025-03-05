const vscode = require("vscode");
const { sortCssProperties } = require("./pages/cssSort");
const { isValidCssSelection } = require("./pages/cssValidator");
const { minifyCssFile, minifyCssInPlace } = require("./pages/minify");
const path = require("path");

// Localization messages
const messages = {
  en: {
    sortSuccess: "CSS properties sorted successfully!",
    notCssFile: "This is not a CSS file.",
    notHtmlFile: "This is not an HTML file.",
    noStyleTagsFound: "No style tags found in the HTML file.",
    noHeadTagFound: "No head tag found in the HTML file.",
    cssExtractSuccess: "CSS extracted successfully to {0}",
    cssExtractFailed: "Failed to extract CSS: {0}",
    noInlineStylesFound: "No inline styles found in the HTML file.",
    inlineStylesConverted: "Inline styles converted to classes successfully!",
    selectedInlineStyleConverted:
      "Selected element's inline style converted to class successfully!",
    minifySuccess: "CSS minified successfully!",
    minifySaveSuccess: "Minified CSS saved to {0}",
    minifyFailed: "Failed to minify CSS: {0}",
    cssSortingFailed: "CSS sorting failed: {0}",
    cssSortFailed: "CSS sorting failed: {0}",
    cssMinifySuccess: "CSS minified successfully and saved to {0}",
    cssMinifyInPlaceSuccess: "CSS minified successfully in-place",
    cssMinifyFailed: "Failed to minify CSS: {0}",
  },
  tr: {
    sortSuccess: "CSS özellikleri başarıyla sıralandı!",
    notCssFile: "Bu bir CSS dosyası değil.",
    notHtmlFile: "Bu bir HTML dosyası değil.",
    noStyleTagsFound: "HTML dosyasında style etiketi bulunamadı.",
    noHeadTagFound: "HTML dosyasında head etiketi bulunamadı.",
    cssExtractSuccess: "CSS başarıyla {0} dosyasına çıkarıldı",
    cssExtractFailed: "CSS çıkarma başarısız: {0}",
    noInlineStylesFound: "HTML dosyasında inline style bulunamadı.",
    inlineStylesConverted:
      "Inline style'lar başarıyla class'lara dönüştürüldü!",
    selectedInlineStyleConverted:
      "Seçili elementin inline style'ı başarıyla class'a dönüştürüldü!",
    minifySuccess: "CSS başarıyla küçültüldü!",
    minifySaveSuccess: "Küçültülmüş CSS {0} dosyasına kaydedildi",
    minifyFailed: "CSS küçültme başarısız: {0}",
    cssSortingFailed: "CSS sıralama başarısız: {0}",
    cssSortFailed: "CSS sıralama başarısız: {0}",
    cssMinifySuccess: "CSS başarıyla küçültüldü ve {0} dosyasına kaydedildi",
    cssMinifyInPlaceSuccess: "CSS başarıyla yerinde küçültüldü",
    cssMinifyFailed: "CSS küçültme başarısız: {0}",
  },
};

/**
 * @param {string} key - Message key
 * @param {string} language - Language code
 * @returns {string} - Localized message
 */
function getMessage(key, language) {
  const lang = language && messages[language] ? language : "en";
  return messages[lang][key] || messages["en"][key] || key;
}

/**
 * Extracts CSS content from HTML style tags if in HTML file, otherwise returns the original text
 * @param {string} text - The text to process
 * @param {string} languageId - The language ID of the document
 * @returns {Object} Object containing processed text and positions
 */
function processHtmlStyleTags(text, languageId) {
  if (languageId !== "html" && languageId !== "htm") {
    return {
      text,
      isHtml: false,
      styleTagRanges: [],
    };
  }

  const styleTagRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let match;
  let styleTagRanges = [];

  while ((match = styleTagRegex.exec(text)) !== null) {
    const fullMatch = match[0];
    const openTagEndIndex = fullMatch.indexOf(">") + 1;
    const closeTagStartIndex = fullMatch.lastIndexOf("<");

    // Get the content between the opening and closing style tags
    const content = match[1];

    // Get the opening style tag with any attributes
    const openTag = fullMatch.substring(0, openTagEndIndex);

    // Get the closing style tag
    const closeTag = fullMatch.substring(closeTagStartIndex);

    // Check if the style tag is already properly indented
    const lineStart = text.lastIndexOf("\n", match.index) + 1;
    const indentation = text.substring(lineStart, match.index);

    styleTagRanges.push({
      start: match.index + openTagEndIndex,
      end: match.index + closeTagStartIndex,
      content: content,
      openTag: openTag,
      closeTag: closeTag,
      fullMatchStart: match.index,
      fullMatchEnd: match.index + fullMatch.length,
      indentation: indentation,
    });
  }

  return {
    text,
    isHtml: true,
    styleTagRanges,
  };
}

/**
 * Applies changes to style tags in HTML content
 * @param {string} originalText - The original HTML text
 * @param {Array} styleTagRanges - Array of style tag ranges
 * @param {Function} transformFn - Function to transform CSS content
 * @returns {string} - The modified HTML text
 */
function applyChangesToStyleTags(originalText, styleTagRanges, transformFn) {
  if (styleTagRanges.length === 0) {
    return originalText;
  }

  let result = originalText;
  let offset = 0;

  for (const range of styleTagRanges) {
    const originalContent = range.content;
    let transformedContent = transformFn(originalContent);

    // Get the desired indentation for the style tag (1 tab)
    const desiredIndentation = "\t";

    // Indent each line with a tab for CSS content (2 tabs total)
    transformedContent = transformedContent
      .split("\n")
      .map((line) => (line.trim() ? desiredIndentation + "\t" + line : line))
      .join("\n");

    // Ensure the transformed content starts with a newline if it doesn't already
    if (transformedContent.length > 0 && !transformedContent.startsWith("\n")) {
      transformedContent = "\n" + transformedContent;
    }

    // Ensure the transformed content ends with a newline if it doesn't already
    if (transformedContent.length > 0 && !transformedContent.endsWith("\n")) {
      transformedContent = transformedContent + "\n";
    }

    // Add the desired indentation before the closing style tag
    transformedContent = transformedContent + desiredIndentation;

    // Adjust for any changes in length
    const startPos = range.start + offset;
    const endPos = range.end + offset;

    result =
      result.substring(0, startPos) +
      transformedContent +
      result.substring(endPos);
    offset += transformedContent.length - originalContent.length;

    // Now handle the style tag indentation if needed
    const currentIndentation = range.indentation || "";
    if (currentIndentation !== desiredIndentation) {
      // Get the full match with updated offset
      const fullMatchStart = range.fullMatchStart + offset;
      const fullMatchEnd = range.fullMatchEnd + offset;

      // Get the line start for the opening style tag
      const lineStart = result.lastIndexOf("\n", fullMatchStart) + 1;

      // Replace the indentation
      const beforeStyle = result.substring(0, lineStart);
      const afterStyle = result.substring(lineStart);

      // Remove current indentation and add desired indentation
      const reindentedAfterStyle = afterStyle.replace(
        currentIndentation + range.openTag,
        desiredIndentation + range.openTag
      );

      result = beforeStyle + reindentedAfterStyle;

      // Update offset for the indentation change
      offset += desiredIndentation.length - currentIndentation.length;
    }
  }

  return result;
}

/**
 * Handles CSS sorting based on the selected sort type
 * @param {string} sortType - Type of sorting to apply
 */
async function handleCssSort(sortType) {
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
            getMessage("noStyleTagsFound", vscode.env.language)
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
          getMessage("sortSuccess", vscode.env.language)
        );
      } else {
        // Regular CSS file
        const sortedText = sortCssProperties(fullText, sortType);
        const edit = new vscode.WorkspaceEdit();
        edit.replace(
          document.uri,
          new vscode.Range(0, 0, document.lineCount, 0),
          sortedText
        );
        await vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage(
          getMessage("sortSuccess", vscode.env.language)
        );
      }
    } else {
      // Validate selection only for CSS files, not for HTML
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
        getMessage("sortSuccess", vscode.env.language)
      );
    }
  } catch (error) {
    vscode.window.showErrorMessage(
      getMessage("cssSortingFailed", vscode.env.language).replace(
        "{0}",
        error.message
      )
    );
  }
}

/**
 * Handles sorting CSS properties by length in descending order
 * @param {vscode.TextEditor} editor - The active text editor
 */
async function handleCssSortByLength(editor) {
  try {
    const document = editor.document;
    const languageId = document.languageId;

    if (editor.selection.isEmpty) {
      // No selection, sort the entire document
      const text = document.getText();
      const processed = processHtmlStyleTags(text, languageId);

      if (processed.isHtml) {
        if (processed.styleTagRanges.length === 0) {
          vscode.window.showInformationMessage(
            getMessage("noStyleTagsFound", vscode.env.language)
          );
          return;
        }

        const newText = applyChangesToStyleTags(
          processed.text,
          processed.styleTagRanges,
          (cssContent) => sortCssProperties(cssContent, "length-desc")
        );

        const edit = new vscode.WorkspaceEdit();
        edit.replace(
          document.uri,
          new vscode.Range(0, 0, document.lineCount, 0),
          newText
        );
        await vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage(
          getMessage("sortSuccess", vscode.env.language)
        );
      } else {
        // Regular CSS file
        const newText = sortCssProperties(text, "length-desc");
        const edit = new vscode.WorkspaceEdit();
        edit.replace(
          document.uri,
          new vscode.Range(0, 0, document.lineCount, 0),
          newText
        );
        await vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage(
          getMessage("sortSuccess", vscode.env.language)
        );
      }
    } else {
      // Sort only the selected text
      const selection = editor.selection;
      const text = document.getText(selection);

      const processed = processHtmlStyleTags(text, languageId);
      let newText;

      if (processed.isHtml && processed.styleTagRanges.length > 0) {
        newText = applyChangesToStyleTags(
          processed.text,
          processed.styleTagRanges,
          (cssContent) => sortCssProperties(cssContent, "length-desc")
        );
      } else {
        newText = sortCssProperties(text, "length-desc");
      }

      await editor.edit((editBuilder) => {
        editBuilder.replace(selection, newText);
      });

      vscode.window.showInformationMessage(
        getMessage("sortSuccess", vscode.env.language)
      );
    }
  } catch (error) {
    vscode.window.showErrorMessage(
      getMessage("cssSortFailed", vscode.env.language) + error.message
    );
  }
}

/**
 * Handles sorting CSS properties by length in ascending order
 * @param {vscode.TextEditor} editor - The active text editor
 */
async function handleCssSortByLengthAsc(editor) {
  try {
    const document = editor.document;
    const languageId = document.languageId;

    if (editor.selection.isEmpty) {
      // No selection, sort the entire document
      const text = document.getText();
      const processed = processHtmlStyleTags(text, languageId);

      if (processed.isHtml) {
        if (processed.styleTagRanges.length === 0) {
          vscode.window.showInformationMessage(
            getMessage("noStyleTagsFound", vscode.env.language)
          );
          return;
        }

        const newText = applyChangesToStyleTags(
          processed.text,
          processed.styleTagRanges,
          (cssContent) => sortCssProperties(cssContent, "length-asc")
        );

        const edit = new vscode.WorkspaceEdit();
        edit.replace(
          document.uri,
          new vscode.Range(0, 0, document.lineCount, 0),
          newText
        );
        await vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage(
          getMessage("sortSuccess", vscode.env.language)
        );
      } else {
        // Regular CSS file
        const newText = sortCssProperties(text, "length-asc");
        const edit = new vscode.WorkspaceEdit();
        edit.replace(
          document.uri,
          new vscode.Range(0, 0, document.lineCount, 0),
          newText
        );
        await vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage(
          getMessage("sortSuccess", vscode.env.language)
        );
      }
    } else {
      // Sort only the selected text
      const selection = editor.selection;
      const text = document.getText(selection);

      const processed = processHtmlStyleTags(text, languageId);
      let newText;

      if (processed.isHtml && processed.styleTagRanges.length > 0) {
        newText = applyChangesToStyleTags(
          processed.text,
          processed.styleTagRanges,
          (cssContent) => sortCssProperties(cssContent, "length-asc")
        );
      } else {
        newText = sortCssProperties(text, "length-asc");
      }

      await editor.edit((editBuilder) => {
        editBuilder.replace(selection, newText);
      });

      vscode.window.showInformationMessage(
        getMessage("sortSuccess", vscode.env.language)
      );
    }
  } catch (error) {
    vscode.window.showErrorMessage(
      getMessage("cssSortFailed", vscode.env.language) + error.message
    );
  }
}

/**
 * Handles sorting CSS properties alphabetically (A-Z)
 * @param {vscode.TextEditor} editor - The active text editor
 */
async function handleCssSortAlphabetically(editor) {
  try {
    const document = editor.document;
    const languageId = document.languageId;

    if (editor.selection.isEmpty) {
      // No selection, sort the entire document
      const text = document.getText();
      const processed = processHtmlStyleTags(text, languageId);

      if (processed.isHtml) {
        if (processed.styleTagRanges.length === 0) {
          vscode.window.showInformationMessage(
            getMessage("noStyleTagsFound", vscode.env.language)
          );
          return;
        }

        const newText = applyChangesToStyleTags(
          processed.text,
          processed.styleTagRanges,
          (cssContent) => sortCssProperties(cssContent, "alpha-asc")
        );

        const edit = new vscode.WorkspaceEdit();
        edit.replace(
          document.uri,
          new vscode.Range(0, 0, document.lineCount, 0),
          newText
        );
        await vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage(
          getMessage("sortSuccess", vscode.env.language)
        );
      } else {
        // Regular CSS file
        const newText = sortCssProperties(text, "alpha-asc");
        const edit = new vscode.WorkspaceEdit();
        edit.replace(
          document.uri,
          new vscode.Range(0, 0, document.lineCount, 0),
          newText
        );
        await vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage(
          getMessage("sortSuccess", vscode.env.language)
        );
      }
    } else {
      // Sort only the selected text
      const selection = editor.selection;
      const text = document.getText(selection);

      const processed = processHtmlStyleTags(text, languageId);
      let newText;

      if (processed.isHtml && processed.styleTagRanges.length > 0) {
        newText = applyChangesToStyleTags(
          processed.text,
          processed.styleTagRanges,
          (cssContent) => sortCssProperties(cssContent, "alpha-asc")
        );
      } else {
        newText = sortCssProperties(text, "alpha-asc");
      }

      await editor.edit((editBuilder) => {
        editBuilder.replace(selection, newText);
      });

      vscode.window.showInformationMessage(
        getMessage("sortSuccess", vscode.env.language)
      );
    }
  } catch (error) {
    vscode.window.showErrorMessage(
      getMessage("cssSortFailed", vscode.env.language) + error.message
    );
  }
}

/**
 * Handles sorting CSS properties alphabetically in descending order (Z-A)
 * @param {vscode.TextEditor} editor - The active text editor
 */
async function handleCssSortAlphabeticallyDesc(editor) {
  try {
    const document = editor.document;
    const languageId = document.languageId;

    if (editor.selection.isEmpty) {
      // No selection, sort the entire document
      const text = document.getText();
      const processed = processHtmlStyleTags(text, languageId);

      if (processed.isHtml) {
        if (processed.styleTagRanges.length === 0) {
          vscode.window.showInformationMessage(
            getMessage("noStyleTagsFound", vscode.env.language)
          );
          return;
        }

        const newText = applyChangesToStyleTags(
          processed.text,
          processed.styleTagRanges,
          (cssContent) => sortCssProperties(cssContent, "alpha-desc")
        );

        const edit = new vscode.WorkspaceEdit();
        edit.replace(
          document.uri,
          new vscode.Range(0, 0, document.lineCount, 0),
          newText
        );
        await vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage(
          getMessage("sortSuccess", vscode.env.language)
        );
      } else {
        // Regular CSS file
        const newText = sortCssProperties(text, "alpha-desc");
        const edit = new vscode.WorkspaceEdit();
        edit.replace(
          document.uri,
          new vscode.Range(0, 0, document.lineCount, 0),
          newText
        );
        await vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage(
          getMessage("sortSuccess", vscode.env.language)
        );
      }
    } else {
      // Sort only the selected text
      const selection = editor.selection;
      const text = document.getText(selection);

      // Validate selection only for CSS files, not for HTML
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
      let newText;

      if (processed.isHtml && processed.styleTagRanges.length > 0) {
        newText = applyChangesToStyleTags(
          processed.text,
          processed.styleTagRanges,
          (cssContent) => sortCssProperties(cssContent, "alpha-desc")
        );
      } else {
        newText = sortCssProperties(text, "alpha-desc");
      }

      await editor.edit((editBuilder) => {
        editBuilder.replace(selection, newText);
      });

      vscode.window.showInformationMessage(
        getMessage("sortSuccess", vscode.env.language)
      );
    }
  } catch (error) {
    vscode.window.showErrorMessage(
      getMessage("cssSortFailed", vscode.env.language) + error.message
    );
  }
}

/**
 * Handles sorting CSS properties by category
 * @param {vscode.TextEditor} editor - The active text editor
 */
async function handleCssSortByCategory(editor) {
  try {
    const document = editor.document;
    const languageId = document.languageId;

    if (editor.selection.isEmpty) {
      // No selection, sort the entire document
      const text = document.getText();
      const processed = processHtmlStyleTags(text, languageId);

      if (processed.isHtml) {
        if (processed.styleTagRanges.length === 0) {
          vscode.window.showInformationMessage(
            getMessage("noStyleTagsFound", vscode.env.language)
          );
          return;
        }

        const newText = applyChangesToStyleTags(
          processed.text,
          processed.styleTagRanges,
          (cssContent) => sortCssProperties(cssContent, "category")
        );

        const edit = new vscode.WorkspaceEdit();
        edit.replace(
          document.uri,
          new vscode.Range(0, 0, document.lineCount, 0),
          newText
        );
        await vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage(
          getMessage("sortSuccess", vscode.env.language)
        );
      } else {
        // Regular CSS file
        const newText = sortCssProperties(text, "category");
        const edit = new vscode.WorkspaceEdit();
        edit.replace(
          document.uri,
          new vscode.Range(0, 0, document.lineCount, 0),
          newText
        );
        await vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage(
          getMessage("sortSuccess", vscode.env.language)
        );
      }
    } else {
      // Sort only the selected text
      const selection = editor.selection;
      const text = document.getText(selection);

      // Validate selection only for CSS files, not for HTML
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
      let newText;

      if (processed.isHtml && processed.styleTagRanges.length > 0) {
        newText = applyChangesToStyleTags(
          processed.text,
          processed.styleTagRanges,
          (cssContent) => sortCssProperties(cssContent, "category")
        );
      } else {
        newText = sortCssProperties(text, "category");
      }

      await editor.edit((editBuilder) => {
        editBuilder.replace(selection, newText);
      });

      vscode.window.showInformationMessage(
        getMessage("sortSuccess", vscode.env.language)
      );
    }
  } catch (error) {
    vscode.window.showErrorMessage(
      getMessage("cssSortFailed", vscode.env.language) + error.message
    );
  }
}

/**
 * Handles sorting CSS properties by category with spacing
 * @param {vscode.TextEditor} editor - The active text editor
 */
async function handleCssSortByCategoryWithSpacing(editor) {
  try {
    const document = editor.document;
    const languageId = document.languageId;

    if (editor.selection.isEmpty) {
      // No selection, sort the entire document
      const text = document.getText();
      const processed = processHtmlStyleTags(text, languageId);

      if (processed.isHtml) {
        if (processed.styleTagRanges.length === 0) {
          vscode.window.showInformationMessage(
            getMessage("noStyleTagsFound", vscode.env.language)
          );
          return;
        }

        const newText = applyChangesToStyleTags(
          processed.text,
          processed.styleTagRanges,
          (cssContent) => sortCssProperties(cssContent, "category-with-spacing")
        );

        const edit = new vscode.WorkspaceEdit();
        edit.replace(
          document.uri,
          new vscode.Range(0, 0, document.lineCount, 0),
          newText
        );
        await vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage(
          getMessage("sortSuccess", vscode.env.language)
        );
      } else {
        // Regular CSS file
        const newText = sortCssProperties(text, "category-with-spacing");
        const edit = new vscode.WorkspaceEdit();
        edit.replace(
          document.uri,
          new vscode.Range(0, 0, document.lineCount, 0),
          newText
        );
        await vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage(
          getMessage("sortSuccess", vscode.env.language)
        );
      }
    } else {
      // Sort only the selected text
      const selection = editor.selection;
      const text = document.getText(selection);

      // Validate selection only for CSS files, not for HTML
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
      let newText;

      if (processed.isHtml && processed.styleTagRanges.length > 0) {
        newText = applyChangesToStyleTags(
          processed.text,
          processed.styleTagRanges,
          (cssContent) => sortCssProperties(cssContent, "category-with-spacing")
        );
      } else {
        newText = sortCssProperties(text, "category-with-spacing");
      }

      await editor.edit((editBuilder) => {
        editBuilder.replace(selection, newText);
      });

      vscode.window.showInformationMessage(
        getMessage("sortSuccess", vscode.env.language)
      );
    }
  } catch (error) {
    vscode.window.showErrorMessage(
      getMessage("cssSortFailed", vscode.env.language) + error.message
    );
  }
}

/**
 * Extracts all CSS from style tags in an HTML file and creates a separate CSS file
 */
async function handleExtractCssFromHtml() {
  try {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const languageId = document.languageId;

    // Check if the file is an HTML file
    if (languageId !== "html" && languageId !== "htm") {
      return vscode.window.showErrorMessage(
        getMessage("notHtmlFile", vscode.env.language)
      );
    }

    const text = document.getText();

    const processed = processHtmlStyleTags(text, languageId);

    if (processed.styleTagRanges.length === 0) {
      vscode.window.showInformationMessage(
        getMessage("noStyleTagsFound", vscode.env.language)
      );
      return;
    }

    // Extract all CSS content from style tags
    let allCssContent = "";
    for (const range of processed.styleTagRanges) {
      // Add a comment to indicate which style tag this CSS came from
      allCssContent += `/* CSS from style tag at line ${
        document.positionAt(range.fullMatchStart).line + 1
      } */\n`;
      allCssContent += range.content.trim() + "\n\n";
    }

    // Get the file path and directory
    const filePath = document.uri.fsPath;
    const fileDir = path.dirname(filePath);
    const fileName = path.basename(filePath, path.extname(filePath));

    // Ask user for the CSS file name
    const userFileName = await vscode.window.showInputBox({
      prompt: "CSS dosyası için isim girin",
      placeHolder: `${fileName}.css`,
      value: `${fileName}.css`,
    });

    // If user cancels, generate a random name
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
        getMessage("noHeadTagFound", vscode.env.language)
      );
      return;
    }

    const headEndPos = headEndMatch.index;
    const linkTag = `\t<link rel="stylesheet" href="${cssFileName}">\n`;

    newHtmlContent =
      newHtmlContent.substring(0, headEndPos) +
      linkTag +
      newHtmlContent.substring(headEndPos);

    // Apply the changes to the document
    const edit = new vscode.WorkspaceEdit();
    edit.replace(
      document.uri,
      new vscode.Range(0, 0, document.lineCount, 0),
      newHtmlContent
    );
    await vscode.workspace.applyEdit(edit);

    // Open the new CSS file
    vscode.workspace.openTextDocument(cssFilePath).then((doc) => {
      vscode.window.showTextDocument(doc);
    });

    vscode.window.showInformationMessage(
      getMessage("cssExtractSuccess", vscode.env.language).replace(
        "{0}",
        cssFileName
      )
    );
  } catch (error) {
    vscode.window.showErrorMessage(
      getMessage("cssExtractFailed", vscode.env.language).replace(
        "{0}",
        error.message
      )
    );
  }
}

/**
 * Minifies the current CSS file and saves it as a .min.css file
 */
function handleCssMinify() {
  try {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;

    // Check if the file is a CSS file
    if (document.languageId !== "css") {
      return vscode.window.showErrorMessage(
        getMessage("notCssFile", vscode.env.language)
      );
    }

    // Get the file path
    const filePath = document.uri.fsPath;

    // Minify the CSS file
    const outputFilePath = minifyCssFile(filePath);

    // Show success message
    vscode.window.showInformationMessage(
      getMessage("cssMinifySuccess", vscode.env.language).replace(
        "{0}",
        outputFilePath
      )
    );

    // Open the minified file
    vscode.workspace.openTextDocument(outputFilePath).then((doc) => {
      vscode.window.showTextDocument(doc);
    });
  } catch (error) {
    vscode.window.showErrorMessage(
      getMessage("cssMinifyFailed", vscode.env.language).replace(
        "{0}",
        error.message
      )
    );
  }
}

/**
 * Minifies the CSS content in-place
 */
function handleCssMinifyInPlace() {
  try {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;

    // Check if the file is a CSS file
    if (document.languageId !== "css") {
      return vscode.window.showErrorMessage(
        getMessage("notCssFile", vscode.env.language)
      );
    }

    // Get the selected text or the entire document
    const selection = editor.selection;
    let text;
    let range;

    if (selection.isEmpty) {
      // If no text is selected, minify the entire document
      text = document.getText();
      range = new vscode.Range(
        document.positionAt(0),
        document.positionAt(text.length)
      );
    } else {
      // Minify only the selected text
      text = document.getText(selection);
      range = selection;
    }

    // Minify the CSS content
    const minifiedCss = minifyCssInPlace(text);

    // Replace the text with the minified version
    editor
      .edit((editBuilder) => {
        editBuilder.replace(range, minifiedCss);
      })
      .then(() => {
        // Show success message
        vscode.window.showInformationMessage(
          getMessage("cssMinifyInPlaceSuccess", vscode.env.language)
        );
      });
  } catch (error) {
    vscode.window.showErrorMessage(
      getMessage("cssMinifyFailed", vscode.env.language).replace(
        "{0}",
        error.message
      )
    );
  }
}

/**
 * Converts inline styles in HTML elements to classes
 */
async function handleConvertInlineStylesToClasses() {
  try {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const languageId = document.languageId;

    // Check if the file is an HTML file
    if (languageId !== "html" && languageId !== "htm") {
      return vscode.window.showErrorMessage(
        getMessage("notHtmlFile", vscode.env.language)
      );
    }

    const text = document.getText();

    // Gök cisimleri listesi
    const celestialBodies = [
      "andromeda",
      "apollo",
      "aquarius",
      "aries",
      "artemis",
      "asteroid",
      "betelgeuse",
      "blackHole",
      "callisto",
      "cancer",
      "capricorn",
      "cassiopeia",
      "centaurus",
      "comet",
      "corona",
      "cosmos",
      "cygnus",
      "deimos",
      "draco",
      "earth",
      "eclipse",
      "europa",
      "galaxy",
      "gemini",
      "halo",
      "hydra",
      "io",
      "jupiter",
      "leo",
      "libra",
      "luna",
      "mars",
      "mercury",
      "meteor",
      "milkyWay",
      "miranda",
      "moon",
      "nebula",
      "neptune",
      "nova",
      "oberon",
      "orion",
      "pegasus",
      "perseus",
      "phobos",
      "pisces",
      "pleiades",
      "pluto",
      "polaris",
      "pulsar",
      "quasar",
      "sagittarius",
      "saturn",
      "scorpio",
      "sirius",
      "sol",
      "solar",
      "star",
      "stardust",
      "supernova",
      "taurus",
      "titan",
      "triton",
      "uranus",
      "venus",
      "virgo",
      "vortex",
      "wormhole",
    ];

    // Regular expression to find elements with style attributes
    const styleAttributeRegex =
      /<([a-zA-Z][a-zA-Z0-9]*)[^>]*\s+style\s*=\s*["']([^"']*)["'][^>]*>/g;

    let match;
    let inlineStylesFound = false;
    let newHtmlContent = text;
    let cssClasses = {};
    let classCounter = 0;

    // Find all inline styles and create classes for them
    while ((match = styleAttributeRegex.exec(text)) !== null) {
      inlineStylesFound = true;
      const fullMatch = match[0];
      const tagName = match[1];
      const styleContent = match[2].trim();

      if (!styleContent) continue; // Skip empty style attributes

      // 1 ile 1000 arasında rastgele bir sayı üret
      const randomNumber = Math.floor(Math.random() * 1000) + 1;

      // Random gök cismi seç
      const randomCelestialBody =
        celestialBodies[Math.floor(Math.random() * celestialBodies.length)];

      // CamelCase class ismi oluştur - mb öneki ile başlayacak
      const className = `mb${
        randomCelestialBody.charAt(0).toUpperCase() +
        randomCelestialBody.slice(1)
      }${tagName.charAt(0).toUpperCase() + tagName.slice(1)}${randomNumber}`;

      // Store the CSS content for this class
      cssClasses[className] = styleContent;

      // Replace the style attribute with a class attribute or add to existing class
      let newElement = fullMatch.replace(/\s+style\s*=\s*["'][^"']*["']/g, "");

      // Check if the element already has a class attribute
      if (newElement.includes("class=")) {
        // Add the new class to the existing class attribute
        newElement = newElement.replace(
          /class\s*=\s*["']([^"']*)["']/g,
          (match, existingClasses) => {
            return `class="${existingClasses.trim()} ${className}"`;
          }
        );
      } else {
        // Add a new class attribute
        newElement = newElement.replace(
          /<([a-zA-Z][a-zA-Z0-9]*)/,
          `<$1 class="${className}"`
        );
      }

      // Replace the old element with the new one in the HTML content
      newHtmlContent = newHtmlContent.replace(fullMatch, newElement);
    }

    if (!inlineStylesFound) {
      vscode.window.showInformationMessage(
        getMessage("noInlineStylesFound", vscode.env.language)
      );
      return;
    }

    // Create CSS content for the style tag
    let cssContent = "";
    for (const className in cssClasses) {
      cssContent += `.${className} {\n\t${cssClasses[className]
        .replace(/;\s*$/, "")
        .replace(/;/g, ";\n\t")}\n}\n`;
    }

    // Check if there's already a style tag in the head
    const headMatch = /<head[^>]*>([\s\S]*?)<\/head>/i.exec(newHtmlContent);
    if (!headMatch) {
      vscode.window.showErrorMessage(
        getMessage("noHeadTagFound", vscode.env.language)
      );
      return;
    }

    const headContent = headMatch[1];
    const styleTagMatch = /<style[^>]*>([\s\S]*?)<\/style>/i.exec(headContent);

    if (styleTagMatch) {
      // There's already a style tag, append our CSS to it
      const styleTagContent = styleTagMatch[1];
      const newStyleTagContent = styleTagContent + "\n" + cssContent;

      // Replace the old style tag content with the new one
      newHtmlContent = newHtmlContent.replace(
        styleTagMatch[0],
        `<style>\n${newStyleTagContent}</style>`
      );
    } else {
      // No style tag found, add a new one before the head closing tag
      const headEndMatch = /<\/head>/i.exec(newHtmlContent);
      if (headEndMatch) {
        const headEndPos = headEndMatch.index;
        const styleTag = `\t<style>\n\t\t${cssContent.replace(
          /\n/g,
          "\n\t\t"
        )}\t</style>\n`;

        // Insert the style tag before the head closing tag
        newHtmlContent =
          newHtmlContent.substring(0, headEndPos) +
          styleTag +
          newHtmlContent.substring(headEndPos);
      }
    }

    // Apply the changes to the document
    const edit = new vscode.WorkspaceEdit();
    edit.replace(
      document.uri,
      new vscode.Range(0, 0, document.lineCount, 0),
      newHtmlContent
    );
    await vscode.workspace.applyEdit(edit);

    vscode.window.showInformationMessage(
      getMessage("inlineStylesConverted", vscode.env.language)
    );
  } catch (error) {
    vscode.window.showErrorMessage(
      getMessage("cssExtractFailed", vscode.env.language).replace(
        "{0}",
        error.message
      )
    );
  }
}

/**
 * Converts selected element's inline style to a class
 */
async function handleConvertSelectedInlineStyleToClass() {
  try {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const languageId = document.languageId;

    // Check if the file is an HTML file
    if (languageId !== "html" && languageId !== "htm") {
      return vscode.window.showErrorMessage(
        getMessage("notHtmlFile", vscode.env.language)
      );
    }

    const selection = editor.selection;
    const text = document.getText();

    // Get the selected text or the current line if nothing is selected
    let selectedText = "";
    let selectedRange;

    if (selection.isEmpty) {
      // If no text is selected, get the current line
      const lineNumber = selection.active.line;
      const line = document.lineAt(lineNumber);
      selectedText = line.text;
      selectedRange = new vscode.Range(
        lineNumber,
        0,
        lineNumber,
        line.text.length
      );
    } else {
      // Get the selected text
      selectedText = document.getText(selection);
      selectedRange = selection;
    }

    // Check if the selected text contains a style attribute
    const styleAttributeRegex =
      /<([a-zA-Z][a-zA-Z0-9]*)[^>]*\s+style\s*=\s*["']([^"']*)["'][^>]*>/;
    const match = styleAttributeRegex.exec(selectedText);

    if (!match) {
      vscode.window.showInformationMessage(
        getMessage("noInlineStylesFound", vscode.env.language)
      );
      return;
    }

    const fullMatch = match[0];
    const tagName = match[1];
    const styleContent = match[2].trim();

    if (!styleContent) {
      vscode.window.showInformationMessage(
        getMessage("noInlineStylesFound", vscode.env.language)
      );
      return;
    }

    // Gök cisimleri listesi
    const celestialBodies = [
      "andromeda",
      "apollo",
      "aquarius",
      "aries",
      "artemis",
      "asteroid",
      "betelgeuse",
      "blackHole",
      "callisto",
      "cancer",
      "capricorn",
      "cassiopeia",
      "centaurus",
      "comet",
      "corona",
      "cosmos",
      "cygnus",
      "deimos",
      "draco",
      "earth",
      "eclipse",
      "europa",
      "galaxy",
      "gemini",
      "halo",
      "hydra",
      "io",
      "jupiter",
      "leo",
      "libra",
      "luna",
      "mars",
      "mercury",
      "meteor",
      "milkyWay",
      "miranda",
      "moon",
      "nebula",
      "neptune",
      "nova",
      "oberon",
      "orion",
      "pegasus",
      "perseus",
      "phobos",
      "pisces",
      "pleiades",
      "pluto",
      "polaris",
      "pulsar",
      "quasar",
      "sagittarius",
      "saturn",
      "scorpio",
      "sirius",
      "sol",
      "solar",
      "star",
      "stardust",
      "supernova",
      "taurus",
      "titan",
      "triton",
      "uranus",
      "venus",
      "virgo",
      "vortex",
      "wormhole",
    ];

    // 1 ile 1000 arasında rastgele bir sayı üret
    const randomNumber = Math.floor(Math.random() * 1000) + 1;

    // Random gök cismi seç
    const randomCelestialBody =
      celestialBodies[Math.floor(Math.random() * celestialBodies.length)];

    // CamelCase class ismi oluştur - mb öneki ile başlayacak
    const className = `mb${
      randomCelestialBody.charAt(0).toUpperCase() + randomCelestialBody.slice(1)
    }${tagName.charAt(0).toUpperCase() + tagName.slice(1)}${randomNumber}`;

    // Replace the style attribute with a class attribute or add to existing class
    let newElement = fullMatch.replace(/\s+style\s*=\s*["'][^"']*["']/g, "");

    // Check if the element already has a class attribute
    if (newElement.includes("class=")) {
      // Add the new class to the existing class attribute
      newElement = newElement.replace(
        /class\s*=\s*["']([^"']*)["']/g,
        (match, existingClasses) => {
          return `class="${existingClasses.trim()} ${className}"`;
        }
      );
    } else {
      // Add a new class attribute
      newElement = newElement.replace(
        /<([a-zA-Z][a-zA-Z0-9]*)/,
        `<$1 class="${className}"`
      );
    }

    // Create CSS content for the style tag
    const cssContent = `.${className} {\n\t${styleContent
      .replace(/;\s*$/, "")
      .replace(/;/g, ";\n\t")}\n}`;

    // Get the full HTML content
    let newHtmlContent = text;

    // Replace the selected element with the new one
    newHtmlContent = newHtmlContent.replace(fullMatch, newElement);

    // Check if there's already a style tag in the head
    const headMatch = /<head[^>]*>([\s\S]*?)<\/head>/i.exec(newHtmlContent);
    if (!headMatch) {
      vscode.window.showErrorMessage(
        getMessage("noHeadTagFound", vscode.env.language)
      );
      return;
    }

    const headContent = headMatch[1];
    const styleTagMatch = /<style[^>]*>([\s\S]*?)<\/style>/i.exec(headContent);

    if (styleTagMatch) {
      // There's already a style tag, append our CSS to it
      const styleTagContent = styleTagMatch[1];
      const newStyleTagContent = styleTagContent + "\n\t\t" + cssContent;

      // Replace the old style tag content with the new one
      newHtmlContent = newHtmlContent.replace(
        styleTagMatch[0],
        `<style>\n${newStyleTagContent}\n\t</style>`
      );
    } else {
      // No style tag found, add a new one before the head closing tag
      const headEndMatch = /<\/head>/i.exec(newHtmlContent);
      if (headEndMatch) {
        const headEndPos = headEndMatch.index;
        const styleTag = `\t<style>\n\t\t${cssContent}\n\t</style>\n`;

        // Insert the style tag before the head closing tag
        newHtmlContent =
          newHtmlContent.substring(0, headEndPos) +
          styleTag +
          newHtmlContent.substring(headEndPos);
      }
    }

    // Apply the changes to the document
    const edit = new vscode.WorkspaceEdit();
    edit.replace(
      document.uri,
      new vscode.Range(0, 0, document.lineCount, 0),
      newHtmlContent
    );
    await vscode.workspace.applyEdit(edit);

    vscode.window.showInformationMessage(
      getMessage("selectedInlineStyleConverted", vscode.env.language)
    );
  } catch (error) {
    vscode.window.showErrorMessage(
      getMessage("cssExtractFailed", vscode.env.language).replace(
        "{0}",
        error.message
      )
    );
  }
}

/**
 * Activates the extension
 * @param {vscode.ExtensionContext} context - Extension context
 */
function activate(context) {
  let disposableDesc = vscode.commands.registerCommand(
    "csssortify.sortByLength",
    () => {
      handleCssSort("length-desc");
    }
  );

  let disposableAsc = vscode.commands.registerCommand(
    "csssortify.sortByLengthAsc",
    () => {
      handleCssSort("length-asc");
    }
  );

  let disposableAlpha = vscode.commands.registerCommand(
    "csssortify.sortAlphabetically",
    () => {
      handleCssSort("alpha-asc");
    }
  );

  let disposableAlphaDesc = vscode.commands.registerCommand(
    "csssortify.sortAlphabeticallyDesc",
    () => {
      handleCssSort("alpha-desc");
    }
  );

  let disposableCategory = vscode.commands.registerCommand(
    "csssortify.sortByCategory",
    () => {
      handleCssSort("category");
    }
  );

  let disposableCategoryWithSpacing = vscode.commands.registerCommand(
    "csssortify.sortByCategoryWithSpacing",
    () => {
      handleCssSort("category-with-spacing");
    }
  );

  let disposableExtractCss = vscode.commands.registerCommand(
    "csssortify.extractCssFromHtml",
    () => {
      handleExtractCssFromHtml();
    }
  );

  let disposableMinify = vscode.commands.registerCommand(
    "csssortify.minifyCss",
    () => {
      handleCssMinify();
    }
  );

  let disposableMinifyInPlace = vscode.commands.registerCommand(
    "csssortify.minifyCssInPlace",
    () => {
      handleCssMinifyInPlace();
    }
  );

  let disposableConvertInlineStyles = vscode.commands.registerCommand(
    "csssortify.convertInlineStylesToClasses",
    () => {
      handleConvertInlineStylesToClasses();
    }
  );

  let disposableConvertSelectedInlineStyleToClass =
    vscode.commands.registerCommand(
      "csssortify.convertSelectedInlineStyleToClass",
      () => {
        handleConvertSelectedInlineStyleToClass();
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
  deactivate,
};
