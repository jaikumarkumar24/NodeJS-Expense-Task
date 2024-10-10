'use strict';
import { Router } from 'express';
import { userController } from '../controllers/index.js';
import { ValidateReq } from '../utils/validation/inputValidation.js'
import validationSchema from '../utils/validation/userDataValidate.js'
const router = Router();

router.post('/register',ValidateReq(validationSchema.userRegisterSchema,"body"), userController.userRegister);
router.post('/login',ValidateReq(validationSchema.userLoginSchema,"body"),userController.loginUser);
export default router;