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
router.post("/create", requireRegionController("create_post"));

router.get("/delete", requireRegionController("delete_get"));
router.post("/delete", requireRegionController("delete_post"));

router.get("/:name", requireRegionController("all_flowers_in_region").default);
router.get("/:name/update", requireRegionController("update_get"));
router.post("/:name/update", requireRegionController("update_post"));

module.exports = router;
