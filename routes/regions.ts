import all_flowers_in_region from "../controllers/region/all_flowers_in_region";
import create_get from "../controllers/region/create_get";
import create_post from "../controllers/region/create_post";
import delete_get from "../controllers/region/delete_get";
import delete_post from "../controllers/region/delete_post";
import list from "../controllers/region/list";
import update_get from "../controllers/region/update_get";
import update_post from "../controllers/region/update_post";

const express = require("express");
const router = express.Router();

router.get("/", list);

router.get("/create", create_get);
router.post("/create", create_post);

router.get("/delete", delete_get);
router.post("/delete", delete_post);

router.get("/:name", all_flowers_in_region);
router.get("/:name/update", update_get);
router.post("/:name/update", update_post);

module.exports = router;
