import express from 'express'
import userAuthMiddleware from '../middlewares/authMiddleware.js'
import { getUserController, updateUserController } from '../controller/userController.js'
const router = express.Router()
// get user  || post
router.post("/getUser", userAuthMiddleware, getUserController);
//  update || put 
router.put('/update-user',userAuthMiddleware, updateUserController)
export default router