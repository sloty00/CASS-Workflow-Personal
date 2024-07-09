import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { auth } from "../../firebase.js";
import { onAuthStateChanged } from 'firebase/auth';
import { TablePagination, Stack, Alert, Grid, TextField, Button } from '@mui/material';
import { DeleteForeverOutlined, EditOutlined, AddCircleOutline } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Footer from "../Footer.jsx";

const PermisoList = () => {
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

  const redirectPath = "/permisos";
  const { data } = useSWR(`http://localhost:5000/permisoJoin?page=${page}&pageSize=${rowsPerPage}`, fetcher);

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

  const handleOpenDeleteDialog = (permisoId) => {
    setDeleteId(permisoId);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const deletePermiso = async (permisoId) => {
    await axios.delete(`http://localhost:5000/permisos/${permisoId}`);
    mutate('http://localhost:5000/permisoJoin');
    navigate(redirectPath);
    window.location.reload(); // Refrescar la página después de eliminar
  }

  if (loading) {
    return ( 
        <ProgressBar now={100} animated label="Cargando..." style={{ position: 'absolut', top: '50%', left: '0', right: '0', transform: 'translateY(-50%)' }} />
      );
  }

  if (!authUser) {
    return (
      <div className='sign-in-container'>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="error">Error 401: No tienes autorización para ver esta página. Vuelve a ingresar o favor contactarte con el administrador de esta APP jvargas@cass.cl:.</Alert>
        </Stack> <br />
        <Link
          to="/"
          className="bg-green-700 hover:bg-green-400 border border-slate-200 text-white font-bold py-2 px-4 rounded-lg"
        >
          Ingresar Cuenta
        </Link>
        <br /><br />
      </div>
    );
  }

  const filteredData = Array.isArray(data?.data) ? data.data.filter((permiso) =>
    permiso.P_Rut.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permiso.personal.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permiso.personal.Apellidos.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div>
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
        <div className="relative shadow rounded-lg mt-3 overflow-x-auto">
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
              <tr>
                <th className='py-3 px-1 text-center'>No</th>
                <th className='py-3 px-6'>Rut</th>
                <th className='py-3 px-6'>Nombre</th>
                <th className='py-3 px-6'>Apellidos</th>
                <th className='py-3 px-6'>Fecha Permiso</th>
                <th className='py-3 px-6'>Dias</th>
                <th className='py-3 px-6'>Descripcion</th>
                <th className='py-3 px-1 text-center'>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((permiso, index) => (
                <tr className="bg-white border-b" key={permiso.Id}>
                  <td className='py-3 px-1 text-center'>{index + 1}</td>
                  <td className='py3 px-6'> {permiso.P_Rut} </td>
                  <td className='py3 px-6'>{permiso.personal.Nombre} </td>
                  <td className='py3 px-6'>{permiso.personal.Apellidos} </td>
                  <td className='py3 px-6'>{permiso.F_permiso} </td>
                  <td className='py3 px-6'> {permiso.Dias} </td>
                  <td className='py3 px-6'> {permiso.Descripcion} </td>
                  <td className="py-3 px-1 text-center">
                    <Grid container sx={{ color: 'text.primary' }}>
                      <Link
                          to={`/permisos/edit/${permiso.Id}`}
                          className="font-medium bg-blue-700 hover:bg-blue-400 px-2 py-2 rounded text-white"
                        >
                          <EditOutlined />
                        </Link>
                        <button
                          onClick={() => handleOpenDeleteDialog(permiso.Id)}
                          className="font-medium bg-red-700 hover:bg-red-400 px-2 py-1 rounded text-white"
                        >
                          <DeleteForeverOutlined/>
                        </button>
                    </Grid>
                  </td>
                </tr>
              ))}
            </tbody>
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
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres eliminar este permiso?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => deletePermiso(deleteId)} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <br /><br /><br /><br />
    </div>
    <Footer />
    </div>
  );
}

export default PermisoList;