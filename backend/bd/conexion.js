// Requerimos el paquete que instalamos llamado "firebase-admin"
const admin = require("firebase-admin");
// Cargamos las credenciales de Firebase desde un archivo JSON
const keys = require("../keys.json");


// Iniciamos la conexión con Firebase utilizando las credenciales proporcionadas
admin.initializeApp({
    credential: admin.credential.cert(keys) // Autenticamos con un certificado de servicio
});

// Nos conectamos a Firebase Firestore (la base de datos NoSQL de Firebase)
const bd = admin.firestore();

// Llamamos a la colección "miejemploBD" en Firestore, donde se almacenan los datos de usuarios
const usuariosBD = bd.collection("ejemplobd");

// Llamamos a la colección "productos" en Firestore, donde se almacenan los datos de productos
const productosBD = bd.collection("producto");

// Llamamos a la colección "ventas" en Firestore, donde se almacenan los datos de las ventas generadas
const ventasBD = bd.collection("ventas");

//nuevo: obtener usuario por id
async function obtenerUsuarioPorId(id) {
    try {
        const usuarioDoc = await usuariosBD.doc(id).get();
        return usuarioDoc; // Retorna el documento completo para que puedas manejar los datos en otro lugar
    } catch (error) {
        console.error(`Error al obtener usuario con ID ${id}:`, error);
        throw error; // Lanza el error para manejarlo en la función que lo llame
    }
}

// Exportamos las colecciones para que puedan ser utilizadas en otros módulos del proyecto
module.exports = {
    usuariosBD,
    productosBD,
    ventasBD,
    obtenerUsuarioPorId,
}

// console.log(usuariosBD); 
