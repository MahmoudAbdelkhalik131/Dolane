import { body } from "express-validator";
import validatorMiddleware from "../middleware/validation";
import userSchema from "./user.schema";
import User from "./user.interface";
class Validation {
  login = [
    body("email").isEmail().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    validatorMiddleware,
  ];
  register = [
    body("username")
      .notEmpty()
      .withMessage("username is required")
      .custom(async (val, { req }) => {
        const user: User | null = await userSchema.findOne({
          username:val
        });
        if (user) {
          throw new Error("Username already exists");
        }
        return true;
      }),
    body("email")
      .isEmail()
      .withMessage("email is required")
      .custom(async (val, { req }) => {
        const user: User | null = await userSchema.findOne({
          email: val,
        });
        if (user) {
          throw new Error("email already exists");
        }
        return true;
      }),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .custom(async (val, { req }) => {
        const confirmPassword: string=req.body.confirmPassword;;
        if (confirmPassword !== val) {
          throw new Error("Password does not match");
        }
        return true;
      }),

    validatorMiddleware,
  ];
}
const Uservalidation = new Validation()
export default Uservalidation;