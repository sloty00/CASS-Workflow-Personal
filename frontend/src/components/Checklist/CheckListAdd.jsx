import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import useSWR from "swr";

const CheckListAdd = () => {
    const [Chk_Rut, setChk_Rut] = useState("");
    const [Chk_Patente, setChk_Patente] = useState("");
    const [Km_salida, setKm_salida] = useState("");
    const [Km_llegada, setKm_llegada] = useState("");
    const navigate = useNavigate();

    const createChecklist = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/checklist", {
           Chk_Rut: Chk_Rut,
           Chk_Patente: Chk_Patente,
           Km_salida: parseInt(Km_salida),
           Km_llegada: parseInt(Km_llegada),
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
        <h4><center>Agregar Checklist</center></h4><br></br>
        <form onSubmit={createChecklist} className='my-10'>
            <div className='flex flex-col'>

                <div className='form-group mb-5'>
                <label className='font-bold text-slate-700'>Rut: {Chk_Rut} </label>
                    <select class="form-select" size="3" aria-label="size 2 select example" onChange={(e)=>setChk_Rut(e.target.value)}>
                        {data.personal.map((persona)=>(
                                <option id='Chk_Rut' name='Chk_Rut' value={persona.Rut}>{persona.Nombre + " "+ persona.Apellidos}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group mb-5'>
                <label className='font-bold text-slate-700'>Patente: {Chk_Patente}</label>
                    <select class="form-select" size="3" aria-label="size 2 select example" onChange={(e)=>setChk_Patente(e.target.value)}>
                        {data.vehiculos.map((vehiculo)=>(
                                <option id='Chk_Patente' name='Chk_Patente' value={vehiculo.Patente}>{vehiculo.Marca + " " + vehiculo.Modelo}</option>
                        ))}
                    </select>  
                </div>

                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Kilometraje de Salida: </label>
                    <input type="String" id='Km_salida' name='Km_salida' className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Km de salida' value={Km_salida} onChange={(e)=>setKm_salida(e.target.value)}/>
                </div>

                <div className='form-group mb-5'>
                    <label className='font-bold text-slate-700'>Kilometraje de Llegada: </label>
                    <input type="String" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Km de llegada' value={Km_llegada} onChange={(e)=>setKm_llegada(e.target.value)}/>
                </div>
                <button type="submit" className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow">Guardar</button>
            </div>
        </form>
    </div>
  )
}

export default CheckListAdd