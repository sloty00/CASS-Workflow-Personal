import express from "express";
import {
        getVacaciones,
        getVacacionesJoin, 
        getVacacionesById, 
        createVacaciones, 
        updateVacaciones,
        deleteVacaciones
        } from "../controllers/VacacionesController.js";

const router = express.Router();

router.get('/vacaciones', getVacaciones);
router.get('/vacacionesJoin', getVacacionesJoin);
router.get('/vacaciones/:Id', getVacacionesById);
router.post('/vacaciones', createVacaciones);
router.patch('/vacaciones/:Id', updateVacaciones);
router.delete('/vacaciones/:Id', deleteVacaciones);

export default router;