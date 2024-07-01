import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { auth } from "../../firebase.js";
import { onAuthStateChanged } from 'firebase/auth';
import { TablePagination, Stack, Alert } from '@mui/material';
import { DeleteForeverOutlined, EditOutlined, AddCircleOutline } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CheckList = () => {
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

  const redirectPath = "/checklist";
  const { data } = useSWR(`http://localhost:5000/checklistjoin?page=${page}&pageSize=${rowsPerPage}`, fetcher);

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

  const handleOpenDeleteDialog = (checklistId) => {
    setDeleteId(checklistId);
    setDeleteDialogOpen(true);
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

  const deleteChecklist = async (checklistId) => {
    await axios.delete(`http://localhost:5000/checklist/${checklistId}`);
    mutate('http://localhost:5000/checklistjoin');
    navigate(redirectPath);
    window.location.reload(); // Refrescar la página después de eliminar
  }

  if (!authUser) {
    return (
      <div className='sign-in-container max-wg-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="error">Error 401: No tienes autorización para ver esta página. Vuelve a ingresar o contacta con el administrador de esta APP jvargas@cass.cl.</Alert>
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

  if (!data) return <ProgressBar now={100} animated label="Cargando..." />;

  const filteredData = data.data.filter((checklist) =>
    checklist.pers_chkvehiculo.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    checklist.pers_chkvehiculo.Apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    checklist.Chk_Rut.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='sign-in-container max-wg-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
      <>
        <h4><center>Checklist Vehículos</center></h4><br />
        <div className="w-full">
          <div className="row">
            <div className="col-lg">
              <input
                type="text"
                placeholder="Buscar por Rut..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
              />
            </div>
            <div className="col-lg-1">
              <Grid container sx={{ color: 'text.primary' }}>
                <Link
                  to="/checklist/add"
                  className="bg-blue-700 hover:bg-blue-400 border border-slate-200 text-white font-bold py-3 px-3 rounded-lg"
                >
                  <AddCircleOutline />
                </Link>
              </Grid>
            </div>
          </div>
          <div className="relative shadow rounded-lg mt-3">
            <table className='w-full text-sm text-left text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
                <tr>
                  <th className='py-3 px-1 text-center'>No</th>
                  <th className='py-3 px-6'>Rut</th>
                  <th className='py-3 px-6'>Nombre</th>
                  <th className='py-3 px-6'>Apellidos</th>
                  <th className='py-3 px-6'>Patente</th>
                  <th className='py-3 px-6'>Marca</th>
                  <th className='py-3 px-6'>Modelo</th>
                  <th className='py-3 px-6'>Km Salida</th>
                  <th className='py-3 px-6'>Km Llegada</th>
                  <th className='py-3 px-1 text-center'>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((checklist, index) => (
                  <tr className="bg-white border-b" key={checklist.Id}>
                    <td className='py-3 px-1 text-center'>{index + 1 + page * rowsPerPage}</td>
                    <td className='py3 px-6'>
                      {checklist.Chk_Rut}
                    </td>
                    <td className='py3 px-6'>
                      {checklist.pers_chkvehiculo.Nombre}
                    </td>
                    <td className='py3 px-6'>
                      {checklist.pers_chkvehiculo.Apellidos}
                    </td>
                    <td className='py3 px-6'>
                      {checklist.Chk_Patente}
                    </td>
                    <td className='py3 px-6'>
                      {checklist.vehi_chkvehiculo.Marca}
                    </td>
                    <td className='py3 px-6'>
                      {checklist.vehi_chkvehiculo.Modelo}
                    </td>
                    <td className='py3 px-6'>
                      {checklist.Km_salida}
                    </td>
                    <td className='py3 px-6'>
                      {checklist.Km_llegada}
                    </td>
                    <td className='py3 px-1 text-center'>
                      <Grid container sx={{ color: 'text.primary' }}>
                        <Link
                          to={`/checklist/edit/${checklist.Id}`}
                          className="bg-green-700 hover:bg-green-400 border border-slate-200 text-white font-bold py-2 px-3 rounded-lg"
                        >
                          <EditOutlined />
                        </Link>
                      </Grid>
                      <Grid container sx={{ color: 'text.primary' }}>
                        <button
                          onClick={() => handleOpenDeleteDialog(checklist.Id)}
                          className="bg-red-700 hover:bg-red-400 border border-slate-200 text-white font-bold py-2 px-3 rounded-lg"
                        >
                          <DeleteForeverOutlined />
                        </button>
                      </Grid>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={data.total}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </>

      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este checklist?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleCloseDeleteDialog} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-lg">
            Cancelar
          </button>
          <button onClick={() => deleteChecklist(deleteId)} className="bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-lg">
            Eliminar
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CheckList;