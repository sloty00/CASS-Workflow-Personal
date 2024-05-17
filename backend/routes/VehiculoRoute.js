import express from "express";
import {
        getVehiculo, 
        getVehiculoById, 
        createVehiculo, 
        updateVehiculo,
        deleteVehiculo
        } from "../controllers/VehiculoController.js";

const router = express.Router();

router.get('/vehiculo', getVehiculo);
router.get('/vehiculo/:Id', getVehiculoById);
router.post('/vehiculo', createVehiculo);
router.patch('/vehiculo/:Id', updateVehiculo);
router.delete('/vehiculo/:Id', deleteVehiculo);

export default router;