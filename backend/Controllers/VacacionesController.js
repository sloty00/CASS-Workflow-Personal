import { PrismaClient } from "@prisma/client";
import { paginate } from "../helpers/pagination.js";

const prisma = new PrismaClient();

export const getVacaciones = async (req, res) => {
    const { page = 1, limit = 100 } = req.query;
    try {
        const result = await paginate(prisma.vacaciones, parseInt(page), parseInt(limit));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getVacacionesJoin = async (req, res) => {
    const { page = 1, pageSize = 100 } = req.query;
    try {
        // Asegurar que page y pageSize sean números enteros positivos
        const pageNumber = Math.max(parseInt(page), 1);
        const pageSizeNumber = Math.max(parseInt(pageSize), 1);

        // Calcular el valor correcto de skip
        const skip = (pageNumber - 1) * pageSizeNumber;

        const [data, total] = await Promise.all([
            prisma.vacaciones.findMany({
                include:{
                    pers_vacaciones: true,
                },
                skip,
                take: pageSizeNumber,
            }),
            prisma.vacaciones.count(),
        ]);
        res.status(200).json({ data, total });
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