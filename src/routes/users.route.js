import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import validate from '../validators/validate.js';
import { createSchema, statusSchema } from '../validators/user.validate.js';
import authenticateToken from '../middlewares/authenticate.middleware.js';

const router = Router();


router
    .route('/')
    .get(userController.get)
    .post(validate(createSchema), userController.create);

router
    .route('/list/pagination')
    .get(userController.getUsersPagination);

router
    .route('/:id')
    .get(authenticateToken, userController.find)
    .put(authenticateToken, validate(createSchema), userController.update)
    .patch(authenticateToken, validate(statusSchema), userController.activateInactivate)
    .delete(authenticateToken, userController.eliminar);


export default router;