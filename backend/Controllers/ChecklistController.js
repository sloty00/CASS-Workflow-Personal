import { PrismaClient } from "@prisma/client";
import { paginate } from "../helpers/pagination.js";  // Asegúrate de importar tu helper de paginación

const prisma = new PrismaClient();

export const getChecklist = async (req, res) => {
    const { page = 1, limit = 100 } = req.query;  // Obtener los parámetros de paginación de la query string
    try {
        const result = await paginate(prisma.chk_vehiculo, parseInt(page), parseInt(limit));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getChecklistJoin = async (req, res) => {
    const { page = 0, pageSize = 10 } = req.query;
    try {
        // Asegurar que page y pageSize sean números enteros positivos
        const pageNumber = Math.max(parseInt(page), 0);
        const pageSizeNumber = Math.max(parseInt(pageSize), 1);

        // Calcular el valor correcto de skip
        const skip = pageNumber * pageSizeNumber;

        const [data, total] = await Promise.all([
            prisma.chk_vehiculo.findMany({
                include: {
                    pers_chkvehiculo: true,
                    vehi_chkvehiculo: true,
                },
                skip: skip,
                take: pageSizeNumber,
            }),
            prisma.chk_vehiculo.count(),
        ]);
        res.status(200).json({ data, total });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

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