import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './style.css';
import PersonalList from './components/Personal/PersonalList';
import Footer from './components/Footer.jsx';
import MenuBar from './components/MenuBar.jsx';
import PersonalAdd from './components/Personal/PersonalAdd';
import PersonalEdit from './components/Personal/PersonalEdit';
import BodyHome from './components/BodyHome';
import VehiculoList from './components/Vehiculos/VehiculoList';
import VehiculoEdit from "./components/Vehiculos/VehiculoEdit.jsx";
import VehiculoAdd from "./components/Vehiculos/VehiculoAdd.jsx";
import PermisoList from './components/Permisos/PermisoList.jsx';
import PermisoAdd from "./components/Permisos/PermisoAdd.jsx";
import PermisoEdit from "./components/Permisos/PermisoEdit.jsx";
import VacacionesList from "./components/Vacaciones/VacacionesList.jsx";
import VacacionesAdd from "./components/Vacaciones/VacacionesAdd.jsx";
import VacacionesEdit from "./components/Vacaciones/VacacionesEdit.jsx";
import PermisoVList from "./components/PermisosVehiculos/PermisoVList.jsx";
import PermisoVAdd from "./components/PermisosVehiculos/PermisoVAdd.jsx";
import PermisoVEdit from "./components/PermisosVehiculos/PermisoVEdit.jsx";
import CheckList from "./components/Checklist/CheckList.jsx";
import ChecklistEdit from "./components/Checklist/ChecklistEdit.jsx";
import CheckListAdd from "./components/Checklist/CheckListAdd.jsx";
import SignIn from "./components/auth/SignIn.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import Login from "./components/Login/Login.jsx";
import { ExitToApp } from '@mui/icons-material';

function App() {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthUser(user)
        } else {
            setAuthUser(null);
        }
    });

      // Devolver una función de limpieza que se ejecutará cuando el componente se desmonte
      return () => {
        unsubscribe();
      };
    }, []);

    const userSignOut = () => {
    signOut(auth)
      .then(() => {
          console.log('sign out successful');
          window.location.href = "/";
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="container">
        {authUser ? (
          <>
          <div className='sign-in-container max-wg-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
          <MenuBar />
          </div>
          <div class="row">
          <div class="col-lg-11">
            <p style={{fontStyle:"italic"}}>{"{"+`Usuario: ${authUser.email}`+"}"} </p>
          </div>
          <div class="col-lg-1">
            <button className="bg-red-700 hover:bg-red-400 border border-slate-200 text-white font-bold py-1 px-3 rounded-lg" onClick={userSignOut}><ExitToApp /></button>
          </div>
          </div>
          </>
        ) : (
          <div className='sign-in-container max-wg-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
          <div className="centered-image">
            <img src="https://www.cass.cl/wp-content/uploads/2023/09/LOGO-ORIGINAL-3.png" width='15%' alt="CASS"/>
          </div>
          </div>
        )}
        <BrowserRouter>
          <Routes>
            <Route path="/index" element={<BodyHome/>}/>
            <Route path="/personal" element={<PersonalList/>}/>
            <Route path="/personal/add" element={<PersonalAdd/>}/>
            <Route path="/personal/edit/:Id" element={<PersonalEdit/>}/>
            <Route path="/vehiculo" element={<VehiculoList/>}/>
            <Route path="/vehiculo/add" element={<VehiculoAdd/>}/>
            <Route path="/vehiculo/edit/:Id" element={<VehiculoEdit/>}/>
            <Route path="/permisos" element={<PermisoList/>}/>
            <Route path="/permisos/add" element={<PermisoAdd/>}/>
            <Route path="/permisos/edit/:Id" element={<PermisoEdit/>}/>
            <Route path="/vacaciones" element={<VacacionesList/>}/>
            <Route path="/vacaciones/add" element={<VacacionesAdd/>}/>
            <Route path="/vacaciones/edit/:Id" element={<VacacionesEdit/>}/>
            <Route path="/permisosv/" element={<PermisoVList/>}/>
            <Route path="/permisosv/add" element={<PermisoVAdd/>}/>
            <Route path="/permisosv/edit/:Id" element={<PermisoVEdit/>}/>
            <Route path="/checklist" element={<CheckList/>}/>
            <Route path="/checklist/add" element={<CheckListAdd/>}/>
            <Route path="/checklist/edit/:Id" element={<ChecklistEdit/>}/>
            <Route path="/" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/Login" element={<Login/>}/>
          </Routes>
        </BrowserRouter>
        <Footer />
    </div>
    
  );
}

export default App;