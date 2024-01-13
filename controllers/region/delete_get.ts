import asyncHandler from "express-async-handler";
import renderDeleteRegion from "./rendersWithDefaultLocals/renderDeleteRegion.ts";

export default asyncHandler(async (req, res, next) => {
  renderDeleteRegion(res, {});
});
