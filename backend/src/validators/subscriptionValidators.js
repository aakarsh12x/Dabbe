import { body } from "express-validator";

export const subscriptionValidator = [
  body("serviceId").isInt({ gt: 0 }).withMessage("Service id is required"),
  body("startDate").isISO8601().withMessage("Start date must be a valid ISO date"),
  body("endDate").isISO8601().withMessage("End date must be a valid ISO date"),
];

export const statusValidator = [
  body("status")
    .isIn(["ACTIVE", "PAUSED", "CANCELLED", "EXPIRED"])
    .withMessage("Invalid subscription status"),
];
