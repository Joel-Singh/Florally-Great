import { JSDOM } from "jsdom";

export default function (string) {
  const dom = new JSDOM(string);
  const document = dom.window.document;

  return document;
}
