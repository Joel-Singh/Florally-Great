import create_post from "../controllers/region/create_post";
import update_post from "../controllers/region/update_post";

const express = require("express");
const router = express.Router();
const path = require("path");

// @ts-ignore
const requireRegionController = (controllerName) => {
  // @ts-ignore
  return require(path.join(appRoot, "controllers", "region", controllerName));
};

router.get("/", requireRegionController("list"));

router.get("/create", requireRegionController("create_get"));
router.post("/create", create_post);

router.get("/delete", requireRegionController("delete_get"));
router.post("/delete", requireRegionController("delete_post"));

router.get("/:name", requireRegionController("all_flowers_in_region").default);
router.get("/:name/update", requireRegionController("update_get").default);
router.post("/:name/update", update_post);

module.exports = router;
