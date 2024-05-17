import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import useSWR from "swr";

const PermisoVEdit = () => {
    const [PV_Rut, setPV_Rut] = useState("");
    const [PV_Patente, setPV_Patente] = useState("");
    const [F_permiso, setF_permiso] = useState("");
    const [Validar, set_Validar] = useState("");
    const navigate = useNavigate();
    const {Id} = useParams();

    useEffect(()=> {
        const getPermisoVById = async () => {
            const response = await axios.get(`http://localhost:5000/permisosv/${Id}`);
            setPV_Rut(response.data.PV_Rut);
            setPV_Patente(response.data.PV_Patente);
            setF_permiso(response.data.F_permiso);
            set_Validar(response.data.Validar);
        };
        getPermisoVById();
    },[Id]);

    const PermisoVUpdate = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/permisosv/${Id}`, {
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
        <h4><center>Editar Permisos</center></h4><br></br>
        <form onSubmit={PermisoVUpdate} className='my-10'>
            <div className='flex flex-col'>
                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Rut: </label>
                    <input type="text" id='PV_Rut' name='PV_Rut' readOnly={true} className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Marca' value={PV_Rut} onChange={(e)=>setPV_Rut(e.target.value)}/>
                </div>

                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Patente: </label>
                    <input type="text" id='PV_Patente' name='PV_Patente' readOnly={true} className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Marca' value={PV_Patente} onChange={(e)=>setPV_Patente(e.target.value)}/>
                </div>
                
                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Fecha Permiso: </label>
                    <input type="date" id='F_permiso' name='F_permiso' className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Marca' value={F_permiso} onChange={(e)=>setF_permiso(e.target.value)}/>
                </div>

                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Validar: </label>
                    <input type="text" id='Validar' name='Validar' className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Marca' value={Validar} onChange={(e)=>set_Validar(e.target.value)}/>
                </div>
                <button type="submit" className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow">Guardar</button>
            </div>
        </form>
    </div>
  )
}

export default PermisoVEdit