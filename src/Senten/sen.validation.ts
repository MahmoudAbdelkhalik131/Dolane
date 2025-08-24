import { body, param } from "express-validator";
import validatorMiddleware from "../middleware/validation";

class Validation {
  create = [
    body("category").notEmpty().withMessage("category is required"),
    body("body")
      .notEmpty()
      .withMessage("body Is required")
      .isLength({
        max: 1000,
        min: 10,
      })
      .withMessage("Legth must be betwen 10 and 1000"),
    validatorMiddleware,
  ];
  update = [
    param("id")
      .notEmpty()
      .withMessage("Id is required")
      .isMongoId()
      .withMessage("you must enter a valid id"),
    body("category").optional(),
    body("body")
      .optional()
      .isLength({
        max: 1000,
        min: 10,
      })
      .withMessage("Legth must be betwen 10 and 1000"),
    validatorMiddleware,
  ];
  delete = [
    param("id")
      .notEmpty()
      .withMessage("Id is required")
      .isMongoId()
      .withMessage("you must enter a valid id"),
    validatorMiddleware,
  ];
  getOne = [
    param("id")
      .notEmpty()
      .withMessage("Id is required")
      .isMongoId()
      .withMessage("you must enter a valid id"),
    validatorMiddleware,
  ];
}

const validationSen = new Validation
export default validationSen
