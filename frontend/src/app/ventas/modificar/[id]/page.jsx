"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import "../../../estilos.css";

async function modificarVenta(e, id, ventaData, setMensaje) {
    e.preventDefault();
    const url = `http://localhost:3000/ventas/modificarVenta/${id}`;

    try {
        const respuesta = await axios.put(url, ventaData);
        console.log(respuesta);
        setMensaje("Venta modificada exitosamente.");
        setTimeout(() => {
            window.location.href = "/ventas/mostrar";
        }, 2000);
    } catch (error) {
        console.error("Error al modificar la venta:", error);
        setMensaje("Error al modificar la venta.");
    }
}

export default function EditarVentaForm({ params }) {
    const [venta, setVenta] = useState({
        usuarioId: "",
        tempClientName: "",
        productos: [],
        estatus: "",
    });
    const [mensaje, setMensaje] = useState("");
    const [availableProducts, setAvailableProducts] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [modificationDate, setModificationDate] = useState(new Date().toLocaleDateString());
    const { id } = params;

    useEffect(() => {
        async function fetchVentaData() {
            const url = `http://localhost:3000/ventas/buscarVentaPorId/${id}`;
            const response = await axios.get(url);
            setVenta(response.data.venta);
        }

        async function fetchResources() {
            const productsResponse = await axios.get("http://localhost:3000/productos");
            setAvailableProducts(productsResponse.data);

            const usersResponse = await axios.get("http://localhost:3000/");
            setAvailableUsers(usersResponse.data);
        }

        fetchVentaData();
        fetchResources();
    }, [id]);

    const handleClientSelection = (e) => {
        const userInput = e.target.value;
        const selectedUser = availableUsers.find((user) => user.nombre === userInput);

        if (selectedUser) {
            setVenta({ ...venta, usuarioId: selectedUser.id, tempClientName: "" });
        } else {
            setVenta({ ...venta, usuarioId: "", tempClientName: userInput });
        }
    };

    const handleProductSelectionChange = (index, field, value) => {
        setVenta((prevVenta) => {
            const updatedProducts = [...prevVenta.productos];
            if (field === "id") {
                const selectedProduct = availableProducts.find((product) => product.nombre === value);
                updatedProducts[index] = {
                    ...updatedProducts[index],
                    id: selectedProduct ? selectedProduct.id : "",
                    tempProductName: value,
                };
            } else {
                updatedProducts[index][field] = value;
            }
            return { ...prevVenta, productos: updatedProducts };
        });
    };

    return (
        <div className="container">
            <h1 className="titulo">Modificar Venta</h1>
            <form onSubmit={(e) => modificarVenta(e, id, venta, setMensaje)} className="col-12">
                <div className="card text-center">
                    <div className="card-body">
                        <input
                            className="form-control mb-3"
                            list="usuarios"
                            value={availableUsers.find((user) => user.id === venta.usuarioId)?.nombre || venta.tempClientName || ""}
                            onChange={handleClientSelection}
                            required
                            placeholder="Seleccionar Cliente"
                            style={{ height: "60px" }}
                        />
                        <datalist id="usuarios">
                            {availableUsers.map((user) => (
                                <option key={user.id} value={user.nombre}>
                                    {user.nombre}
                                </option>
                            ))}
                        </datalist>

                        <input
                            className="form-control mb-3"
                            type="text"
                            value={`Fecha de Modificación: ${modificationDate}`}
                            disabled
                            style={{ height: "60px" }}
                        />

                        {venta.productos.map((producto, index) => (
                            <div key={index} className="product-selection-row mb-3">
                                <input
                                    className="form-control mb-2"
                                    list={`productos-${index}`}
                                    value={availableProducts.find((product) => product.id === producto.id)?.nombre || producto.tempProductName || ""}
                                    onChange={(e) => handleProductSelectionChange(index, "id", e.target.value)}
                                    required
                                    placeholder="Seleccionar Producto"
                                    style={{ height: "60px" }}
                                />
                                <datalist id={`productos-${index}`}>
                                    {availableProducts.map((product) => (
                                        <option key={product.id} value={product.nombre}>
                                            {product.nombre}
                                        </option>
                                    ))}
                                </datalist>
                                <input
                                    className="form-control"
                                    type="number"
                                    min="1"
                                    placeholder="Cantidad"
                                    value={producto.cantidad}
                                    onChange={(e) => handleProductSelectionChange(index, "cantidad", Number(e.target.value))}
                                    required
                                    style={{ height: "60px" }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="card-footer">
                        <button type="submit" className="btn-red">
                            Modificar venta
                        </button>
                    </div>
                </div>
                {mensaje && <p className="text-center mt-3">{mensaje}</p>}
            </form>
        </div>
    );
}
