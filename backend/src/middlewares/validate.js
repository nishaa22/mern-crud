import { validationResult } from "express-validator";
import { validation } from "../util/responseAPI.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(
      validation("Validation failed", errors.array().map(err => ({
        field: err.path,
        message: err.msg,
      }))))
  }

  next();
};
