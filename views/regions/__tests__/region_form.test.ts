import { RegionFormLocals } from "../regionFormInterfaces";
import renderPugToDOM from "../../renderPugToDOM.js";

test("Don't display anything when prepopulated values aren't passed in", () => {
  const locals = {};

  const renderedForm = renderPugToDOM(
    "./views/regions/region_form.pug",
    locals
  );

  expect(getInputValues(renderedForm)).toMatchInlineSnapshot(`
    [
      "",
      "",
    ]
  `);
});

test("Display prepopulated values", () => {
  const locals: RegionFormLocals = {
    prepopulatedValues: {
      name: "prepopulated name",
      description: "preopopulated description",
    },
  };

  const renderedForm = renderPugToDOM(
    "./views/regions/region_form.pug",
    locals
  );

  expect(getInputValues(renderedForm)).toMatchInlineSnapshot(`
    [
      "prepopulated name",
      "preopopulated description",
    ]
  `);
});

function getInputValues(renderedForm) {
  let inputs = renderedForm.querySelectorAll("input");

  inputs = Array.from(inputs);

  const inputValues = inputs.map((e) => {
    return e.getAttribute("value");
  });

  return inputValues;
}
