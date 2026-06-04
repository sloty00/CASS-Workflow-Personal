import { PrismaClient } from "@prisma/client";
import { response } from "express";
import { json } from "stream/consumers";

const prisma = new PrismaClient();

export const getVacacionesJoin = async (req, res) => {
    try {
        const response = await prisma.vacaciones.findMany({
            include:{
                pers_vacaciones: true,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getVacaciones = async (req, res) => {
    try {
        const response = await prisma.vacaciones.findMany({
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getVacacionesById = async (req, res) => {
    try {
        const response = await prisma.vacaciones.findUnique({
            where: {
                Id: Number(req.params.Id)
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

export const createVacaciones = async (req, res) => {
    const { V_Rut, Fecha_Salida, Dias_vacaciones } = req.body;
    try {
        const vacaciones = await prisma.vacaciones.create({
            data: {
                V_Rut: V_Rut,
                Fecha_Salida: Fecha_Salida,
                Dias_vacaciones: Dias_vacaciones,
            }
        });
        res.status(201).json(vacaciones);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
    
}

export const updateVacaciones = async (req, res) => {
    const { V_Rut, Fecha_Salida, Dias_vacaciones } = req.body;
    try {
        const vacaciones = await prisma.vacaciones.update({
            where: {
                Id: Number(req.params.Id)
            },
            data: {
                V_Rut: V_Rut,
                Fecha_Salida: Fecha_Salida,
                Dias_vacaciones: Dias_vacaciones,
            }
        });
        res.status(200).json(vacaciones);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteVacaciones = async (req, res) => {
    try {
        const vacaciones = await prisma.vacaciones.delete({
            where: {
                Id: Number(req.params.Id)
            }
        });
        res.status(200).json(vacaciones);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}