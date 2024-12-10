"use client"; // Asegúrate de que este archivo sea un Client Component

import Link from "next/link";
import axios from "axios";
import '../../estilos.css';
import BorrarVenta from "@/components/borrarVenta";
import EditarVentaLink from "@/components/editarVentaLink";

async function getVentas(searchTerm) {
    const url = "http://localhost:3000/ventas";
    const ventas = await axios.get(url);
    if (searchTerm) {
        return ventas.data.filter(venta => 
            venta.usuarioNombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    return ventas.data;
}

async function getProductos() {
    const url = "http://localhost:3000/productos";
    const productos = await axios.get(url);
    return productos.data;
}

function formatDate(timestamp) {
    const date = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1e6);
    return date.toLocaleString();
}

export default async function Ventas({ searchParams }) {
    const searchTerm = searchParams.search || ""; // Obtener el término de búsqueda de los parámetros de búsqueda
    const ventas = await getVentas(searchTerm); // Pasar el término de búsqueda a getVentas
    const productos = await getProductos();

    // Filtrar ventas que tengan el estatus "vendido"
    const ventasVendidas = ventas.filter((venta) => venta.estatus === "vendido");

    return (
        <div className="container">
            <h1 className="titulo">Ventas</h1>
            <p className="descripcion">Estas en ventas</p>
            <table className="table">
                <thead>
                    <tr>
                        <th className="table-header">Nombre del Usuario</th>
                        <th className="table-header">Estatus</th>
                        <th className="table-header">Fecha</th>
                        <th className="table-header">Productos</th>
                        <th className="table-header">Editar / Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {ventasVendidas.map((venta) => (
                        <tr key={venta.id}>
                            <td className="table-data">{venta.usuarioNombre}</td>
                            <td className="table-data">{venta.estatus}</td>
                            <td className="table-data">{formatDate(venta.fecha)}</td>
                            <td className="table-data">
                                {venta.productos.map((producto) => {
                                    const productoInfo = productos.find((prod) => prod.id === producto.id);
                                    return (
                                        <div key={producto.id}>
                                            Nombre: {productoInfo ? productoInfo.nombre + " /---/ " : "Producto no encontrado "}
                                            Cantidad: {producto.cantidad}
                                        </div>
                                    );
                                })}
                            </td>
                            <td className="table-data">
                                <EditarVentaLink id={venta.id} /> / <BorrarVenta id={venta.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link href="/ventas/nuevo" className="link">Agregar Venta</Link>
        </div>
    );
}