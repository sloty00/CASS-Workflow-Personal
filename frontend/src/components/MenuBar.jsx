import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar';

const navBarData = [
    {
        label: "Inicio",
        url: "/index",
    },
    {
        label: "Maestros",
        submenu: [
            {
                label: "Personal",
                url: "/personal",
            },
            {
                label: "Vehiculo",
                url: "/vehiculo",
            },
        ],
    },
    {
        label: "Personal",
        submenu: [
            {
                label: "Control Acceso",
                url: "/signup",
            },
            {
                label: "Permiso Personal",
                url: "/permisos",
            },
            {
                label: "Vacaciones Personal",
                url: "/vacaciones",
            },
        ],
    },
    {
        label: "Vehiculos",
        submenu: [
            {
                label: "Permiso Vehiculos",
                url: "/permisosv",
            },
            {
                label: "Checklist",
                url: "/checklist",
            },
        ],
    },
];

const MenuItem = ({ item, index }) => {
    if (item.submenu) {
        return (
            <NavDropdown title={item.label} key={index} className="dropdown-menu-dark dropend">
                {item.submenu.map((subItem, subIndex) => (
                    <NavDropdown.Item href={subItem.url} key={subIndex}>
                        {subItem.label}
                    </NavDropdown.Item>
                ))}
            </NavDropdown>
        );
    } else {
        return (
            <Nav.Link href={item.url} key={index}>
                {item.label}
            </Nav.Link>
        );
    }
};

const MenuBar = () => {
    return (
        <Navbar expand="lg" variant="light" className="center">
            <Navbar.Brand href="/" className="ms-5">
                <img
                    src="./images/Logo Varto.jpg"
                    width="18%"
                    alt="Varto"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto right me-5">
                    {navBarData.map((item, index) => (
                        <MenuItem item={item} index={index} key={index} />
                    ))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MenuBar;