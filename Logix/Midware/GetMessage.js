const { messages } = require("../Utils/Message.js");

/**
 * @param {string} key - Message key
 * @param {string} language - Language code
 * @returns {string} - Localized message
 */
function getMessages(key, language) {
  const lang = language && messages[language] ? language : "en";
  return messages[lang][key] || messages["en"][key] || key;
}

module.exports = { getMessages };
