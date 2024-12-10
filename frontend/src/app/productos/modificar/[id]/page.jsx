"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import "../../../estilos.css"; // Asegúrate de que la ruta sea correcta

async function actualizarProducto(e, id, datos, setMensaje) {
    e.preventDefault();
    const url = `http://localhost:3000/productos/modificarProducto/${id}`;
    
    try {
        const respuesta = await axios.put(url, datos);
        console.log(respuesta);
        setMensaje("Producto modificado exitosamente.");
        setTimeout(() => {
            window.location.href = "/productos/mostrar";
        }, 2000);
    } catch (error) {
        console.error("Error al modificar el producto:", error);
        setMensaje("Error al modificar el producto.");
    }
}

export default function EditarProducto({ params }) {
    const [producto, setProducto] = useState({
        nombre: "",
        cantidad: "",
        precio: ""
    });
    const [mensaje, setMensaje] = useState("");
    const { id } = params;

    useEffect(() => {
        async function obtenerProducto() {
            if (id) {
                const url = `http://localhost:3000/productos/buscarPorId/${id}`;
                try {
                    const respuesta = await axios.get(url);
                    setProducto(respuesta.data);
                } catch (error) {
                    console.error("Error al cargar producto:", error);
                }
            }
        }
        obtenerProducto();
    }, [id]);

    function handleChange(e) {
        const { id, value } = e.target;
        setProducto({ ...producto, [id]: value });
    }

    return (
        <div className="container">
            <h1 className="titulo">Modificar Producto</h1>
            <form onSubmit={(e) => actualizarProducto(e, id, producto, setMensaje)} className="col-12">
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
                            Modificar producto
                        </button>
                    </div>
                </div>
                {mensaje && <p className="text-center mt-3">{mensaje}</p>}
            </form>
        </div>
    );
}
