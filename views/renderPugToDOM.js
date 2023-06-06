const pug = require("pug");
const { JSDOM } = require("jsdom");

module.exports = (filePath, locals) => {
  const compiledTemplate = pug.compileFile(filePath);

  const html = compiledTemplate(locals);

  const dom = new JSDOM(html);
  const document = dom.window.document;

  return document;
};
