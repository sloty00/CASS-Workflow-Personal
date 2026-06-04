import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import useSWR from "swr";

const VacacionesEdit = () => {
    const [V_Rut, setV_Rut] = useState("");
    const [Fecha_Salida, setFecha_Salida] = useState("");
    const [Dias_vacaciones, setDias_vacaciones] = useState("");
    const navigate = useNavigate();
    const {Id} = useParams();

    useEffect(()=> {
        const getVacacionesById = async () => {
            const response = await axios.get(`http://localhost:5000/vacaciones/${Id}`);
            setV_Rut(response.data.V_Rut);
            setFecha_Salida(response.data.Fecha_Salida);
            setDias_vacaciones(response.data.Dias_vacaciones);
        };
        getVacacionesById();
    },[Id]);

    const VacacionesUpdate = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/vacaciones/${Id}`, {
            V_Rut: V_Rut,
            Fecha_Salida: Fecha_Salida,
            Dias_vacaciones: parseInt(Dias_vacaciones),
        });
        navigate("/");
    }

    const fetcher = async () => {
        const response = await axios.get('http://localhost:5000/personal');
        return response.data;
    };
    const {data} = useSWR('personal', fetcher);
    if(!data) return <h2>Cargando...</h2>;

  return (
    <div className='max-wg-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
        <h4><center>Editar Permisos</center></h4><br></br>
        <form onSubmit={VacacionesUpdate} className='my-10'>
            <div className='flex flex-col'>
                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Rut: </label>
                    <input type="text" id='V_Rut' name='V_Rut' readOnly={true} className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Marca' value={V_Rut} onChange={(e)=>setV_Rut(e.target.value)}/>
                </div>

                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Fecha Salida: </label>
                    <input type="date" id='Fecha_Salida' name='Fecha_Salida' className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Marca' value={Fecha_Salida} onChange={(e)=>setFecha_Salida(e.target.value)}/>
                </div>
                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Dias Vacaciones: </label>
                    <input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Modelo' value={Dias_vacaciones} onChange={(e)=>setDias_vacaciones(e.target.value)}/>
                </div>
                <button type="submit" className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow">Guardar</button>
            </div>
        </form>
    </div>
  )
}

export default VacacionesEdit
