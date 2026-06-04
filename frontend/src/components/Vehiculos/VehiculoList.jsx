import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination'; 
import { AddCircleOutline, DeleteForeverOutlined, EditOutlined } from '@mui/icons-material';
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { auth } from "../../firebase.js";
import { onAuthStateChanged } from 'firebase/auth';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const VehiculoList = () => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { mutate } = useSWRConfig();
  const fetcher = async () => {
    try {
      const response = await axios.get("http://localhost:5000/vehiculo");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const navigate = useNavigate();
  const { data } = useSWR("vehiculo", fetcher);
  const [searchTerm, setSearchTerm] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setLoading(false);
      if (user) {
        navigate("/vehiculo");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const handleOpenDeleteDialog = (vehiculoId) => {
    setDeleteId(vehiculoId);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const deleteVehiculo = async () => {
    try {
      await axios.delete(`http://localhost:5000/vehiculo/${deleteId}`);
      mutate("vehiculo");
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  if (loading) {
    return ( 
        <ProgressBar now={100} animated label="Cargando..." style={{ position: 'absolut', top: '50%', left: '0', right: '0', transform: 'translateY(-50%)' }} />
      );
  }

  if (!authUser) {
    return (
      <div className='sign-in-container max-wg-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="error">
          Error 401: No tienes autorización para ver esta página. Vuelve a ingresar o favor contactarte con el: <a href="mailto:jvargas@cass.cl" style={{ color: 'yellow' }}>administrador</a> de esta APP.
          </Alert>
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

  const filteredData = data.filter(vehiculo =>
    vehiculo.Patente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehiculo.Marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehiculo.Modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='sign-in-container max-wg-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
      <h4>
        <center>Maestros.Vehiculos</center>
      </h4>
      <br/>
      <div className="w-full">
        <div className="row">
          <div className="col-lg">
            <input
              type="text"
              placeholder="Buscar por patente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
            />
          </div>
          <div className="col-lg-1">
            <Grid container sx={{ color: 'text.primary' }}>
              <Link
                to="/vehiculo/add"
                className="bg-blue-700 hover:bg-blue-400 border border-slate-200 text-white font-bold py-3 px-3 rounded-lg"
              >
                <AddCircleOutline/>
              </Link>
            </Grid>
          </div>
        </div>
        <div className="relative shadow rounded-lg mt-3">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-3 px-1 text-center">No</th>
                <th className="py-3 px-6">Patente</th>
                <th className="py-3 px-6">Marca</th>
                <th className="py-3 px-6">Modelo</th>
                <th className="py-3 px-6">Año</th>
                <th className="py-3 px-6">Fecha Patente</th>
                <th className="py-3 px-6">Fecha Revision Tecnica</th>
                <th className="py-3 px-1 text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((vehiculo, index) => (
                <tr className="bg-white border-b" key={vehiculo.Id}>
                  <td className="py-3 px-1 text-center">{index + 1}</td>
                  <td className="py-3 px-6">{vehiculo.Patente}</td>
                  <td className="py-3 px-6">{vehiculo.Marca}</td>
                  <td className="py-3 px-6">{vehiculo.Modelo}</td>
                  <td className="py-3 px-6">{vehiculo.Ano}</td>
                  <td className="py-3 px-6">{vehiculo.Fecha_ptte}</td>
                  <td className="py-3 px-6">{vehiculo.Fecha_rvs}</td>
                  <td className="py-3 px-1 text-center">
                    <Grid container sx={{ color: 'text.primary' }}>
                      <Link
                        to={`/vehiculo/edit/${vehiculo.Id}`}
                        className="font-medium bg-blue-700 hover:bg-blue-400 px-2 py-2 rounded text-white"
                      >
                        <EditOutlined/>
                      </Link>
                      <button
                        onClick={() => handleOpenDeleteDialog(vehiculo.Id)}
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
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
        />
      </div>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres eliminar este vehículo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleCloseDeleteDialog} className="font-medium bg-gray-400 hover:bg-gray-300 px-2 py-1 rounded text-white">
            Cancelar
          </button>
          <button onClick={deleteVehiculo} className="font-medium bg-red-700 hover:bg-red-400 px-2 py-1 rounded text-white">
            Eliminar
          </button>
        </DialogActions>
      </Dialog>
      <br/><br/><br/><br/>
    </div>
  );
};

export default VehiculoList;