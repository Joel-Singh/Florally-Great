const { default: renderPugToDOM } = require("../../renderPugToDOM");

test("Rendered flower list is empty", () => {
  const locals = {
    region: {
      name: "regionName",
    },
    flower_list: [],
  };

  const renderedDOM = renderPugToDOM(
    "./views/regions/all_flowers_in_region.pug",
    locals
  );

  snapshotList(renderedDOM);
});

test("Rendered flower list has flowers", () => {
  const locals = {
    region: {
      name: "regionName",
    },
    flower_list: [
      createFlowerObj("name1", "desc1", "url1"),
      createFlowerObj("name2", "desc2", "url2"),
      createFlowerObj("name3", "desc3", "url3"),
    ],
  };

  const renderedDOM = renderPugToDOM(
    "./views/regions/all_flowers_in_region.pug",
    locals
  );

  snapshotList(renderedDOM);
});

test("Renders disabled delete button when there are flowers", () => {
  const locals = {
    region: {
      name: "regionName",
    },
    flower_list: [createFlowerObj("name1", "desc1", "url1")],
  };

  const renderedDOM = renderPugToDOM(
    "./views/regions/all_flowers_in_region.pug",
    locals
  );

  expectElementToExist(renderedDOM, "button[type='submit'][disabled]");
});

test("Renders functional delete button when there aren't flowers", () => {
  const locals = {
    region: {
      name: "regionName",
    },
    flower_list: [],
  };

  const renderedDOM = renderPugToDOM(
    "./views/regions/all_flowers_in_region.pug",
    locals
  );

  expectElementToExist(renderedDOM, "button[type='submit']:not([disabled])");
});

test("Properly passes in region id to hidden input", async () => {
  const id = "64891f696204fa1dd04542bc";
  const locals = {
    region: {
      name: "regionName",
      _id: id,
    },
    flower_list: [],
  };

  const renderedDOM = renderPugToDOM(
    "./views/regions/all_flowers_in_region.pug",
    locals
  );
  const hiddenInput = renderedDOM.querySelector('input[type="hidden"]');

  expect(hiddenInput.getAttribute("value")).toMatchInlineSnapshot(`"${id}"`);
});

function snapshotList(DOM) {
  const list = DOM.querySelector(".list");
  expect(list).toMatchSnapshot();
}

function createFlowerObj(name, description, url) {
  return {
    name,
    description,
    url,
  };
}

function expectElementToExist(container, selector) {
  expect(container.querySelector(selector)).not.toBeNull();
}
