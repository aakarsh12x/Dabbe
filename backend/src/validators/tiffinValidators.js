import { body } from "express-validator";

export const serviceValidator = [
  body("name").trim().notEmpty().withMessage("Service name is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("priceMonthly").isFloat({ gt: 0 }).withMessage("Monthly price must be greater than 0"),
  body("rating").optional().isFloat({ min: 0, max: 5 }).withMessage("Rating must be between 0 and 5"),
  body("vegOrNonVeg").isIn(["VEG", "NON_VEG"]).withMessage("Meal type must be VEG or NON_VEG"),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("menus").optional().isArray().withMessage("Menus must be an array"),
];
