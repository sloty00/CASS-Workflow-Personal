import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PersonalDelete = () => {
    const { id } = useParams(); // Obtener el ID de los parámetros de la URL
    const navigate = useNavigate(); // Obtener la función de navegación
    const [showConfirmation, setShowConfirmation] = useState(false); // Estado para mostrar el mensaje de confirmación

    useEffect(() => {
        const getPersonalById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/personal/${id}`);
                // Manejar la respuesta si es necesario
            } catch (error) {
                console.error('Error al obtener el personal:', error);
            }
        };
        getPersonalById();
    }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:5000/personal/${id}`);
            navigate("/"); // Redirigir después de eliminar
        } catch (error) {
            console.error('Error al eliminar el personal:', error);
        }
    }

    const toggleConfirmation = () => {
        setShowConfirmation(!showConfirmation);
    }

    return (
        <div className='max-wg-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
            {showConfirmation && (
                <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-xl shadow">
                        <p>¿Estás seguro de que quieres eliminar este registro?</p>
                        <div className="flex justify-between mt-4">
                            <button onClick={toggleConfirmation} className="px-4 py-2 bg-gray-300 rounded-lg">Cancelar</button>
                            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg">Eliminar</button>
                        </div>
                    </div>
                </div>
            )}
            <form onSubmit={toggleConfirmation} className='my-10'>
                <div className='flex flex-col'>
                    <button type="submit" className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow">Eliminar</button>
                </div>
            </form>
        </div>
    )
}

export default PersonalDelete;