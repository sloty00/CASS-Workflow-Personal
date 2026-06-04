import { PrismaClient } from "@prisma/client";
import { response } from "express";
import { json } from "stream/consumers";

const prisma = new PrismaClient();

export const getDropdownV = async (req, res) => {
    try {
        const response = await prisma.vehiculo.findMany({});
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getDropdownP = async (req, res) => {
    try {
        const response = await prisma.personal.findMany({});
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
