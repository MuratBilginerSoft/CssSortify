//#region Localization Messages
const messages = {
    'en': {
        noFileOpen: 'Please open a file!',
        notCssFile: 'This command only works in CSS files!',
        notHtmlFile: 'This command only works in HTML files!',
        sortLengthDesc: 'CSS properties sorted by length (descending)! 🎉',
        sortLengthAsc: 'CSS properties sorted by length (ascending)! 🎉',
        sortAlphaAsc: 'CSS properties sorted alphabetically (A-Z)! 🎉',
        sortAlphaDesc: 'CSS properties sorted alphabetically (Z-A)! 🎉',
        sortCategory: 'CSS properties sorted by category! 🎉',
        sortCategoryWithSpacing: 'CSS properties sorted by category with spacing between groups! 🎉',
        cssSortingFailed: 'CSS sorting failed: {0}',
        cssMinifySuccess: 'CSS minified successfully! Saved to: {0}',
        cssMinifyFailed: 'CSS minification failed: {0}',
        cssMinifyInPlaceSuccess: 'CSS minified successfully in-place! 🎉',
        cssSortSuccess: "CSS properties sorted successfully!",
        cssSortFailed: "Failed to sort CSS properties: {0}",
        cssMinifySuccess: "CSS minified successfully! Saved as: {0}",
        cssMinifyFailed: "Failed to minify CSS: {0}",
        cssMinifyInPlaceSuccess: "CSS minified in-place successfully!",
        notCssFile: "This is not a CSS file.",
        noStyleTagsFound: "No style tags found in the HTML document.",
        noHeadTagFound: "No head tag found in the HTML document.",
        cssExtractSuccess: "CSS successfully extracted to \"{0}\" and link added to HTML file.",
        cssExtractFailed: "Failed to extract CSS: {0}"
    },
    'tr': {
        noFileOpen: 'Lütfen bir dosya açın!',
        notCssFile: 'Bu komut sadece CSS dosyalarında çalışır!',
        notHtmlFile: 'Bu komut sadece HTML dosyalarında çalışır!',
        sortLengthDesc: 'CSS özellikleri uzunluğuna göre azalan sırada sıralandı! 🎉',
        sortLengthAsc: 'CSS özellikleri uzunluğuna göre artan sırada sıralandı! 🎉',
        sortAlphaAsc: 'CSS özellikleri alfabetik olarak sıralandı (A-Z)! 🎉',
        sortAlphaDesc: 'CSS özellikleri alfabetik olarak sıralandı (Z-A)! 🎉',
        sortCategory: 'CSS özellikleri kategorilerine göre sıralandı! 🎉',
        sortCategoryWithSpacing: 'CSS özellikleri kategorilerine göre sıralandı ve gruplar arasına boşluk eklendi! 🎉',
        cssSortingFailed: 'CSS sıralama başarısız: {0}',
        cssMinifySuccess: 'CSS başarıyla sıkıştırıldı! Kaydedildi: {0}',
        cssMinifyFailed: 'CSS sıkıştırma başarısız: {0}',
        cssMinifyInPlaceSuccess: 'CSS başarıyla yerinde sıkıştırıldı! 🎉',
        cssSortSuccess: "CSS özellikleri başarıyla sıralandı!",
        cssSortFailed: "CSS özellikleri sıralanamadı: {0}",
        cssMinifySuccess: "CSS başarıyla sıkıştırıldı! Kaydedildi: {0}",
        cssMinifyFailed: "CSS sıkıştırma başarısız oldu: {0}",
        cssMinifyInPlaceSuccess: "CSS yerinde başarıyla sıkıştırıldı!",
        notCssFile: "Bu bir CSS dosyası değil.",
        noStyleTagsFound: "HTML belgesinde style etiketi bulunamadı.",
        noHeadTagFound: "HTML belgesinde head etiketi bulunamadı.",
        cssExtractSuccess: "CSS başarıyla \"{0}\" dosyasına çıkarıldı ve HTML dosyasına link eklendi.",
        cssExtractFailed: "CSS çıkarma işlemi başarısız: {0}"
    },
    'de': {
        noFileOpen: 'Bitte öffnen Sie eine Datei!',
        notCssFile: 'Dieser Befehl funktioniert nur in CSS-Dateien!',
        notHtmlFile: 'Dieser Befehl funktioniert nur in HTML-Dateien!',
        sortLengthDesc: 'CSS-Eigenschaften nach Länge sortiert (absteigend)! 🎉',
        sortLengthAsc: 'CSS-Eigenschaften nach Länge sortiert (aufsteigend)! 🎉',
        sortAlphaAsc: 'CSS-Eigenschaften alphabetisch sortiert (A-Z)! 🎉',
        sortAlphaDesc: 'CSS-Eigenschaften alphabetisch sortiert (Z-A)! 🎉',
        sortCategory: 'CSS-Eigenschaften nach Kategorie sortiert! 🎉',
        sortCategoryWithSpacing: 'CSS-Eigenschaften nach Kategorie mit Abstand zwischen Gruppen sortiert! 🎉',
        cssSortingFailed: 'CSS-Sortierung fehlgeschlagen: {0}',
        cssMinifySuccess: 'CSS erfolgreich minimiert! Gespeichert unter: {0}',
        cssMinifyFailed: 'CSS-Minimierung fehlgeschlagen: {0}',
        cssMinifyInPlaceSuccess: 'CSS erfolgreich an Ort und Stelle minimiert! 🎉',
        noStyleTagsFound: 'Keine Style-Tags im HTML-Dokument gefunden.',
        noHeadTagFound: 'Kein Head-Tag im HTML-Dokument gefunden.',
        cssExtractSuccess: 'CSS erfolgreich in die Datei "{0}" extrahiert und Link zur HTML-Datei hinzugefügt.'
    },
    'zh-cn': {
        noFileOpen: '请打开一个文件！',
        notCssFile: '此命令仅适用于CSS文件！',
        notHtmlFile: '此命令仅适用于HTML文件！',
        sortLengthDesc: 'CSS属性已按长度降序排序！🎉',
        sortLengthAsc: 'CSS属性已按长度升序排序！🎉',
        sortAlphaAsc: 'CSS属性已按字母顺序排序（A-Z）！🎉',
        sortAlphaDesc: 'CSS属性已按字母顺序排序（Z-A）！🎉',
        sortCategory: 'CSS属性已按类别排序！🎉',
        sortCategoryWithSpacing: 'CSS属性已按类别排序，并在组之间添加了空格！🎉',
        cssSortingFailed: 'CSS排序失败：{0}',
        cssMinifySuccess: 'CSS已成功压缩！保存到：{0}',
        cssMinifyFailed: 'CSS压缩失败：{0}',
        cssMinifyInPlaceSuccess: 'CSS已成功就地压缩！🎉',
        noStyleTagsFound: 'HTML文档中未找到样式标签。',
        noHeadTagFound: 'HTML文档中未找到头部标签。',
        cssExtractSuccess: 'CSS已成功提取到"{0}"文件，并将链接添加到HTML文件。'
    }
};
//#endregion

//#region Helper Functions
function getMessage(key, locale = 'en') {
    const langMessages = messages[locale] || messages['en'];
    return langMessages[key] || messages['en'][key];
}
//#endregion

//#region Exports
module.exports = {
    messages,
    getMessage
};
//#endregion
