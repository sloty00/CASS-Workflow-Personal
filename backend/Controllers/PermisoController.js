import { PrismaClient } from "@prisma/client";
import { response } from "express";
import { json } from "stream/consumers";

const prisma = new PrismaClient();

export const getPermisoJoin = async (req, res) => {
    try {
        const response = await prisma.permisos.findMany({
            include:{
                personal: true,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getPermiso = async (req, res) => {
    try {
        const response = await prisma.permisos.findMany({
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getPermisoById = async (req, res) => {
    try {
        const response = await prisma.permisos.findUnique({
            where: {
                Id: Number(req.params.Id)
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

export const createPermiso = async (req, res) => {
    const { P_Rut, F_permiso, Dias, Descripcion } = req.body;
    try {
        const permisos = await prisma.permisos.create({
            data: {
                P_Rut: P_Rut,
                F_permiso: F_permiso,
                Dias: Dias,
                Descripcion: Descripcion,
            }
        });
        res.status(201).json(permisos);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
    
}

export const updatePermiso = async (req, res) => {
    const { P_Rut, F_permiso, Dias, Descripcion } = req.body;
    try {
        const permisos = await prisma.permisos.update({
            where: {
                Id: Number(req.params.Id)
            },
            data: {
                P_Rut: P_Rut,
                F_permiso: F_permiso,
                Dias: Dias,
                Descripcion: Descripcion,
            }
        });
        res.status(200).json(permisos);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deletePermiso = async (req, res) => {
    try {
        const permisos = await prisma.permisos.delete({
            where: {
                Id: Number(req.params.Id)
            }
        });
        res.status(200).json(permisos);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}