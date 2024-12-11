const rutas = require("express").Router();
const { 
    nuevaVenta, 
    mostrarVentas, 
    buscarVentaPorId, 
    cancelarVenta, 
    modificarVenta 
} = require("../bd/ventasBD");

rutas.get("/ventas", async (req, res) => {
    try {
        const ventas = await mostrarVentas();
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener las ventas" });
    }
});

rutas.post("/ventas/nuevaVenta", async (req, res) => {
    try {
        const resultado = await nuevaVenta(req.body);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al generar la venta" });
    }
});

rutas.get("/ventas/buscarVentaPorId/:ventaId", async (req, res) => {
    try {
        const resultado = await buscarVentaPorId(req.params.ventaId);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al buscar la venta" });
    }
});

rutas.patch("/ventas/cancelarVenta/:ventaId", async (req, res) => {
    try {
        const resultado = await cancelarVenta(req.params.ventaId);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al cancelar la venta" });
    }
});

rutas.put("/ventas/modificarVenta/:ventaId", async (req, res) => {
    try {
        const resultado = await modificarVenta(req.params.ventaId, req.body);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al modificar la venta" });
    }
});

module.exports = rutas;
