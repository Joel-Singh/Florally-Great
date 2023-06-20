const { JSDOM } = require("jsdom");

module.exports = function (string) {
  const dom = new JSDOM(string);
  const document = dom.window.document;

  return document;
};
