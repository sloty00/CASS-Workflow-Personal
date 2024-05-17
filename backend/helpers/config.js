const jwt = require('express-jwt');
import dotenv from "dotenv";
dotenv.config();

const secret = {secret : process.env.JWT_ACCESS_SECRET}