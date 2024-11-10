import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import messageRoutes from "./routes/messageRoutes.js";
import swaggerJsDoc from 'swagger-jsdoc'; // Use this for ES module
import swaggerUi from 'swagger-ui-express'; // Use this for ES module
import { rescheduleAppointment } from './controllers/userController.js';


// Application of Limiter (limits number of requests)
import rateLimit from "express-rate-limit";

// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Setting up the limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes."
});

// API DOCUMENTATION
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MyJoy Medical Clinic Appointment API",
      version: "1.0.0",
      description: "API documentation for Health Clinic Appointment System",
      contact: {
        name: "Support Team",
        email: "myjoymedicalclinic@gmail.com"
      },
    },
    servers: [
      { url: "http://localhost:4000/api" }, // Match your server port
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middlewares
app.use(express.json());
app.use(cors());
app.use(limiter);

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api", messageRoutes);
app.post('/api/user/reschedule-appointment', rescheduleAppointment);


app.get("/", (req, res) => {
  res.send("API Working well");
});

app.listen(port, () => console.log(`Server started on PORT:${port}`));
