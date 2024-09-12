import express from 'express'
import userAuthMiddleware from '../middlewares/authMiddleware.js'
import { updateUserController } from '../controller/userController.js'
const router = express.Router()

//  update || put 
router.put('/update-user',userAuthMiddleware, updateUserController)
export default router