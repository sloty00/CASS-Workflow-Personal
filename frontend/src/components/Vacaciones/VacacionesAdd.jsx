import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.js";
import { onAuthStateChanged } from 'firebase/auth';
import useSWR from "swr";

const PermisoVacaciones = () => {
    const [V_Rut, setV_Rut] = useState("");
    const [Fecha_Salida, setFecha_Salida] = useState("");
    const [Dias_vacaciones, setDias_vacaciones] = useState("");
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

    const createVacaciones = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/vacaciones", {
            V_Rut: V_Rut,
            Fecha_Salida: Fecha_Salida,
            Dias_vacaciones: parseInt(Dias_vacaciones),
        });
        navigate("/");
    }

    const fetcher = async () => {
        const response = await axios.get('http://localhost:5000/dropdown/p');
        return response.data;
    };

    const { data } = useSWR('personal', fetcher);

    if (loading) return <h2>Cargando...</h2>;

    return (
        <div className='max-wg-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
            <h4><center>Agregar Permisos</center></h4><br></br>
            <form onSubmit={createVacaciones} className='my-10'>
                <div className='flex flex-col'>
                    <div className='form-group mb-5'>
                        <label className='font-bold text-slate-700'>Rut: {V_Rut}</label>
                        {data && (
                            <select className="form-select" size="3" aria-label="size 2 select example" onChange={(e)=>setV_Rut(e.target.value)}>
                                {data.map((personal)=>(
                                    <option key={personal.Rut} value={personal.Rut}>{personal.Nombre + " " + personal.Apellidos}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className='form-group mb-5'>
                        <label className='font-bold text-slate-700'>Fecha Permiso: </label>
                        <input type="date" id='Fecha_Salida' name='Fecha_Salida' className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Fecha salida' value={Fecha_Salida} onChange={(e)=>setFecha_Salida(e.target.value)}/>
                    </div>
                    <div className='form-group mb-5'>
                        <label className='font-bold text-slate-700'>Dias: </label>
                        <input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Dias vacaciones' value={Dias_vacaciones} onChange={(e)=>setDias_vacaciones(e.target.value)}/>
                    </div>
                    <button type="submit" className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow">Guardar</button>
                </div>
            </form>
        </div>
    )
}

export default PermisoVacaciones;