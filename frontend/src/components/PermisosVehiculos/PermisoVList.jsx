import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { auth } from "../../firebase.js";
import { onAuthStateChanged } from 'firebase/auth';
import { TablePagination, Stack, Alert } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField'; // Agrega esta línea
import Button from '@mui/material/Button'; // Agrega esta línea

const PermisoVList = () => {
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetcher = async (url) => {
    const response = await axios.get(url, {
      params: { page, pageSize: rowsPerPage }
    });
    return response.data;
  };

  const redirectPath = "/permisosv";
  const { data } = useSWR(`http://localhost:5000/permisojoinv?page=${page}&pageSize=${rowsPerPage}`, fetcher);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setLoading(false); // Indicamos que la autenticación ha terminado y se puede renderizar
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteId(null);
    setDeleteDialogOpen(false);
  };

  if (loading) {
    return (
      <ProgressBar now={100} animated label="Cargando..." style={{ position: 'absolute', top: '50%', left: '0', right: '0', transform: 'translateY(-50%)' }} />
    );
  }

  const deletePermisoV = async (permisovId) => {
    await axios.delete(`http://localhost:5000/permisosv/${permisovId}`);
    mutate('http://localhost:5000/permisojoinv');
    navigate(redirectPath);
    window.location.reload(); // Refrescar la página después de eliminar
  }

  if (!authUser) {
    return (
      <div className='sign-in-container max-wg-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="error">Error 401: No tienes autorizacion para ver esta pagina. Vuelve a ingresar o favor contactarte con el administrador de esta APP jvargas@cass.cl:.</Alert>
        </Stack> <br></br>
        <Link
          to="/"
          className="bg-green-700 hover:bg-green-400 border border-slate-200 text-white font-bold py-2 px-4 rounded-lg"
        >
          Ingresar Cuenta
        </Link>
        <br/><br/>
      </div>
    );
  }

  // Imprimir data y searchTerm para depuración
  console.log("Data:", data);
  console.log("Search Term:", searchTerm);

  const filteredData = data?.data?.filter((permisosv) =>
    permisosv.pers_pvehiculo.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permisosv.pers_pvehiculo.Apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permisosv.vehi_pvehiculo.Marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permisosv.vehi_pvehiculo.Modelo.toLowerCase().includes(searchTerm.toLowerCase())
);

console.log("Data:", data);
console.log("Search Term:", searchTerm);
console.log("Filtered Data:", filteredData);

  return (
      <div className='sign-in-container max-w-4xl mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
        <>
        <h4><center>Permiso Personal</center></h4><br />
        <div className="w-full">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <TextField
                fullWidth
                variant="outlined"
                label="Buscar por Rut..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={4} container justifyContent="flex-end">
              <Button
                component={Link}
                to="/permisos/add"
                variant="contained"
                color="primary"
                startIcon={<AddCircleOutline />}
              >
                Añadir
              </Button>
            </Grid>
          </Grid>
          <div className="relative shadow rounded-lg mt-3">
            <table className='w-full text-sm text-left text-gray-500'>
              {/* Table content */}
            </table>
          </div>
          <TablePagination
            component="div"
            count={data?.total || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página:"
          />
        </div>
        </>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres eliminar este permiso vehicular?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleCloseDeleteDialog} className="bg-gray-500 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded-lg">
            Cancelar
          </button>
          <button onClick={() => deletePermisoV(deleteId)} className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-lg">
            Eliminar
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PermisoVList;
