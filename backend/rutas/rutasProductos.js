var rutas = require("express").Router();
var { mostrarProductos, nuevoProducto, borrarProductos, buscarPorId, modificarProducto } = require("../bd/productosBD");

//var {Router} = require("express");

rutas.get("/productos", async (req, res)=>{
    //res.send("Hola estas en raiz");
    var productosValidos = await mostrarProductos();
    //console.log(productosValidos);
    res.json(productosValidos);
    
});

rutas.get("/productos/buscarPorId/:id", async (req, res)=>{
    var productoValido = await buscarPorId(req.params.id);
    res.json(productoValido);
});

rutas.post("/productos/nuevoProducto", async (req, res)=>{
    console.log(req.body);
    var productoGuardado = await nuevoProducto(req.body);
    res.json(productoGuardado);
});

rutas.delete("/productos/borrarProducto/:id", async (req, res)=>{
    var productoBorrado = await borrarProductos(req.params.id);
    res.json(productoBorrado);
});

rutas.put("/productos/modificarProducto/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const nuevosDatos = req.body;
        const resultado = await modificarProducto(id, nuevosDatos);
        res.json(resultado);
    } catch (error) {
        console.error("Error al modificar producto:", error);
        res.status(500).json({ success: false, message: "Error al modificar el producto" });
    }
});



module.exports = rutas;