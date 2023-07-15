const renderPugToDOM = require("../../renderPugToDOM.js");
const getValidRegionData = require("./../../../utils/dummyData/getValidData/getValidRegionData.js");

function renderRegionSelect(locals) {
  const renderedForm = renderPugToDOM(
    "./views/flowers/flower_form.pug",
    locals
  );

  const regionListElement = renderedForm.querySelector(
    "[placeholder='select region']"
  );

  return regionListElement;
}

describe("Generate region select", () => {
  describe("test region option generation", () => {
    test("Region select is empty with no regions", () => {
      expect(renderRegionSelect({ regionList: [] })).toMatchSnapshot();
    });

    test("Region select has one region", () => {
      expect(
        renderRegionSelect({ regionList: [getValidRegionData()] })
      ).toMatchSnapshot();
    });

    test("Region select has multiple regions", () => {
      expect(
        renderRegionSelect({
          regionList: [
            getValidRegionData(),
            getValidRegionData(),
            getValidRegionData(),
          ],
        })
      ).toMatchSnapshot();
    });
  });

  test("Preselects region", () => {
    const preselectedRegionName = "I should be selected";
    const regionSelect = renderRegionSelect({
      regionList: [
        getValidRegionData(),
        getValidRegionData({ name: preselectedRegionName }),
        getValidRegionData(),
      ],
      prepopulatedValues: {
        regionName: preselectedRegionName,
      },
    });

    expect(regionSelect.querySelector("[selected]")).toMatchInlineSnapshot(`
      <option
        selected="selected"
        value="000000000000000000000012"
      >
        I should be selected
      </option>
    `);
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
