import { PrismaClient } from "@prisma/client";
import { paginate } from "../helpers/pagination.js";

const prisma = new PrismaClient();

export const getPersonal = async (req, res) => {
    const { page = 1, pageSize = 3 } = req.query;
    try {
        console.log(`Fetching page ${page} with page size ${pageSize}`);
        const result = await paginate(prisma.personal, parseInt(page), parseInt(pageSize));
        console.log(`Retrieved ${result.items.length} items`);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const getPersonalById = async (req, res) => {
    try {
        const response = await prisma.personal.findUnique({
            where: {
                Id: Number(req.params.Id)
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

export const createPersonal = async (req, res) => {
    const { Rut, Nombre, Apellidos, Sector, Email, Telefono, Direccion, Comuna, Provincia } = req.body;
    try {
        const personal = await prisma.personal.create({
            data: {
                Rut: Rut,
                Nombre: Nombre,
                Apellidos: Apellidos,
                Sector: Sector,
                Email: Email,
                Telefono: Telefono,
                Direccion: Direccion,
                Comuna: Comuna,
                Provincia: Provincia
            }
        });
        res.status(201).json(personal);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
    
}

export const updatePersonal = async (req, res) => {
    const { Rut, Nombre, Apellidos, Sector, Email, Telefono, Direccion, Comuna, Provincia } = req.body;
    try {
        const personal = await prisma.personal.update({
            where: {
                Id: Number(req.params.Id)
            },
            data: {
                Rut: Rut,
                Nombre: Nombre,
                Apellidos: Apellidos,
                Sector: Sector,
                Email: Email,
                Telefono: Telefono,
                Direccion: Direccion,
                Comuna: Comuna,
                Provincia: Provincia
            }
        });
        res.status(200).json(personal);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deletePersonal = async (req, res) => {
    try {
        const personal = await prisma.personal.delete({
            where: {
                Id: Number(req.params.Id)
            }
        });
        res.status(200).json(personal);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}