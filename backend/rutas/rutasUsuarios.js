var rutas = require("express").Router();
var { mostrarUsuarios, nuevoUsuario, borrarUsuarios, buscarPorId, modificarUsuario, login, getSessionUsuario, getSessionAdmin } = require("../bd/usuariosBD");
//var {Router} = require("express");

rutas.get("/", async (req, res) => {
    //res.send("Hola estas en raiz");
    var usuariosValidos = await mostrarUsuarios();
    //console.log(usuariosValidos);
    res.json(usuariosValidos);

});

rutas.get("/buscarPorId/:id", async (req, res) => {
    var usuarioValido = await buscarPorId(req.params.id);
    res.json(usuarioValido);
});

rutas.post("/nuevoUsuario", async (req, res) => {
    console.log(req.body);
    var usuarioGuardado = await nuevoUsuario(req.body);
    res.json(usuarioGuardado);
});

rutas.delete("/borrarUsuario/:id", async (req, res) => {
    var usuarioBorrado = await borrarUsuarios(req.params.id);
    res.json(usuarioBorrado);
});

rutas.put("/modificarUsuario/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const nuevosDatos = req.body;

        // Llama a la función modificarUsuario con el ID y los nuevos datos.
        const resultado = await modificarUsuario(id, nuevosDatos);
        console.log("Edición realizada correctamente");
        res.json(resultado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

rutas.post("/login", async (req, res) => {
    //console.log(req.body);
    const usuario = await login(req, req.body.usuario, req.body.password);
    console.log("Login------------------");
    console.log(usuario);
    res.json(usuario);
});

rutas.get("/getSessionUsuario", (req, res) =>{
    var sesionValida = getSessionUsuario(req);
    console.log("getSessionUsuario------------------");
    console.log(sesionValida);
    res.json(getSessionUsuario(req));
});


rutas.get("/getSessionAdmin", (req, res) =>{
    res.json(getSessionAdmin(req));
});

module.exports = rutas;