import { Router } from "express";
const router = Router();
import { join } from "path";
import delete_get from "../controllers/flower/delete_get";

const requireFlowerController = (controllerName) => {
  const requiredController = require(join(
    appRoot as string,
    "controllers",
    "flower",
    controllerName
  ));
  if (
    typeof requiredController === "function" ||
    Array.isArray(requiredController)
  ) {
    return requiredController;
  } else {
    return requiredController.default;
  }
};

router.get("/", requireFlowerController("list"));
router.get("/delete", delete_get);

router.get("/create", requireFlowerController("create_get"));
router.post("/create", requireFlowerController("create_post"));

router.get("/:name", requireFlowerController("detail"));
router.get("/:name/update", requireFlowerController("update_get"));
router.post("/:name/update", requireFlowerController("update_post"));
router.post("/:name", requireFlowerController("delete_post"));

export default router;
