import { PrismaClient } from "@prisma/client";
import { paginate } from "../helpers/pagination.js";

const prisma = new PrismaClient();

export const getPermisoV = async (req, res) => {
    const { page = 1, limit = 100 } = req.query;
    try {
        const result = await paginate(prisma.p_vehiculo, parseInt(page), parseInt(limit));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getPermisoVJoin = async (req, res) => {
    const { page = 1, pageSize = 100 } = req.query;
    try {
        // Asegurar que page y pageSize sean números enteros positivos
        const pageNumber = Math.max(parseInt(page), 0);
        const pageSizeNumber = Math.max(parseInt(pageSize), 1);

        // Calcular el valor correcto de skip
        const skip = pageNumber * pageSizeNumber;

        const [data, total] = await Promise.all([
            prisma.p_vehiculo.findMany({
                include: {
                    pers_pvehiculo: true,
                    vehi_pvehiculo: true,
                },
                skip: skip,
                take: pageSizeNumber,
            }),
            prisma.p_vehiculo.count(),
        ]);
        res.status(200).json({ data, total });
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getPermisoVById = async (req, res) => {
    try {
        const response = await prisma.p_vehiculo.findUnique({
            where: {
                Id: Number(req.params.Id),
            },
        });
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(404).json({ msg: "Permiso no encontrado" });
    }
}

export const createPermisoV = async (req, res) => {
    const { PV_Rut, PV_Patente, F_permiso, Validar } = req.body;
    try {
        const p_vehiculo = await prisma.p_vehiculo.create({
            data: {
                PV_Rut,
                PV_Patente,
                F_permiso,
                Validar,
            },
        });
        res.status(201).json(p_vehiculo);
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Ocurrió un error al crear el permiso" });
    }
}

export const updatePermisoV = async (req, res) => {
    const { PV_Rut, PV_Patente, F_permiso, Validar } = req.body;
    try {
        const p_vehiculo = await prisma.p_vehiculo.update({
            where: {
                Id: Number(req.params.Id),
            },
            data: {
                PV_Rut,
                PV_Patente,
                F_permiso,
                Validar,
            },
        });
        res.status(200).json(p_vehiculo);
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Ocurrió un error al actualizar el permiso" });
    }
}

export const deletePermisoV = async (req, res) => {
    try {
        const p_vehiculo = await prisma.p_vehiculo.delete({
            where: {
                Id: Number(req.params.Id),
            },
        });
        res.status(200).json(p_vehiculo);
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Ocurrió un error al eliminar el permiso" });
    }
}