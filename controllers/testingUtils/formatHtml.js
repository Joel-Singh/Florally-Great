const prettier = require("prettier");

module.exports = function (html) {
  return prettier.format(html, {
    parser: "html",
  });
};
