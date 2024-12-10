"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import qs from "qs";
import "../../estilos.css"; // Asegúrate de que esta ruta sea correcta

// Fetch available products
async function fetchAvailableProducts() {
    const url = "http://localhost:3000/productos";
    const productos = await axios.get(url);
    return productos.data;
}

// Fetch available clients
async function fetchUsuarios() {
    const url = "http://localhost:3000/";
    const usuarios = await axios.get(url);
    return usuarios.data;
}

export default function NuevaVenta() {
    const router = useRouter();
    const [ventaData, setVentaData] = useState({
        clientId: "",
        tempClientName: "",
        productos: [],
        fecha: new Date().toLocaleDateString(),
    });
    const [availableProducts, setAvailableProducts] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [productSelections, setProductSelections] = useState([{ productId: "", tempProductName: "", quantity: 1 }]);

    useEffect(() => {
        fetchAvailableProducts().then(setAvailableProducts);
        fetchUsuarios().then(setAvailableUsers);
    }, []);

    const handleClientSelection = (e) => {
        const userInput = e.target.value;
        const selectedUser = availableUsers.find((user) => user.nombre === userInput);

        if (selectedUser) {
            setVentaData({ ...ventaData, clientId: selectedUser.id, tempClientName: "" });
        } else {
            setVentaData({ ...ventaData, clientId: "", tempClientName: userInput });
        }
    };

    const addProductSelection = () => {
        setProductSelections([...productSelections, { productId: "", tempProductName: "", quantity: 1 }]);
    };

    const handleProductSelectionChange = (index, field, value) => {
        setProductSelections((prevSelections) => {
            const updatedSelections = [...prevSelections];
            if (field === "productId") {
                const selectedProduct = availableProducts.find((product) => product.nombre === value);
                updatedSelections[index] = {
                    ...updatedSelections[index],
                    productId: selectedProduct ? selectedProduct.id : "",
                    tempProductName: value,
                };
            } else {
                updatedSelections[index][field] = value;
            }
            return updatedSelections;
        });
    };

    async function enviarVenta(e) {
        e.preventDefault();

        const productos = productSelections
            .filter((selection) => selection.productId)
            .map((selection, index) => ({
                [`productos[${index}].id`]: selection.productId,
                [`productos[${index}].cantidad`]: selection.quantity,
            }));

        const ventaPayload = {
            usuarioId: ventaData.clientId,
            ...Object.assign({}, ...productos),
        };

        const url = "http://localhost:3000/ventas/nuevaVenta";

        try {
            const respuesta = await axios.post(url, qs.stringify(ventaPayload), {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });
            alert("Gracias por tu compra");
            router.replace("/ventas/mostrar");
        } catch (error) {
            console.error("Detalles del error al enviar la solicitud de venta:", error.response?.data || error.message);
            alert("Ocurrió un error al enviar la solicitud de venta");
        }
    }

    return (
        <div className="container">
            <h1 className="titulo">Nueva Venta</h1>
            <p className="descripcion">Completa la información para registrar una nueva venta</p>
            <form onSubmit={enviarVenta} className="col-12">
                <div className="card text-center">
                    <div className="card-body">
                        <input
                            style={{ height: "60px" }}
                            className="form-control mb-3"
                            list="usuarios"
                            value={availableUsers.find((user) => user.id === ventaData.clientId)?.nombre || ventaData.tempClientName || ""}
                            onChange={handleClientSelection}
                            required
                            placeholder="Seleccionar Cliente"
                        />
                        <datalist id="usuarios">
                            {availableUsers.map((user) => (
                                <option key={user.id} value={user.nombre}>
                                    {user.nombre}
                                </option>
                            ))}
                        </datalist>

                        <input
                            style={{ height: "60px" }}
                            className="form-control mb-3"
                            type="text"
                            value={`Fecha de Venta: ${ventaData.fecha}`}
                            disabled
                        />

                        {productSelections.map((selection, index) => (
                            <div key={index} className="product-selection-row mb-3">
                                <input
                                    style={{ height: "60px" }}
                                    className="form-control mb-2"
                                    list={`productos-${index}`}
                                    value={availableProducts.find((product) => product.id === selection.productId)?.nombre || selection.tempProductName || ""}
                                    onChange={(e) => handleProductSelectionChange(index, "productId", e.target.value)}
                                    required
                                    placeholder="Seleccionar Producto"
                                />
                                <datalist id={`productos-${index}`}>
                                    {availableProducts.map((product) => (
                                        <option key={product.id} value={product.nombre}>
                                            {product.nombre}
                                        </option>
                                    ))}
                                </datalist>
                                <input
                                    style={{ height: "60px" }}
                                    className="form-control"
                                    type="number"
                                    min="1"
                                    placeholder="Cantidad"
                                    value={selection.quantity}
                                    onChange={(e) => handleProductSelectionChange(index, "quantity", Number(e.target.value))}
                                    required
                                />
                            </div>
                        ))}

                        <button type="button" className="btn btn-secondary mb-3" onClick={addProductSelection}>
                            Agregar Otro Producto
                        </button>

                        <div className="selected-products">
                            <h5>Productos Seleccionados:</h5>
                            <ul>
                                {productSelections.map((prod, index) => {
                                    const product = availableProducts.find((p) => p.id === prod.productId);
                                    return product ? (
                                        <li key={index}>
                                            {product.nombre} - Cantidad: {prod.quantity}
                                        </li>
                                    ) : null;
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className="card-footer">
                        <button type="submit" className="btn-red">
                            Enviar solicitud de venta
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
