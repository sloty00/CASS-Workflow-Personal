import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import PersonalRoute from "./routes/PersonalRoute.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(PersonalRoute);

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and Running...');
});