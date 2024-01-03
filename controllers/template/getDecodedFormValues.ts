import { Request } from "express";
import he from "he";
import typeFromKeys from "../../views/typeFromKeys";
export default function getDecodedFormValues<keys extends readonly string[]>(
  req: Request,
  keys: readonly string[],
) {
  let decodedValues: Record<string, string> = {};
  for (const key of keys) {
    decodedValues[key] = he.decode(req.body[key]);
  }

  return decodedValues as typeFromKeys<keys>;
}
