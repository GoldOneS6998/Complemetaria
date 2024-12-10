"use client";

import Link from "next/link";
import Boton from "@/components/boton";
import axios from "axios";
import '../../estilos.css';
import BorrarUsuario from "@/components/borrar";
import EditarUsuario from "@/components/editar";

async function getUsuarios(searchTerm) {
    const url = "http://localhost:3000";
    const usuarios = await axios.get(url);
    if (searchTerm) {
        return usuarios.data.filter(usuario => usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return usuarios.data;
}

export default async function Usuarios({ searchParams }) {
    const searchTerm = searchParams.search || "";
    const usuarios = await getUsuarios(searchTerm);

    return (
        <div className="container">
            <h1 className="titulo">Usuarios</h1>
            <p className="descripcion">Estas en usuarios</p>
            <table className="table">
                <thead>
                    <tr>
                        <th className="table-header">Id</th>
                        <th className="table-header">Nombre</th>
                        <th className="table-header">Usuario</th>
                        <th className="table-header">Editar / Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, i) => (
                        <tr key={i}>
                            <td className="table-data">{i + 1}</td>
                            <td className="table-data">{usuario.nombre}</td>
                            <td className="table-data">{usuario.usuario}</td>
                            <td className="table-data">
                                <EditarUsuario id={usuario.id} /> / <BorrarUsuario id={usuario.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link href="/usuarios/nuevo" className="link">Agregar Usuario</Link>
        </div>
    );
}