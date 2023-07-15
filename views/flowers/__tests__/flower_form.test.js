const renderPugToDOM = require("../../renderPugToDOM.js");
const getValidRegionData = require("./../../../utils/dummyData/getValidData/getValidRegionData.js");

function renderRegionSelect(regionList) {
  const renderedForm = renderPugToDOM("./views/flowers/flower_form.pug", {
    regionList,
  });

  const regionListElement = renderedForm.querySelector(
    "[placeholder='select region']"
  );

  return regionListElement;
}

describe("testing generate region select", () => {
  test("Region select is empty with no regions", () => {
    expect(renderRegionSelect([])).toMatchSnapshot();
  });

  test("Region select has one region", () => {
    expect(renderRegionSelect([getValidRegionData()])).toMatchSnapshot();
  });

  test("Region select has multiple regions", () => {
    expect(
      renderRegionSelect([
        getValidRegionData(),
        getValidRegionData(),
        getValidRegionData(),
      ])
    ).toMatchSnapshot();
  });
});

describe("Prepopulated input values", () => {
  test("Display default values with no passed in preopulated values", () => {
    expect(getDefaultInputValueAttributesInFlowerForm({}))
      .toMatchInlineSnapshot(`
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

    expect(getDefaultInputValueAttributesInFlowerForm(locals))
      .toMatchInlineSnapshot(`
      [
        "prepopulated name",
        "preopopulated description",
        "32",
        "$3.21",
      ]
    `);
  });

  function getDefaultInputValueAttributesInFlowerForm(locals) {
    const renderedForm = renderPugToDOM(
      "./views/flowers/flower_form.pug",
      locals
    );
    let inputs = renderedForm.querySelectorAll("input");
    inputs = Array.from(inputs);

    const inputValues = inputs.map((element) => {
      return element.getAttribute("value");
    });

    return inputValues;
  }
});
