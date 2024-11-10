import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    diagnosis: { type: String, required: true },
    treatment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const reportModel = mongoose.models.report || mongoose.model("report", reportSchema);
export default reportModel;
