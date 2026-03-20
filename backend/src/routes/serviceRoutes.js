import { Router } from "express";
import {
  addService,
  editService,
  fetchServiceById,
  fetchServices,
  removeService,
} from "../controllers/tiffinServiceController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import { serviceValidator } from "../validators/tiffinValidators.js";

const router = Router();

router.get("/", fetchServices);
router.get("/:id", fetchServiceById);
router.post("/", protect, authorize("ADMIN"), serviceValidator, validate, addService);
router.put("/:id", protect, authorize("ADMIN"), serviceValidator, validate, editService);
router.delete("/:id", protect, authorize("ADMIN"), removeService);

export default router;
