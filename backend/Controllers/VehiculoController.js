import { PrismaClient } from "@prisma/client";
import { paginate } from "../helpers/pagination.js";

const prisma = new PrismaClient();

export const getVehiculo = async (req, res) => {
    const { page = 1, pageSize = 100 } = req.query;
    try {
        const result = await paginate(prisma.vehiculo, parseInt(page), parseInt(pageSize));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getVehiculoById = async (req, res) => {
    try {
        const response = await prisma.vehiculo.findUnique({
            where: {
                Id: Number(req.params.Id)
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

export const createVehiculo = async (req, res) => {
    const { Patente, Marca, Modelo, Ano, Fecha_ptte, Fecha_rvs } = req.body;
    try {
        const vehiculo = await prisma.vehiculo.create({
            data: {
                Patente: Patente,
                Marca: Marca,
                Modelo: Modelo,
                Ano: Ano,
                Fecha_ptte:Fecha_ptte,
                Fecha_rvs: Fecha_rvs,
            }
        });
        res.status(201).json(vehiculo);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
    
}

export const updateVehiculo = async (req, res) => {
    const { Patente, Marca, Modelo, Ano, Fecha_ptte, Fecha_rvs } = req.body;
    try {
        const vehiculo = await prisma.vehiculo.update({
            where: {
                Id: Number(req.params.Id)
            },
            data: {
                Patente: Patente,
                Marca: Marca,
                Modelo: Modelo,
                Ano: Ano,
                Fecha_ptte:Fecha_ptte,
                Fecha_rvs: Fecha_rvs,
            }
        });
        res.status(200).json(vehiculo);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteVehiculo = async (req, res) => {
    try {
        const vehiculo = await prisma.vehiculo.delete({
            where: {
                Id: Number(req.params.Id)
            }
        });
        res.status(200).json(vehiculo);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}