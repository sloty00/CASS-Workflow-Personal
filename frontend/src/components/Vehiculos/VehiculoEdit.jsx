import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const VehiculoEdit = () => {
    const [Patente, setPatente] = useState("");
    const [Marca, setMarca] = useState("");
    const [Modelo, setModelo] = useState("");
    const [Ano, setAno] = useState("");
    const [Fecha_ptte, setFecha_ptte] = useState("");
    const [Fecha_rvs, setFecha_rvs] = useState("");
    const navigate = useNavigate();
    const {Id} = useParams();

    useEffect(()=> {
        const getVehiculoById = async () => {
            const response = await axios.get(`http://localhost:5000/vehiculo/${Id}`);
            setPatente(response.data.Patente);
            setMarca(response.data.Marca);
            setModelo(response.data.Modelo);
            setAno(response.data.Ano);
            setFecha_ptte(response.data.Fecha_ptte);
            setFecha_rvs(response.data.Fecha_rvs);
        };
        getVehiculoById();
    },[Id]);

    const VehiculoUpdate = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/vehiculo/${Id}`, {
            //Nombre: parseInt(Nombre),
            Patente: Patente,
            Marca: Marca,
            Modelo: Modelo,
            Ano: parseInt(Ano),
            Fecha_ptte: Fecha_ptte,
            Fecha_rvs: Fecha_rvs,
        });
        navigate("/");
    }
  return (
    <div className='max-wg-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
        <h4><center>Editar Vehiculo</center></h4><br></br>
        <form onSubmit={VehiculoUpdate} className='my-10'>
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
                    <label className='font-bold text-slate-700'>Fecha_ptte: </label>
                    <input type="date" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Fecha Patente' value={Fecha_ptte} onChange={(e)=>setFecha_ptte(e.target.value)}/>
                </div>
                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Fecha_rev: </label>
                    <input type="date" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Fecha Revision' value={Fecha_rvs} onChange={(e)=>setFecha_rvs(e.target.value)}/>
                </div>
                <button type="submit" className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow">Guardar</button>
            </div>
        </form>
      
    </div>
  )
}

export default VehiculoEdit;
