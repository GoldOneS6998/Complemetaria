const { usuariosBD } = require("./conexion");
const Usuario = require("../clases/Usuario");
const { validarPassword, encriptarPassword } = require("../middlewares/funcionesPassword");

function validar(usuario) {
    return usuario.nombre !== undefined && usuario.usuario !== undefined && usuario.password !== undefined;
}

async function mostrarUsuarios() {
    const usuarios = await usuariosBD.get();
    const usuariosValidos = [];

    usuarios.forEach(usuario => {
        const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
        if (validar(usuario1.datos)) {
            usuariosValidos.push(usuario1.datos);
        }
    });

    return usuariosValidos;
}

async function buscarPorId(id) {
    const usuario = await usuariosBD.doc(id).get();
    const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });

    if (validar(usuario1.datos)) {
        const { password, salt, ...usuarioSinPassword } = usuario1.datos;
        return usuarioSinPassword;
    }
    return undefined;
}

async function nuevoUsuario(data) {
    const { hash, salt } = encriptarPassword(data.password);
    data.password = hash;
    data.salt = salt;
    data.tipoUsuario = "usuario";

    const usuario1 = new Usuario(data);
    if (validar(usuario1.datos)) {
        await usuariosBD.doc().set(usuario1.datos);
        return true;
    }
    return false;
}

async function borrarUsuarios(id) {
    if (await buscarPorId(id) !== undefined) {
        await usuariosBD.doc(id).delete();
        return true;
    }
    return false;
}

async function modificarUsuario(id, nuevosDatos) {
    const usuarioDoc = await usuariosBD.doc(id).get();
    if (!usuarioDoc.exists) {
        throw new Error("Usuario no encontrado");
    }

    if (nuevosDatos.password) {
        const { hash, salt } = encriptarPassword(nuevosDatos.password);
        nuevosDatos.password = hash;
        nuevosDatos.salt = salt;
    } else {
        delete nuevosDatos.password;
        delete nuevosDatos.salt;
    }

    await usuariosBD.doc(id).update(nuevosDatos);
    return { mensaje: "Usuario actualizado correctamente", id };
}

async function login(req, usuario, password) {
    const usuarioEncontrado = await usuariosBD.where("usuario", "==", usuario).get();
    const user = { usuario: "anónimo", tipo: "sin acceso" };

    if (usuarioEncontrado.size > 0) {
        usuarioEncontrado.forEach(usu => {
            if (validarPassword(password, usu.data().salt, usu.data().password)) {
                user.usuario = usu.data().usuario;
                if (usu.data().tipoUsuario === "usuario") {
                    req.session.usuario = user.usuario;
                    user.tipo = "usuario";
                } else if (usu.data().usuario === "admin") {
                    req.session.admin = user;
                    user.tipo = "admin";
                }
            }
        });
    }
    return user;
}

function getSessionUsuario(req) {
    return req.session.usuario !== undefined || req.session.admin !== undefined;
}

function getSessionAdmin(req) {
    return req.session.admin !== undefined;
}

module.exports = {
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuarios,
    buscarPorId,
    modificarUsuario,
    login,
    getSessionUsuario,
    getSessionAdmin,
};
