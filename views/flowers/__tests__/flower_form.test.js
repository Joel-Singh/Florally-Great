const renderPugToDOM = require("../../renderPugToDOM.js");

test("Display default values", () => {
  const renderedForm = renderPugToDOM("./views/flowers/flower_form.pug", {});
  let inputs = renderedForm.querySelectorAll("input");
  inputs = Array.from(inputs);

  const inputValues = inputs.map((element) => {
    return element.getAttribute("value");
  });

  expect(inputValues).toMatchInlineSnapshot(`
    [
      "",
      "",
      "",
      "",
    ]
  `);
});

test("Display prepopulated values", () => {
  const locals = {
    prepopulatedValues: {
      name: "prepopulated name",
      description: "preopopulated description",
      numberInStock: "32",
      price: "$3.21",
    },
  };

  const renderedForm = renderPugToDOM(
    "./views/flowers/flower_form.pug",
    locals
  );
  let inputs = renderedForm.querySelectorAll("input");
  inputs = Array.from(inputs);

  const inputValues = inputs.map((element) => {
    return element.getAttribute("value");
  });

  expect(inputValues).toMatchInlineSnapshot(`
    [
      "prepopulated name",
      "preopopulated description",
      "32",
      "$3.21",
    ]
  `);
});
