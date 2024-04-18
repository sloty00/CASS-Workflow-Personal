import { PrismaClient } from "@prisma/client";

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
                Rut: req.params.Rut
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

export const createPersonal = (req, res) => {
    
}

export const updatePersonal = (req, res) => {
    
}

export const deletePersonal = (req, res) => {
    
}