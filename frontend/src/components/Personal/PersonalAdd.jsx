import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.js";
import { onAuthStateChanged } from 'firebase/auth';
import { TextField, Button, Grid, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const PersonalAdd = () => {
    const [Rut, setRut] = useState("");
    const [Nombre, setNombre] = useState("");
    const [Apellidos, setApellidos] = useState("");
    const [Sector, setSector] = useState("");
    const [Email, setEmail] = useState("");
    const [Telefono, setTelefono] = useState("");
    const [Direccion, setDireccion] = useState("");
    const [Comuna, setComuna] = useState("");
    const [Provincia, setProvincia] = useState("");
    const [rutValido, setRutValido] = useState(true);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false); // Estado para controlar si se está guardando o no

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

    const validarRut = (rut) => {
        rut = rut.trim();
        rut = rut.replace(/\./g, '').replace('-', '').toUpperCase();

        if (!/^[0-9]+[0-9kK]{1}$/.test(rut)) return false;

        let cuerpo = rut.slice(0, -1);
        let dv = rut.slice(-1);
        let suma = 0;
        let multiplo = 2;

        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo.charAt(i)) * multiplo;
            if (multiplo < 7) multiplo++;
            else multiplo = 2;
        }

        let dvCalculado = 11 - (suma % 11);
        dvCalculado = (dvCalculado === 11) ? 0 : ((dvCalculado === 10) ? 'K' : dvCalculado);

        return dvCalculado.toString() === dv;
    };

    const redirectPath = "/personal";

    const createPersonal = async (e) => {
        e.preventDefault();
        if (!validarRut(Rut)) {
            setRutValido(false); // Actualizar el estado para mostrar el mensaje de error
            return; // Detener el proceso de envío del formulario
        }

        setSaving(true); // Indicar que se está guardando

        
        try {
            await axios.post("http://localhost:5000/personal", {
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
            navigate(redirectPath); // Redirigir al usuario después de guardar
        } catch (error) {
            console.error("Error al guardar:", error);
            // Aquí podrías mostrar un mensaje de error al usuario si lo deseas
        }
        setSaving(false); // Indicar que se ha terminado de guardar
    }

    if (loading) return <h2>Cargando...</h2>;
    
    return (
        <div className='max-wg-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
            <h4><center>Agregar Personal</center></h4><br></br>
            <form onSubmit={createPersonal} className='my-10'>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Rut"
                            variant="outlined"
                            fullWidth
                            value={Rut}
                            onChange={(e) => setRut(e.target.value)}
                            error={!rutValido}
                            helperText={!rutValido && "El Rut ingresado no es válido."}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            fullWidth
                            value={Nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Apellidos"
                            variant="outlined"
                            fullWidth
                            value={Apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Sector"
                            variant="outlined"
                            fullWidth
                            value={Sector}
                            onChange={(e) => setSector(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Telefono"
                            variant="outlined"
                            fullWidth
                            value={Telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Direccion"
                            variant="outlined"
                            fullWidth
                            value={Direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Comuna"
                            variant="outlined"
                            fullWidth
                            value={Comuna}
                            onChange={(e) => setComuna(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Provincia"
                            variant="outlined"
                            fullWidth
                            value={Provincia}
                            onChange={(e) => setProvincia(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            startIcon={<AddIcon />}
                            disabled={saving} // Deshabilitar el botón mientras se guarda
                        >
                            {saving ? <CircularProgress size={24} color="inherit" /> : "Guardar"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default PersonalAdd;