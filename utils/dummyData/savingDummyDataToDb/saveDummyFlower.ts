import Flower, { IFlowerProperties } from "../../../models/flower";

import { getValidFlowerModelData } from "../getValidData/getValidFlowerData.js";

export default async function (overwrites: Partial<IFlowerProperties> = {}) {
  const dummyData: IFlowerProperties = {
    ...(await getValidFlowerModelData()),
    ...overwrites,
  };

  return await new Flower(dummyData).save();
}
