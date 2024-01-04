import mongoose from "mongoose";
import renderPugToDOM from "../../renderPugToDOM.js";
import { FlowerFormLocals } from "../flowerFormData.js";
import getValidRegionData from "./../../../utils/dummyData/getValidData/getValidRegionData";
import { generateSequentialObjectId } from "../../../utils/dummyData/SequentialGenerators";

function renderRegionSelect(locals: FlowerFormLocals) {
  const renderedForm = renderPugToDOM(
    "./views/flowers/flower_form.pug",
    locals,
  );

  const regionListElement = renderedForm.querySelector(
    "[placeholder='select region']",
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
        renderRegionSelect({ regionList: [getValidRegionData()] }),
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
        }),
      ).toMatchSnapshot();
    });
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

  test("Properly sets the prepopulated hidden id value", () => {
    const idValue = "0000000000001";
    const locals = {
      prepopulatedValues: {
        id: idValue,
      },
    };
    const renderedForm = renderPugToDOM(
      "./views/flowers/flower_form_update.pug",
      locals,
    );

    const hiddenIdInput = renderedForm.querySelector(
      'input[type="hidden"][name="id"]',
    );

    expect(hiddenIdInput.value).toMatch(idValue);
  });

  test("Preselects region", () => {
    const preselectedRegionId = new mongoose.Types.ObjectId(
      generateSequentialObjectId(),
    );
    const regionSelect = renderRegionSelect({
      regionList: [
        getValidRegionData(),
        getValidRegionData({
          _id: preselectedRegionId,
          name: "I should be selected",
        }),
        getValidRegionData(),
      ],
      prepopulatedValues: {
        region: preselectedRegionId.toString(),
      },
    });

    expect(regionSelect.querySelector("[selected]")).toMatchInlineSnapshot(`
      <option
        selected="selected"
        value="000000000000000000000009"
      >
        I should be selected
      </option>
    `);
  });

  function getDefaultInputValueAttributesInFlowerForm(locals) {
    const renderedForm = renderPugToDOM(
      "./views/flowers/flower_form.pug",
      locals,
    );
    let inputs = renderedForm.querySelectorAll("input");
    inputs = Array.from(inputs);

    const inputValues = inputs.map((element) => {
      return element.getAttribute("value");
    });

    return inputValues;
  }
});
