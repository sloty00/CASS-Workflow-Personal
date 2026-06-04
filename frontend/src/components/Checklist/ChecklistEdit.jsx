import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import useSWR from "swr";

const ChecklistEdit = () => {
    const [Chk_Rut, setChk_Rut] = useState("");
    const [Chk_Patente, setChk_Patente] = useState("");
    const [Km_salida, setKm_salida] = useState("");
    const [Km_llegada, setKm_llegada] = useState("");
    const navigate = useNavigate();
    const {Id} = useParams();

    useEffect(()=> {
        const getChecklistById = async () => {
            const response = await axios.get(`http://localhost:5000/checklist/${Id}`);
            setChk_Rut(response.data.Chk_Rut);
            setChk_Patente(response.data.Chk_Patente);
            setKm_salida(response.data.Km_salida);
            setKm_llegada(response.data.Km_llegada);
        };
        getChecklistById();
    },[Id]);

    const ChecklistUpdate = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/checklist/${Id}`, {
            Chk_Rut: Chk_Rut,
            Chk_Patente: Chk_Patente,
            Km_llegada: parseInt(Km_llegada),
            Km_salida: parseInt(Km_salida),
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
        <form onSubmit={ChecklistUpdate} className='my-10'>
            <div className='flex flex-col'>
                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Rut: </label>
                    <input type="text" id='Chk_Rut' name='Chk_Rut' readOnly={true} className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Marca' value={Chk_Rut} onChange={(e)=>setChk_Rut(e.target.value)}/>
                </div>

                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Patente: </label>
                    <input type="text" id='Chk_Patente' name='Chk_Patente' readOnly={true} className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Marca' value={Chk_Patente} onChange={(e)=>setChk_Patente(e.target.value)}/>
                </div>

                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Kilometraje de salida: </label>
                    <input type="string" id='Km_salida' name='Km_salida' className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Marca' value={Km_salida} onChange={(e)=>setKm_salida(e.target.value)}/>
                </div>

                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Klometraje de llegada: </label>
                    <input type="string" id='Km_llegada' name='Km_llegada' className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Marca' value={Km_llegada} onChange={(e)=>setKm_llegada(e.target.value)}/>
                </div>
                <button type="submit" className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow">Guardar</button>
            </div>
        </form>
    </div>
  )
}

export default ChecklistEdit