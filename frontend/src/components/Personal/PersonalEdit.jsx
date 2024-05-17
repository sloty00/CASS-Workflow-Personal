import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Grid, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const PersonalEdit = () => {
    const [Rut, setRut] = useState("");
    const [Nombre, setNombre] = useState("");
    const [Apellidos, setApellidos] = useState("");
    const [Sector, setSector] = useState("");
    const [Email, setEmail] = useState("");
    const [Telefono, setTelefono] = useState("");
    const [Direccion, setDireccion] = useState("");
    const [Comuna, setComuna] = useState("");
    const [Provincia, setProvincia] = useState("");
    const navigate = useNavigate();
    const { Id } = useParams();

    useEffect(() => {
        const getPersonalById = async () => {
            const response = await axios.get(`http://localhost:5000/personal/${Id}`);
            setRut(response.data.Rut);
            setNombre(response.data.Nombre);
            setApellidos(response.data.Apellidos);
            setSector(response.data.Sector);
            setEmail(response.data.Email);
            setTelefono(response.data.Telefono);
            setDireccion(response.data.Direccion);
            setComuna(response.data.Comuna);
            setProvincia(response.data.Provincia);
        };
        getPersonalById();
    }, [Id]);

    const PersonalUpdate = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/personal/${Id}`, {
            //Nombre: parseInt(Nombre),
            Rut: Rut,
            Nombre: Nombre,
            Apellidos: Apellidos,
            Sector: Sector,
            Email: Email,
            Telefono: Telefono,
            Direccion: Direccion,
            Comuna: Comuna,
            Provincia: Provincia,
        });
        navigate("/");
    }

    return (
        <div className='max-wg-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
            <h4><center>Editar Personal</center></h4><br></br>
            <form onSubmit={PersonalUpdate} className='my-10'>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Rut"
                            variant="outlined"
                            fullWidth
                            value={Rut}
                            onChange={(e) => setRut(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            fullWidth
                            value={Nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Apellidos"
                            variant="outlined"
                            fullWidth
                            value={Apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Sector"
                            variant="outlined"
                            fullWidth
                            value={Sector}
                            onChange={(e) => setSector(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Telefono"
                            variant="outlined"
                            fullWidth
                            value={Telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Direccion"
                            variant="outlined"
                            fullWidth
                            value={Direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Comuna"
                            variant="outlined"
                            fullWidth
                            value={Comuna}
                            onChange={(e) => setComuna(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Provincia"
                            variant="outlined"
                            fullWidth
                            value={Provincia}
                            onChange={(e) => setProvincia(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            startIcon={<AddIcon />}
                        >
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </div>
    )
}

export default PersonalEdit;