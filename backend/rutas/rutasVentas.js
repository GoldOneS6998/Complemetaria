
const rutas = require("express").Router();
const { nuevaVenta, mostrarVentas, buscarVentaPorId, cancelarVenta, modificarVenta } = require("../bd/ventasBD");


// Ruta para mostrar todas las ventas
rutas.get("/ventas", async (req, res) => {
    try {
        console.log("Recibida solicitud para mostrar todas las ventas");
        const ventas = await mostrarVentas();
        res.json(ventas);
    } catch (error) {
        console.error("Error al obtener todas las ventas:", error);
        res.status(500).json({ success: false, message: "Error al obtener las ventas" });
    }
});

// Ruta para crear una nueva venta
rutas.post("/ventas/nuevaVenta", async (req, res) => {
    try {
        const resultado = await nuevaVenta(req.body);
        res.json(resultado);
    } catch (error) {
        console.error("Error al generar nueva venta:", error);
        res.status(500).json({ success: false, message: "Error al generar la venta" });
    }
});

// Ruta para buscar una venta por ID usando "/ventas/buscarVentaPorId/:ventaId"
rutas.get("/ventas/buscarVentaPorId/:ventaId", async (req, res) => {
    try {
        console.log(`Recibida solicitud para buscar la venta con ID: ${req.params.ventaId}`);
        const resultado = await buscarVentaPorId(req.params.ventaId);
        res.json(resultado);
    } catch (error) {
        console.error(`Error al buscar venta con ID ${req.params.ventaId}:`, error);
        res.status(500).json({ success: false, message: "Error al buscar la venta" });
    }
});

// Ruta para cancelar una venta usando "/ventas/cancelarVenta/:ventaId"
rutas.patch("/ventas/cancelarVenta/:ventaId", async (req, res) => {
    try {
        const resultado = await cancelarVenta(req.params.ventaId);
        res.json(resultado);
    } catch (error) {
        console.error(`Error al cancelar venta con ID ${req.params.ventaId}:`, error);
        res.status(500).json({ success: false, message: "Error al cancelar la venta" });
    }
});

rutas.put("/ventas/modificarVenta/:ventaId", async (req, res) => {
    try {
        const ventaId = req.params.ventaId;
        const nuevosDatos = req.body;
        const resultado = await modificarVenta(ventaId, nuevosDatos);
        res.json(resultado);
    } catch (error) {
        console.error(`Error al modificar la venta con ID ${req.params.ventaId}:`, error);
        res.status(500).json({ success: false, message: "Error al modificar la venta" });
    }
});


module.exports = rutas;

