import renderPugToDOM from "../renderPugToDOM";

test.each([
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
  const form = renderPugToDOM("./views/form.pug", locals).querySelector(
    "[data-testid='errors']"
  );
  expect(form).toMatchSnapshot();
});
