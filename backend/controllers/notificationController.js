import Notification from '../models/notificationModel.js';

// Create a new notification
export const createNotification = async (req, res) => {
    try {
        const { userId, message } = req.body;
        const newNotification = new Notification({ userId, message });
        await newNotification.save();
        res.status(201).json({ success: true, notification: newNotification });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating notification', error: error.message });
    }
};

// Get all notifications for a user
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.userId }).populate('userId', 'name email');
        res.status(200).json({ success: true, notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching notifications', error: error.message });
    }
};

// Mark a notification as read
export const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
        if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
        res.status(200).json({ success: true, notification });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating notification', error: error.message });
    }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
        res.status(200).json({ success: true, message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting notification', error: error.message });
    }
};
