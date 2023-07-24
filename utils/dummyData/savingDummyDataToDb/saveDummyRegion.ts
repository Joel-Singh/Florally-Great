import Region, {
  IRegionDocument,
  IRegionProperties,
} from "../../../models/region";

import {
  generateSequentialObjectId,
  generateSequentialNumber,
} from "../SequentialGenerators.js";

export default async function (
  overwrites: Partial<IRegionProperties> = {}
): Promise<IRegionDocument> {
  const dummyData: IRegionProperties = {
    name: "name" + generateSequentialNumber(),
    description: "description",
    ...overwrites,
  };

  return await new Region({
    ...dummyData,
    _id: generateSequentialObjectId(),
  }).save();
}
