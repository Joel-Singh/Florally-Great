const path = require("path");
const renderPugToDOM = require(path.join(
  appRoot,
  "views",
  "renderPugToDOM.js"
));

test.each([
  ["Form renders", {}],
  [
    "Form renders a single error",
    { errors: [{ msg: "This Error Msg Should be seen" }] },
  ],
  [
    "Form renders multiple errors",
    {
      errors: [
        { msg: "This Error Msg Should be seen 1" },
        { msg: "This Error Msg Should be seen 2" },
        { msg: "This Error Msg Should be seen 3" },
      ],
    },
  ],
])("%s", (name, locals) => {
  const form = renderPugToDOM("./views/form.pug", locals).querySelector("form");
  expect(form).toMatchSnapshot();
});
