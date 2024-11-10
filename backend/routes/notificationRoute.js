import express from 'express';
import { createNotification, getNotifications, markAsRead, deleteNotification } from '../controllers/notificationController.js';
import authUser from '../middleware/authUser.js';

const notificationRouter = express.Router();

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user for whom the notification is created
 *               message:
 *                 type: string
 *                 description: The content of the notification message
 *     responses:
 *       201:
 *         description: Notification created successfully
 *       400:
 *         description: Bad request
 */
// Create a notification
notificationRouter.post('/', authUser, createNotification);

/**
 * @swagger
 * /notifications/{userId}:
 *   get:
 *     summary: Get notifications for a specific user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve notifications for
 *     responses:
 *       200:
 *         description: List of notifications retrieved successfully
 *       404:
 *         description: User or notifications not found
 */
// Get notifications for a specific user
notificationRouter.get('/:userId', authUser, getNotifications);

/**
 * @swagger
 * /notifications/read/{id}:
 *   patch:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the notification to mark as read
 *     responses:
 *       200:
 *         description: Notification marked as read successfully
 *       404:
 *         description: Notification not found
 */

// Mark notification as read
notificationRouter.patch('/read/:id', authUser, markAsRead);

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the notification to delete
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       404:
 *         description: Notification not found
 */

// Delete a notification
notificationRouter.delete('/:id', authUser, deleteNotification);

export default notificationRouter;
