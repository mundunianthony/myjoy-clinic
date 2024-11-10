import express from 'express';
import rateLimit from 'express-rate-limit'; 
import {
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
  paymentStripe,
  verifyStripe,
  rescheduleAppointment 
} from '../controllers/userController.js';
import upload from '../middleware/multer.js';
import authUser from '../middleware/authUser.js';

const userRouter = express.Router();

// Defined the rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
  message: 'Too many requests from this IP, please try again later.',
});

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
userRouter.post("/register", limiter, registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.post("/login", limiter, loginUser);

/**
 * @swagger
 * /users/get-profile:
 *   get:
 *     summary: Retrieve user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.get("/get-profile", authUser, getProfile);

/**
 * @swagger
 * /users/update-profile:
 *   post:
 *     summary: Update user profile
 *     tags: [Users]
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
 *               email:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad request
 */
userRouter.post("/update-profile", upload.single('image'), authUser, updateProfile);

/**
 * @swagger
 * /users/book-appointment:
 *   post:
 *     summary: Book an appointment
 *     tags: [Users]
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
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 format: time
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 *       400:
 *         description: Bad request
 */
userRouter.post("/book-appointment", authUser, bookAppointment);

/**
 * @swagger
 * /users/appointments:
 *   get:
 *     summary: List user appointments
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of appointments retrieved successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.get("/appointments", authUser, listAppointment);

/**
 * @swagger
 * /users/cancel-appointment:
 *   post:
 *     summary: Cancel an appointment
 *     tags: [Users]
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
 *     responses:
 *       200:
 *         description: Appointment cancelled successfully
 *       404:
 *         description: Appointment not found
 */
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

/**
 * @swagger
 * /users/payment-razorpay:
 *   post:
 *     summary: Initiate a payment with Razorpay
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Razorpay payment initiated
 *       400:
 *         description: Bad request
 */
userRouter.post("/payment-razorpay", authUser, paymentRazorpay);

/**
 * @swagger
 * /users/verifyRazorpay:
 *   post:
 *     summary: Verify Razorpay payment
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Razorpay payment verified
 *       400:
 *         description: Verification failed
 */
userRouter.post("/verifyRazorpay", authUser, verifyRazorpay);

/**
 * @swagger
 * /users/payment-stripe:
 *   post:
 *     summary: Initiate a payment with Stripe
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stripe payment initiated
 *       400:
 *         description: Bad request
 */
userRouter.post("/payment-stripe", authUser, paymentStripe);

/**
 * @swagger
 * /users/verifyStripe:
 *   post:
 *     summary: Verify Stripe payment
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stripe payment verified
 *       400:
 *         description: Verification failed
 */
userRouter.post("/verifyStripe", authUser, verifyStripe);

userRouter.post('/reschedule-appointment', rescheduleAppointment);


export default userRouter;
