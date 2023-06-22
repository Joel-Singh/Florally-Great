const renderPugToDOM = require("../renderPugToDOM.js");
const path = require("path");

test("message has paragraph when message is passed in", () => {
  const dom = renderPugToDOM(path.join(appRoot, "views", "message.pug"), {
    title: "title",
    message: "message",
  });

  expect(dom.querySelector("[data-testid='p-with-message']")).not.toBeNull();
});

test("message does NOT have paragraph when message is NOT passed in", () => {
  const dom = renderPugToDOM(path.join(appRoot, "views", "message.pug"), {
    title: "title",
  });

  expect(dom.querySelector("[data-testid='p-with-message']")).toBeNull();
});
