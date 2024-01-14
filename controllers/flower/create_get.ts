import asyncHandler from "express-async-handler";
import renderFlowerForm from "./rendersWithDefaultLocals/renderFlowerForm.ts";

export default asyncHandler(async (req, res, next) => {
  // @ts-ignore
  await renderFlowerForm(res);
});
