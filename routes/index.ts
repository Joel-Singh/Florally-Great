import { Router } from "express";
const router = Router();
import index_controller from "../controllers/index";

router.get("/", index_controller);

export default router;
