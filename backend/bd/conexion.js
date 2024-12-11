const admin = require("firebase-admin");
const keys = require("../keys.json");

admin.initializeApp({
    credential: admin.credential.cert(keys)
});

const bd = admin.firestore();
const usuariosBD = bd.collection("ejemplobd");
const productosBD = bd.collection("producto");
const ventasBD = bd.collection("ventas");

async function obtenerUsuarioPorId(id) {
    try {
        const usuarioDoc = await usuariosBD.doc(id).get();
        return usuarioDoc;
    } catch (error) {
        console.error(`Error al obtener usuario con ID ${id}:`, error);
        throw error;
    }
}

module.exports = {
    usuariosBD,
    productosBD,
    ventasBD,
    obtenerUsuarioPorId,
};