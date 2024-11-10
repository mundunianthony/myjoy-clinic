import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, required: true },
    timeSlots: { 
        type: [String], 
        required: true 
    },
    isAvailable: { type: Boolean, default: true }
});

const scheduleModel = mongoose.models.schedule || mongoose.model("schedule", scheduleSchema);
export default scheduleModel;
