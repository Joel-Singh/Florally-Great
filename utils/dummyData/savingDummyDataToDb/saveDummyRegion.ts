import Region from "../../../models/region";
import {
  generateSequentialObjectId,
  generateSequentialNumber,
} from "../SequentialGenerators.js";

export default async function (overwrites = {}) {
  const dummyData = {
    name: "name" + generateSequentialNumber(),
    description: "description",
    _id: generateSequentialObjectId(),
    ...overwrites,
  };
  return await new Region(dummyData).save();
}
