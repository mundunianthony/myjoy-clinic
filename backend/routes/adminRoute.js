import express from 'express';
import { loginAdmin, appointmentsAdmin, appointmentCancel, addDoctor, allDoctors, adminDashboard } from '../controllers/adminController.js';
import { changeAvailablity } from '../controllers/doctorController.js';
import authAdmin from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';
const adminRouter = express.Router();

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     description: Authenticates an admin and returns a JWT token.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Admin's email address
 *                 example: "admin@clinic.com"
 *               password:
 *                 type: string
 *                 description: Admin's password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: JWT token for the admin
 *       400:
 *         description: Invalid credentials provided
 */
adminRouter.post("/login", loginAdmin)
/**
 * @swagger
 * /admin/add-doctor:
 *   post:
 *     summary: Add a new doctor
 *     description: Allows an admin to add a new doctor, including uploading an image.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Doctor's name
 *               email:
 *                 type: string
 *                 description: Doctor's email address
 *               specialty:
 *                 type: string
 *                 description: Doctor's specialty
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Doctor's profile picture
 *     responses:
 *       201:
 *         description: Doctor added successfully
 *       400:
 *         description: Invalid data provided
 *       401:
 *         description: Unauthorized access
 */
adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor)
/**
 * @swagger
 * /admin/appointments:
 *   get:
 *     summary: Get all appointments
 *     description: Retrieves a list of all clinic appointments for admin view.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   date:
 *                     type: string
 *                   patientName:
 *                     type: string
 *                   status:
 *                     type: string
 *       401:
 *         description: Unauthorized access
 */
adminRouter.get("/appointments", authAdmin, appointmentsAdmin)
/**
 * @swagger
 * /admin/cancel-appointment:
 *   post:
 *     summary: Cancel an appointment
 *     description: Allows an admin to cancel a patient's appointment.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointmentId:
 *                 type: string
 *                 description: The ID of the appointment to be canceled
 *     responses:
 *       200:
 *         description: Appointment canceled successfully
 *       400:
 *         description: Appointment not found
 *       401:
 *         description: Unauthorized access
 */
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
/**
 * @swagger
 * /admin/all-doctors:
 *   get:
 *     summary: Get all doctors
 *     description: Retrieves a list of all doctors in the clinic.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   specialty:
 *                     type: string
 *                   availability:
 *                     type: boolean
 *       401:
 *         description: Unauthorized access
 */
adminRouter.get("/all-doctors", authAdmin, allDoctors)
/**
 * @swagger
 * /admin/change-availability:
 *   post:
 *     summary: Change doctor availability
 *     description: Allows an admin to change the availability of a doctor.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctorId:
 *                 type: string
 *                 description: The ID of the doctor whose availability is to be changed
 *               available:
 *                 type: boolean
 *                 description: The new availability status of the doctor
 *     responses:
 *       200:
 *         description: Availability status updated successfully.
 *       401:
 *         description: Unauthorized access.
 */

adminRouter.post("/change-availability", authAdmin, changeAvailablity)
/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Get admin dashboard data
 *     description: Retrieves summary data for the admin dashboard, such as total appointments, total doctors, etc.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalAppointments:
 *                   type: integer
 *                 totalDoctors:
 *                   type: integer
 *                 activePatients:
 *                   type: integer
 *       401:
 *         description: Unauthorized access
 */
adminRouter.get("/dashboard", authAdmin, adminDashboard)

export default adminRouter;