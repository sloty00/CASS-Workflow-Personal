import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import useSWR from "swr";

const PermisoVAdd = () => {
    const [PV_Rut, setPV_Rut] = useState("");
    const [PV_Patente, setPV_Patente] = useState("");
    const [F_permiso, setF_permiso] = useState("");
    const [Validar, setValidar] = useState("0");
    const navigate = useNavigate();

    const createPermisosV = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/permisosv", {
           PV_Rut: PV_Rut,
           PV_Patente: PV_Patente,
           F_permiso: F_permiso,
           Validar: parseInt(Validar),
        });
        navigate("/");
    }

    const fetcher = async () => {
        const vehiculosResponse = await axios.get('http://localhost:5000/dropdown/v');
        const personalResponse = await axios.get('http://localhost:5000/dropdown/p');
        
        const vehiculosData = vehiculosResponse.data;
        const personalData = personalResponse.data;

        return { vehiculos: vehiculosData, personal: personalData }; 
    };
    const { data } = useSWR(['vehiculo', 'personal'], fetcher);
    if(!data) return <h2>Error de Carga!!!...</h2>;

  return (
    <div className='max-wg-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
        <h4><center>Agregar Permisos</center></h4><br></br>
        <form onSubmit={createPermisosV} className='my-10'>
            <div className='flex flex-col'>
                <div className='form-group mb-5'>
                <label className='font-bold text-slate-700'>Patente: {PV_Patente}</label>
                    <select class="form-select" size="3" aria-label="size 2 select example" onChange={(e)=>setPV_Patente(e.target.value)}>
                        {data.vehiculos.map((vehiculo)=>(
                                <option id='PV_Patente' name='PV_Patente' value={vehiculo.Patente}>{vehiculo.Marca + " " + vehiculo.Modelo}</option>
                        ))}
                    </select>  
                </div>

                <div className='form-group mb-5'>
                <label className='font-bold text-slate-700'>Rut: {PV_Rut} </label>
                    <select class="form-select" size="3" aria-label="size 2 select example" onChange={(e)=>setPV_Rut(e.target.value)}>
                        {data.personal.map((persona)=>(
                                <option id='PV_Rut' name='PV_Rut' value={persona.Rut}>{persona.Nombre + " "+ persona.Apellidos}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Fecha Permiso: </label>
                    <input type="date" id='F_permiso' name='F_permiso' className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Fecha de permiso' value={F_permiso} onChange={(e)=>setF_permiso(e.target.value)}/>
                </div>

                <div className='form-group mb-5'>
                    <input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Validar' value={Validar} onChange={(e)=>setValidar(e.target.value)} hidden/>
                </div>
                <button type="submit" className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow">Guardar</button>
            </div>
        </form>
    </div>
  )
}

export default PermisoVAdd