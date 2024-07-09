import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from "axios";
import { useSWRConfig } from "swr";
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
import Footer from "../Footer.jsx";

const PermisoVList = () => {
  const { mutate } = useSWRConfig();
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const navigate = useNavigate();

  const fetchData = async (page, pageSize) => {
    try {
      const response = await axios.get(`http://localhost:5000/permisojoinv?page=${page}&pageSize=${pageSize}`);
      setData(response.data.data);
      setTotalRows(response.data.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const redirectPath = "/permisosv";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setLoading(false);
      if (user) {
        navigate("/permisosv");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage]);

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

  const deletePermisoV = async (permisovId) => {
    await axios.delete(`http://localhost:5000/permisosv/${permisovId}`);
    mutate('permisosv');
    navigate(redirectPath);
    window.location.reload();
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

  const filteredData = data.filter((permisosv) =>
    permisosv.pers_pvehiculo.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permisosv.pers_pvehiculo.Apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permisosv.vehi_pvehiculo.Marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permisosv.vehi_pvehiculo.Modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
    <div className='sign-in-container max-wg-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
      <>
        <h4><center>Permiso Vehiculos</center></h4><br></br>
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
                  to="/permisosv/add"
                  className="bg-blue-700 hover:bg-blue-400 border border-slate-200 text-white font-bold py-3 px-3 rounded-lg"
                >
                  <AddCircleOutline/>
                </Link>
              </Grid>
            </div>
          </div>
          <div className="relative shadow rounded-lg mt-3">
            <table className='w-full text-sm text-left text-gray-500'>
              <thead className='text-xs text-gray-700 upparcase bg-gray-100'>
                <tr>
                  <th className='py-3 px-1 text-center'>No</th>
                  <th className='py-3 px-6'>Nombre</th>
                  <th className='py-3 px-6'>Apellidos</th>
                  <th className='py-3 px-6'>PV_Patente</th>
                  <th className='py-3 px-6'>Marca</th>
                  <th className='py-3 px-6'>Modelo</th>
                  <th className='py-3 px-6'>Año</th>
                  <th className='py-3 px-6'>F_permiso</th>
                  <th className='py-3 px-6'>Validar</th>
                  <th className='py-3 px-1 text-center'>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((permisosv, index) => (
                  <tr className="bg-white border-b" key={permisosv.Id}>
                    <td className='py-3 px-1 text-center'>{index + 1}</td>
                    <td className='py3 px-6'>
                      {permisosv.pers_pvehiculo.Nombre}
                    </td>
                    <td className='py3 px-6'>
                      {permisosv.pers_pvehiculo.Apellidos}
                    </td>
                    <td className='py3 px-6'>
                      {permisosv.PV_Patente}
                    </td>
                    <td className='py3 px-6'>
                      {permisosv.vehi_pvehiculo.Marca}
                    </td>
                    <td className='py3 px-6'>
                      {permisosv.vehi_pvehiculo.Modelo}
                    </td>
                    <td className='py3 px-6'>
                      {permisosv.vehi_pvehiculo.Ano}
                    </td>
                    <td className='py3 px-6'>
                      {permisosv.F_permiso}
                    </td>
                    <td className='py3 px-6'>
                      {permisosv.Validar === 0 ? 'En proceso' : (permisosv.Validar === 1 ? 'Con permiso' : 'Sin permiso')}
                    </td>
                    <td className='py3 px-1 text-center'>
                      <Grid container sx={{ color: 'text.primary' }}>
                        <Link to={`/permisosv/edit/${permisosv.Id}`} className="font-medium bg-blue-700 hover:bg-blue-400 px-2 py-2 rounded text-white" ><EditOutlined /></Link>
                        <button onClick={() => handleOpenDeleteDialog(permisosv.Id)} className="font-medium bg-red-700 hover:bg-red-400 px-2 py-1 rounded text-white">
                          <DeleteForeverOutlined />
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
            count={totalRows}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmación de Eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar este permiso vehicular?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleCloseDeleteDialog} className="font-medium bg-gray-700 hover:bg-gray-400 px-2 py-1 rounded text-white">
            Cancelar
          </button>
          <button onClick={() => deletePermisoV(deleteId)} className="font-medium bg-red-700 hover:bg-red-400 px-2 py-1 rounded text-white" autoFocus>
            Eliminar
          </button>
        </DialogActions>
      </Dialog>
    </div>
    <Footer />
    </div>
  );
}

export default PermisoVList;