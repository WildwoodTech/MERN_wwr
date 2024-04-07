import express from "express";
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from "../controllers/services";

// Middleware
import authentication from "../middleware/authentication";

const serviceRouter = express.Router();

serviceRouter.route("/").get(getServices).post(authentication, createService);

serviceRouter
  .route("/:id")
  .get(authentication, getService)
  .patch(authentication, updateService)
  .delete(authentication, deleteService);

export default serviceRouter;
