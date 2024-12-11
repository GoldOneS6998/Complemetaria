const rutas = require("express").Router();
const { mostrarProductos, nuevoProducto, borrarProductos, buscarPorId, modificarProducto } = require("../bd/productosBD");

rutas.get("/productos", async (req, res) => {
    try {
        const productosValidos = await mostrarProductos();
        res.json(productosValidos);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener productos" });
    }
});

rutas.get("/productos/buscarPorId/:id", async (req, res) => {
    try {
        const productoValido = await buscarPorId(req.params.id);
        res.json(productoValido);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al buscar producto" });
    }
});

rutas.post("/productos/nuevoProducto", async (req, res) => {
    try {
        const productoGuardado = await nuevoProducto(req.body);
        res.json(productoGuardado);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al guardar producto" });
    }
});

rutas.delete("/productos/borrarProducto/:id", async (req, res) => {
    try {
        const productoBorrado = await borrarProductos(req.params.id);
        res.json(productoBorrado);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al borrar producto" });
    }
});

rutas.put("/productos/modificarProducto/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const nuevosDatos = req.body;
        const resultado = await modificarProducto(id, nuevosDatos);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al modificar producto" });
    }
});

module.exports = rutas;
