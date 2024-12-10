"use client";

import axios from "axios";
import "../../estilos.css"; // Asegúrate de que esta ruta sea correcta

async function guardarUsuario(e) {
    e.preventDefault();
    console.log("Función guardar usuario");
    const url = "http://localhost:3000/nuevoUsuario";
    const datos = {
        nombre: document.getElementById("nombre").value,
        usuario: document.getElementById("usuario").value,
        password: document.getElementById("password").value,
    };

    try {
        const respuesta = await axios.post(url, datos);
        console.log(respuesta);
        location.replace("http://localhost:3001/usuarios/mostrar");
    } catch (error) {
        console.error("Error al guardar el usuario:", error);
    }
}

export default function Nuevo() {
    return (
        <div className="container">
            <h1 className="titulo">Nuevo Usuario</h1>
            <p className="descripcion">Completa el formulario para crear un nuevo usuario</p>
            <form onSubmit={guardarUsuario} className="col-12">
                <div className="card text-center">
                    <div className="card-body">
                        <input 
                            className="form-control mb-3"
                            type="text"
                            id="nombre"
                            placeholder="Nombre"
                            autoFocus
                            style={{ height: "60px" }}
                        />
                        <input 
                            className="form-control mb-3"
                            type="text"
                            id="usuario"
                            placeholder="Usuario"
                            style={{ height: "60px" }}
                        />
                        <input 
                            className="form-control mb-3"
                            type="password"
                            id="password"
                            placeholder="Password"
                            style={{ height: "60px" }}
                        />
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn-red">
                            Guardar nuevo usuario
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
