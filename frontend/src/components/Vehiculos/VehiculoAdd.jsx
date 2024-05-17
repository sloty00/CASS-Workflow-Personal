import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase.js";
import { onAuthStateChanged } from 'firebase/auth';

import 'react-datepicker/dist/react-datepicker.css';

const VehiculoAdd = () => {
    const [Patente, setPatente] = useState("");
    const [Marca, setMarca] = useState("");
    const [Modelo, setModelo] = useState("");
    const [Ano, setAno] = useState("");
    const [Fecha_ptte, setFecha_ptte] = useState("");
    const [Fecha_rvs, setFecha_rvs] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(false); // Indicamos que la autenticación ha terminado y se puede renderizar
            if (!user) {
                navigate("/"); // Redirigir al usuario no autenticado a la página de inicio
            }
        });
    
        return () => {
          unsubscribe();
        };
    }, [navigate]);

    const createVehiculo = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/vehiculo", {
            Patente: Patente,
            Marca: Marca,
            Modelo: Modelo,
            Ano: parseInt(Ano),
            Fecha_ptte : Fecha_ptte,
            Fecha_rvs: Fecha_rvs,
        });
        navigate("/vehiculo"); // Después de crear el vehículo, redirigir a la página principal
    }

    if (loading) return <h2>Cargando...</h2>;

    return (
        <div className='max-wg-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
            <h4><center>Agregar Vehiculo</center></h4><br></br>
            <form onSubmit={createVehiculo} className='my-10'>
                <div className='flex flex-col'>
                    <div className='form-group mb-5'>
                        <label className='font-bold text-slate-700'>Patente: </label>
                        <input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Patente' value={Patente} onChange={(e)=>setPatente(e.target.value)}/>
                    </div>
                    <div className='form-group mb-5'>
                        <label className='font-bold text-slate-700'>Marca: </label>
                        <input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Marca' value={Marca} onChange={(e)=>setMarca(e.target.value)}/>
                    </div>
                    <div className='form-group mb-5'>
                        <label className='font-bold text-slate-700'>Modelo: </label>
                        <input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Modelo' value={Modelo} onChange={(e)=>setModelo(e.target.value)}/>
                    </div>
                    <div className='form-group mb-5'>
                        <label className='font-bold text-slate-700'>Año: </label>
                        <input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Año' value={Ano} onChange={(e)=>setAno(e.target.value)}/>
                    </div>
                    <div className='form-group mb-5'>
                        <label className='font-bold text-slate-700'>Fecha Permiso: </label>
                        <input type="date" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Fecha Patente' value={Fecha_ptte} onChange={(e)=>setFecha_ptte(e.target.value)}/>
                    </div>
                    <div className='form-group mb-5'>
                        <label className='font-bold text-slate-700'>Fecha Revision: </label>
                        <input type="date" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Fecha Revision' value={Fecha_rvs} onChange={(e)=>setFecha_rvs(e.target.value)}/>
                    </div>
                    <button type="submit" className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow">Guardar</button>
                </div>
            </form>
        </div>
    )
}

export default VehiculoAdd;
