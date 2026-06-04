import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import useSWR from "swr";

const PermisoEdit = () => {
    const [P_Rut, setP_Rut] = useState("");
    const [F_permiso, setF_permiso] = useState("");
    const [Dias, setDias] = useState("");
    const [Descripcion, setDescripcion] = useState("");
    const navigate = useNavigate();
    const {Id} = useParams();

    useEffect(()=> {
        const getPermisoById = async () => {
            const response = await axios.get(`http://localhost:5000/permisos/${Id}`);
            setP_Rut(response.data.P_Rut);
            setF_permiso(response.data.F_permiso);
            setDias(response.data.Dias);
            setDescripcion(response.data.Descripcion);
        };
        getPermisoById();
    },[Id]);

    const PermisoUpdate = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/permisos/${Id}`, {
            P_Rut: P_Rut,
            F_permiso: F_permiso,
            Dias: parseInt(Dias),
            Descripcion : Descripcion,
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
        <form onSubmit={PermisoUpdate} className='my-10'>
            <div className='flex flex-col'>
                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Rut: </label>
                    <input type="text" id='P_Rut' name='P_Rut' readOnly={true} className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Marca' value={P_Rut} onChange={(e)=>setP_Rut(e.target.value)}/>
                </div>

                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Fecha Permiso: </label>
                    <input type="date" id='F_permiso' name='F_permiso' className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Marca' value={F_permiso} onChange={(e)=>setF_permiso(e.target.value)}/>
                </div>
                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Dias: </label>
                    <input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Modelo' value={Dias} onChange={(e)=>setDias(e.target.value)}/>
                </div>
                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Descripcion: </label>
                    <input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Año' value={Descripcion} onChange={(e)=>setDescripcion(e.target.value)}/>
                </div>
                <button type="submit" className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow">Guardar</button>
            </div>
        </form>
    </div>
  )
}

export default PermisoEdit
