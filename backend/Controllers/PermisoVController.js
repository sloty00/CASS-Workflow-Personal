import { PrismaClient } from "@prisma/client";
import { response } from "express";
import { json } from "stream/consumers";

const prisma = new PrismaClient();

export const getPermisoVJoin = async (req, res) => {
    try {
        const response = await prisma.p_vehiculo.findMany({
            include:{
                pers_pvehiculo: true,
                vehi_pvehiculo: true,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getPermisoV = async (req, res) => {
    try {
        const response = await prisma.p_vehiculo.findMany({
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getPermisoVById = async (req, res) => {
    try {
        const response = await prisma.p_vehiculo.findUnique({
            where: {
                Id: Number(req.params.Id)
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

export const createPermisoV = async (req, res) => {
    const { PV_Rut, PV_Patente, F_permiso, Validar } = req.body;
    try {
        const p_vehiculo = await prisma.p_vehiculo.create({
            data: {
                PV_Rut: PV_Rut,
                PV_Patente: PV_Patente,
                F_permiso: F_permiso,
                Validar: Validar,
            }
        });
        res.status(201).json(p_vehiculo);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
    
}

export const updatePermisoV = async (req, res) => {
    const { PV_Rut, PV_Patente, F_permiso, Validar } = req.body;
    try {
        const p_vehiculo = await prisma.p_vehiculo.update({
            where: {
                Id: Number(req.params.Id)
            },
            data: {
                PV_Rut: PV_Rut,
                PV_Patente: PV_Patente,
                F_permiso: F_permiso,
                Validar: Validar,
            }
        });
        res.status(200).json(p_vehiculo);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deletePermisoV = async (req, res) => {
    try {
        const p_vehiculo = await prisma.p_vehiculo.delete({
            where: {
                Id: Number(req.params.Id)
            }
        });
        res.status(200).json(p_vehiculo);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}