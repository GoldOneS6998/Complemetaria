const rutas = require("express").Router();
const { 
    mostrarUsuarios, 
    nuevoUsuario, 
    borrarUsuarios, 
    buscarPorId, 
    modificarUsuario, 
    login, 
    getSessionUsuario, 
    getSessionAdmin 
} = require("../bd/usuariosBD");

rutas.get("/", async (req, res) => {
    const usuariosValidos = await mostrarUsuarios();
    res.json(usuariosValidos);
});

rutas.get("/buscarPorId/:id", async (req, res) => {
    const usuarioValido = await buscarPorId(req.params.id);
    res.json(usuarioValido);
});

rutas.post("/nuevoUsuario", async (req, res) => {
    const usuarioGuardado = await nuevoUsuario(req.body);
    res.json(usuarioGuardado);
});

rutas.delete("/borrarUsuario/:id", async (req, res) => {
    const usuarioBorrado = await borrarUsuarios(req.params.id);
    res.json(usuarioBorrado);
});

rutas.put("/modificarUsuario/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const nuevosDatos = req.body;
        const resultado = await modificarUsuario(id, nuevosDatos);
        res.json(resultado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

rutas.post("/login", async (req, res) => {
    const usuario = await login(req, req.body.usuario, req.body.password);
    res.json(usuario);
});

rutas.get("/getSessionUsuario", (req, res) => {
    const sesionValida = getSessionUsuario(req);
    res.json(sesionValida);
});

rutas.get("/getSessionAdmin", (req, res) => {
    res.json(getSessionAdmin(req));
});

module.exports = rutas;