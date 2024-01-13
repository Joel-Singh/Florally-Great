import { compileFile } from "pug";
import { JSDOM } from "jsdom";

export default (absoluteFilePath, locals) => {
  const compiledTemplate = compileFile(absoluteFilePath);

  const html = compiledTemplate(locals);

  const dom = new JSDOM(html);
  const document = dom.window.document;

  return document;
};
