import express from 'express'
import { textPostController } from '../controller/testController.js'
import userAuthMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/test-post',  textPostController)
 

export default router