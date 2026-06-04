import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import useSWR from "swr";

const PermisoAdd = () => {
    const [P_Rut, setP_Rut] = useState("");
    const [F_permiso, setF_permiso] = useState("");
    const [Dias, setDias] = useState("");
    const [Descripcion, setDescripcion] = useState("");
    const navigate = useNavigate();

    const createPermisos = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/permisos", {
           P_Rut: P_Rut,
           F_permiso: F_permiso,
           Dias: parseInt(Dias),
           Descripcion: Descripcion,
        });
        navigate("/permisos");
    }

    const fetcher = async () => {
        const response = await axios.get('http://localhost:5000/dropdown/p');
        return response.data;
    };
    const {data} = useSWR('personal', fetcher);
    if(!data) return <h2>Cargando...</h2>;

  return (
    <div className='max-wg-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
        <h4><center>Agregar Permisos</center></h4><br></br>
        <form onSubmit={createPermisos} className='my-10'>
            <div className='flex flex-col'>
                <div className='form-group mb-5'>
                <label className='font-bold text-slate-700'>Rut: {P_Rut}</label>
                    <select class="form-select" size="3" aria-label="size 2 select example" onChange={(e)=>setP_Rut(e.target.value)}>
                        {data.map((personal)=>(
                                <option id='P_Rut' name='P_Rut' value={personal.Rut}>{personal.Nombre + " " + personal.Apellidos}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Fecha Permiso: </label>
                    <input type="date" id='F_permiso' name='F_permiso' className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Fecha de permiso' value={F_permiso} onChange={(e)=>setF_permiso(e.target.value)}/>
                </div>
                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Dias: </label>
                    <input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Dias de permiso' value={Dias} onChange={(e)=>setDias(e.target.value)}/>
                </div>
                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Descripcion: </label>
                    <input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Motivo del permiso' value={Descripcion} onChange={(e)=>setDescripcion(e.target.value)}/>
                </div>
                <button type="submit" className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow">Guardar</button>
            </div>
        </form>
    </div>
  )
}

export default PermisoAdd