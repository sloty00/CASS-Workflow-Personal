import { PrismaClient } from "@prisma/client";
import { response } from "express";
import { json } from "stream/consumers";

const prisma = new PrismaClient();

export const getPersonal = async (req, res) => {
    try {
        const response = await prisma.personal.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

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