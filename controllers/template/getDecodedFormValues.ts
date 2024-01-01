import { Request } from "express";
import he from "he";
import typeFromStringTuple from "../../views/typeFromStringTuple";
export default function getDecodedFormValues<keys extends readonly string[]>(
  req: Request,
  keys: readonly string[]
) {
  let decodedValues: Record<string, string> = {};
  for (const key of keys) {
    decodedValues[key] = he.decode(req.body[key]);
  }

  return decodedValues as typeFromStringTuple<keys>;
}
