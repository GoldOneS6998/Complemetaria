"use client";

import axios from "axios";
import { useState } from "react";
import "../../estilos.css"; // Asegúrate de que esta ruta sea correcta

async function guardarProducto(e, datos, setMensaje) {
    e.preventDefault();
    const url = "http://localhost:3000/productos/nuevoProducto";
    
    try {
        const respuesta = await axios.post(url, datos);
        console.log(respuesta);
        setMensaje("Producto creado exitosamente.");
        setTimeout(() => {
            window.location.href = "/productos/mostrar";
        }, 2000);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        setMensaje("Error al crear el producto.");
    }
}

export default function NuevoProducto() {
    const [producto, setProducto] = useState({
        nombre: "",
        cantidad: "",
        precio: ""
    });
    const [mensaje, setMensaje] = useState("");

    function handleChange(e) {
        const { id, value } = e.target;
        setProducto({ ...producto, [id]: value });
    }

    return (
        <div className="container">
            <h1 className="titulo">Nuevo Producto</h1>
            <p className="descripcion">Completa el formulario para crear un nuevo producto</p>
            <form onSubmit={(e) => guardarProducto(e, producto, setMensaje)} className="col-12">
                <div className="card text-center">
                    <div className="card-body">
                        <input 
                            className="form-control mb-3" 
                            type="text" 
                            id="nombre" 
                            placeholder="Nombre" 
                            value={producto.nombre} 
                            onChange={handleChange} 
                            style={{ height: "60px" }}
                            autoFocus 
                        />
                        <input 
                            className="form-control mb-3" 
                            type="text" 
                            id="cantidad" 
                            placeholder="Cantidad" 
                            value={producto.cantidad} 
                            onChange={handleChange} 
                            style={{ height: "60px" }}
                        />
                        <input 
                            className="form-control mb-3" 
                            type="text" 
                            id="precio" 
                            placeholder="Precio" 
                            value={producto.precio} 
                            onChange={handleChange} 
                            style={{ height: "60px" }}
                        />
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn-red">
                            Guardar nuevo producto
                        </button>
                    </div>
                </div>
                {mensaje && <p className="text-center mt-3">{mensaje}</p>}
            </form>
        </div>
    );
}
