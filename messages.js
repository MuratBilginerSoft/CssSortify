//#region Localization Messages
const messages = {
    'en': {
        noFileOpen: 'Please open a file!',
        notCssFile: 'This command only works in CSS files!',
        sortLengthDesc: 'CSS properties sorted by length (descending)! 🎉',
        sortLengthAsc: 'CSS properties sorted by length (ascending)! 🎉',
        sortAlphaAsc: 'CSS properties sorted alphabetically (A-Z)! 🎉',
        sortAlphaDesc: 'CSS properties sorted alphabetically (Z-A)! 🎉',
        cssSortingFailed: 'CSS sorting failed: {0}'
    },
    'tr': {
        noFileOpen: 'Lütfen bir dosya açın!',
        notCssFile: 'Bu komut sadece CSS dosyalarında çalışır!',
        sortLengthDesc: 'CSS özellikleri uzunluğuna göre azalan sırada sıralandı! 🎉',
        sortLengthAsc: 'CSS özellikleri uzunluğuna göre artan sırada sıralandı! 🎉',
        sortAlphaAsc: 'CSS özellikleri alfabetik olarak sıralandı (A-Z)! 🎉',
        sortAlphaDesc: 'CSS özellikleri alfabetik olarak sıralandı (Z-A)! 🎉',
        cssSortingFailed: 'CSS sıralama başarısız: {0}'
    },
    'de': {
        noFileOpen: 'Bitte öffnen Sie eine Datei!',
        notCssFile: 'Dieser Befehl funktioniert nur in CSS-Dateien!',
        sortLengthDesc: 'CSS-Eigenschaften nach Länge sortiert (absteigend)! 🎉',
        sortLengthAsc: 'CSS-Eigenschaften nach Länge sortiert (aufsteigend)! 🎉',
        sortAlphaAsc: 'CSS-Eigenschaften alphabetisch sortiert (A-Z)! 🎉',
        sortAlphaDesc: 'CSS-Eigenschaften alphabetisch sortiert (Z-A)! 🎉',
        cssSortingFailed: 'CSS-Sortierung fehlgeschlagen: {0}'
    },
    'zh-cn': {
        noFileOpen: '请打开一个文件！',
        notCssFile: '此命令仅适用于CSS文件！',
        sortLengthDesc: 'CSS属性已按长度降序排序！🎉',
        sortLengthAsc: 'CSS属性已按长度升序排序！🎉',
        sortAlphaAsc: 'CSS属性已按字母顺序排序（A-Z）！🎉',
        sortAlphaDesc: 'CSS属性已按字母顺序排序（Z-A）！🎉',
        cssSortingFailed: 'CSS排序失败：{0}'
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
