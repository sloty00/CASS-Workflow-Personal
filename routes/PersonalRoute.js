import express from "express";
import {
        getPersonal, 
        getPersonalById, 
        createPersonal, 
        updatePersonal,
        deletePersonal
        } from "../Controllers/PersonalController.js";

const router = express.Router();

router.get('/personal', getPersonal);
router.get('/personal/:id', getPersonalById);
router.post('/personal', createPersonal);
router.patch('/personal/:id', updatePersonal);
router.delete('/personal/:id', deletePersonal);

export default router;
