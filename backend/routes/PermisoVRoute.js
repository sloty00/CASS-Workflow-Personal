import express from "express";
import {
    getPermisoV,
    getPermisoVJoin,
    getPermisoVById,
    createPermisoV,
    updatePermisoV,
    deletePermisoV
} from "../Controllers/PermisoVController.js";

const router = express.Router();

router.get('/permisosv', getPermisoV);
router.get('/permisoJoinv', getPermisoVJoin);
router.get('/permisosv/:Id', getPermisoVById);
router.post('/permisosv', createPermisoV);
router.patch('/permisosv/:Id', updatePermisoV);
router.delete('/permisosv/:Id', deletePermisoV);

export default router;