import express from "express";
import {
        getPermiso,
        getPermisoJoin, 
        getPermisoById, 
        createPermiso, 
        updatePermiso,
        deletePermiso
        } from "../controllers/PermisoController.js";
const router = express.Router();

router.get('/permisos', getPermiso);
router.get('/permisoJoin', getPermisoJoin);
router.get('/permisos/:Id', getPermisoById);
router.post('/permisos', createPermiso);
router.patch('/permisos/:Id', updatePermiso);
router.delete('/permisos/:Id', deletePermiso);

export default router;