import { PrismaClient } from "@prisma/client";
import { paginate } from "../helpers/pagination.js";

const prisma = new PrismaClient();

export const getPermiso = async (req, res) => {
    const { page = 1, limit = 100 } = req.query;
    try {
        const result = await paginate(prisma.permisos, parseInt(page), parseInt(limit));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getPermisoJoin = async (req, res) => {
    const { page = 0, pageSize = 10 } = req.query;  // Default page to 0 if not provided
    try {
        // Asegurar que page y pageSize sean números enteros positivos
        const pageNumber = Math.max(parseInt(page), 0);
        const pageSizeNumber = Math.max(parseInt(pageSize), 1);

        // Calcular el valor correcto de skip
        const skip = pageNumber * pageSizeNumber;

        const [data, total] = await Promise.all([
            prisma.permisos.findMany({
                include: {
                    personal: true,
                },
                skip: skip,
                take: pageSizeNumber,
            }),
            prisma.permisos.count(),
        ]);

        res.status(200).json({ data, total });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

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