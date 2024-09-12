import express from 'express'
import userAuthMiddleware from '../middlewares/authMiddleware.js'
import { createJobController, deleteJobController, getJobController, jobStatsController, updateJobController } from '../controller/jobController.js'

const router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    Job:
 *      type: object
 *      required:
 *        - company
 *        - position
 *        - workLocation
 *        - createdBy
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the job collection
 *          example: 61e8a64e0f4ef8b9b2a1c123
 *        company:
 *          type: string
 *          description: Name of the company
 *          example: Google
 *        position:
 *          type: string
 *          description: Job position being offered
 *          example: Software Engineer
 *        status:
 *          type: string
 *          description: Current status of the job application
 *          enum: [pending, reject, interview]
 *          example: pending
 *        workType:
 *          type: string
 *          description: Type of employment
 *          enum: [full-time, part-time, internship, contract]
 *          example: full-time
 *        workLocation:
 *          type: string
 *          description: Job's location
 *          example: Mumbai
 *        createdBy:
 *          type: string
 *          description: The user who created this job posting (reference to User model)
 *          example: 60d9c2f8e98a1c5a04151f33
 *        createdAt:
 *          type: string
 *          description: Date when the job was created
 *          example: 2024-09-12T12:34:56.789Z
 *        updatedAt:
 *          type: string
 *          description: Date when the job was last updated
 *          example: 2024-09-12T13:34:56.789Z
 */

/**
 *  @swagger
 *  tags:
 *    name: Job
 *    description: All Job apis
 */

// create job post || post

/**
 * @swagger
 * /api/v1/job/create-job:
 *    post:
 *      summary: Create a new job posting
 *      tags: [Job]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Job'
 *      responses:
 *        200:
 *          description: Job created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 *        500:
 *          description: internal server error
 */


router.post('/create-job',userAuthMiddleware, createJobController )

// get job || get

router.get('/get-job',userAuthMiddleware, getJobController)
/**
 * @swagger
 * /api/v1/job/get-job:
 *    post:
 *      summary: Get All job posting
 *      tags: [Job]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Job'
 *      responses:
 *        200:
 *          description: All Job fetch successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 *        500:
 *          description: internal serevr error
 */

//  update job || patch 

router.patch('/update-job/:id',userAuthMiddleware, updateJobController)

// delete job || delete

router.delete('/delete-job/:id',userAuthMiddleware, deleteJobController )

// Jobs stats filter || get

router.get('/job-stats',userAuthMiddleware, jobStatsController )


export default router