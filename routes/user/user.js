'use strict';
import { Router } from 'express';
const router = Router();
import authenticateToken from '../../middleware/authendicate.js'
import { ValidateReq } from '../../middleware/inputSchemaValidate/inputValidation.js'
import { userRegisterSchema,userLoginSchema,getUserListSchema } from '../../middleware/inputSchemaValidate/userDataValidate.js'
import { userRegister,loginUser,getUserData } from './user.module.js';

router.post('/register',ValidateReq(userRegisterSchema,"body"), userRegister);
router.post('/login',ValidateReq(userLoginSchema,"body"),loginUser)
router.get('/userList',authenticateToken,ValidateReq(getUserListSchema,"query"), getUserData)

export default router;