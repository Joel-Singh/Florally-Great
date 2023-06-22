const pug = require("pug");
const { JSDOM } = require("jsdom");

module.exports = (absoluteFilePath, locals) => {
  const compiledTemplate = pug.compileFile(absoluteFilePath);

  const html = compiledTemplate(locals);

  const dom = new JSDOM(html);
  const document = dom.window.document;

  return document;
};
