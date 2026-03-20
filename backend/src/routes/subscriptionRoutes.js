import { Router } from "express";
import {
  addSubscription,
  changeSubscriptionStatus,
  fetchAllSubscriptions,
  fetchUserSubscriptions,
} from "../controllers/subscriptionController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import { statusValidator, subscriptionValidator } from "../validators/subscriptionValidators.js";

const router = Router();

router.post("/", protect, subscriptionValidator, validate, addSubscription);
router.get("/user/:id", protect, fetchUserSubscriptions);
router.get("/", protect, authorize("ADMIN"), fetchAllSubscriptions);
router.patch("/:id/status", protect, authorize("ADMIN"), statusValidator, validate, changeSubscriptionStatus);

export default router;
