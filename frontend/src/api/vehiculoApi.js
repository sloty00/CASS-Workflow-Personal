import axios from "axios";

const createVehiculo = async (vehiculo) => {
    return await axios.post("http://localhost:5000/vehiculo", vehiculo);
};

const getVehiculoById = async (Id) => {
    const response = await axios.get(`http://localhost:5000/vehiculo/${Id}`);
    return response.data;
};

const updateVehiculo = async (Id, vehiculo) => {
    return await axios.patch(`http://localhost:5000/vehiculo/${Id}`, vehiculo);
};

const fetchVehiculos = async (page, pageSize) => {
    const response = await axios.get(`http://localhost:5000/vehiculo?page=${page}&pageSize=${pageSize}`);
    return response.data;
};

const deleteVehiculoById = async (id) => {
    return await axios.delete(`http://localhost:5000/vehiculo/${id}`);
};

export { createVehiculo, updateVehiculo, getVehiculoById, fetchVehiculos, deleteVehiculoById };