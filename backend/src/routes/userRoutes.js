import { Router } from "express";
import { fetchUsers } from "../controllers/userController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", protect, authorize("ADMIN"), fetchUsers);

export default router;
