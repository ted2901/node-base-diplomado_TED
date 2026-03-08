import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import authenticateToken from "../middlewares/authenticate.middleware.js";

const router = Router();

router.post('/', authController.login);

export default router;
