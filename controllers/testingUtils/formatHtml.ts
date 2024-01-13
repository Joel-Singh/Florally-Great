import { format } from "prettier";

export default function (html) {
  return format(html, {
    parser: "html",
  });
}
