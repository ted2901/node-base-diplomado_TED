import { Router } from "express";
import taskController from "../controllers/task.controller.js";
import authenticateToken from "../middlewares/authenticate.middleware.js";

const router = Router()

router
    .route('/')
    .get(authenticateToken, taskController.get)
    .post(authenticateToken, taskController.create);

router
    .route('/:id')
    .get(authenticateToken, taskController.find)
    .put(authenticateToken, taskController.update)
    .delete(authenticateToken, taskController.eliminar)
    .patch(authenticateToken, taskController.done);

export default router;