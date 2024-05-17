import { PrismaClient } from "@prisma/client";
import { response } from "express";
import { json } from "stream/consumers";

const prisma = new PrismaClient();

export const getChecklistJoin = async (req, res) => {
    try {
        const response = await prisma.chk_vehiculo.findMany({
            include:{
                pers_chkvehiculo: true,
                vehi_chkvehiculo: true,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getChecklist = async (req, res) => {
    try {
        const response = await prisma.chk_vehiculo.findMany({
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getChecklistById = async (req, res) => {
    try {
        const response = await prisma.chk_vehiculo.findUnique({
            where: {
                Id: Number(req.params.Id)
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

export const createChecklist = async (req, res) => {
    const { Chk_Rut, Chk_Patente, Km_salida, Km_llegada } = req.body;
    try {
        const chk_vehiculo = await prisma.chk_vehiculo.create({
            data: {
                Chk_Rut: Chk_Rut,
                Chk_Patente: Chk_Patente,
                Km_salida: Km_salida,
                Km_llegada: Km_llegada,
            }
        });
        res.status(201).json(chk_vehiculo);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
    
}

export const updateChecklist = async (req, res) => {
    const { Chk_Rut, Chk_Patente, Km_salida, Km_llegada } = req.body;
    try {
        const chk_vehiculo = await prisma.chk_vehiculo.update({
            where: {
                Id: Number(req.params.Id)
            },
            data: {
                Chk_Rut: Chk_Rut,
                Chk_Patente: Chk_Patente,
                Km_salida: Km_salida,
                Km_llegada: Km_llegada,
            }
        });
        res.status(200).json(chk_vehiculo);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteChecklist = async (req, res) => {
    try {
        const chk_vehiculo = await prisma.chk_vehiculo.delete({
            where: {
                Id: Number(req.params.Id)
            }
        });
        res.status(200).json(chk_vehiculo);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}