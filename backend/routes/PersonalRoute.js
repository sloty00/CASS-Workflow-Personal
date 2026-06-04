import express from "express";
import {
        getPersonal, 
        getPersonalById, 
        createPersonal, 
        updatePersonal,
        deletePersonal
        } from "../controllers/PersonalController.js";

const router = express.Router();

router.get('/personal', getPersonal);
router.get('/personal/:Id', getPersonalById);
router.post('/personal', createPersonal);
router.patch('/personal/:Id', updatePersonal);
router.delete('/personal/:Id', deletePersonal);

export default router;
