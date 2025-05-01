import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();


app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Add CORS configuration before routes
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://lost-and-found-frontend-a2a6.onrender.com", // Replace with your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/responses", responseRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

app.post('/api/login', (req, res) => {
  res.json({ message: 'Login success' });
});

app.get('/', (req, res) => {
  res.send('Welcome to the Lost & Found Zone API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




