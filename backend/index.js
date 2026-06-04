//Declaracion Constantes.
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import PersonalRoute from "./routes/PersonalRoute.js";
import VehiculoRoute from "./routes/VehiculoRoute.js";
import PermisoRoute from "./routes/PermisoRoute.js";
import VacacionesRoute from "./routes/VacacionesRoute.js";
import PermisoVRoute from "./routes/PermisoVRoute.js";
import Dropdown from "./routes/DropdownRoute.js";
import ChecklistRoute from "./routes/ChecklistRoute.js";
import ProtectedRoutes from './routes/ProtectedRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(PersonalRoute);
app.use(VehiculoRoute);
app.use(PermisoRoute);
app.use(VacacionesRoute);
app.use(PermisoVRoute);
app.use(Dropdown);
app.use(ChecklistRoute);
app.use(ProtectedRoutes);

app.get('/', function (req, res) {
    res.send('.');
});

app.listen(process.env.BC_PORT_SERVER_1, () => {
    console.log(`SERVIDOR CORRIENDO EN PUERTO ${process.env.BC_PORT_SERVER_1}`)
});