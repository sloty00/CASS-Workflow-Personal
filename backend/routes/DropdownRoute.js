import express from "express";
import {
    getDropdownV,
    getDropdownP,
        } from "../Controllers/Dropdownlist.js";

const router = express.Router();

router.get('/dropdown/v', getDropdownV);
router.get('/dropdown/p', getDropdownP);

export default router;