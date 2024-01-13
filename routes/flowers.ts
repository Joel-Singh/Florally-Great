import { Router } from "express";
const router = Router();
import delete_get from "../controllers/flower/delete_get";
import list from "../controllers/flower/list";
import create_get from "../controllers/flower/create_get";
import create_post from "../controllers/flower/create_post";
import detail from "../controllers/flower/detail";
import update_get from "../controllers/flower/update_get";
import update_post from "../controllers/flower/update_post";
import delete_post from "../controllers/flower/delete_post";

router.get("/", list);
router.get("/delete", delete_get);

router.get("/create", create_get);
router.post("/create", create_post);

router.get("/:name", detail);
router.get("/:name/update", update_get);
//@ts-ignore
router.post("/:name/update", update_post);
router.post("/:name", delete_post);

export default router;
