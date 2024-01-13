import renderPugToDOM from "../renderPugToDOM.ts";
import { join } from "path";

test("message has paragraph when message is passed in", () => {
  const dom = renderPugToDOM(join(appRoot as string, "views", "message.pug"), {
    title: "title",
    message: "message",
  });

  expect(dom.querySelector("[data-testid='p-with-message']")).not.toBeNull();
});

test("message does NOT have paragraph when message is NOT passed in", () => {
  const dom = renderPugToDOM(join(appRoot as string, "views", "message.pug"), {
    title: "title",
  });

  expect(dom.querySelector("[data-testid='p-with-message']")).toBeNull();
});
