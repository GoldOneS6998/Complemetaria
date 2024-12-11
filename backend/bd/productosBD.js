const { productosBD } = require("./conexion");
const Producto = require("../clases/Producto");

function validar(producto) {
    return producto.nombre !== undefined && producto.cantidad !== undefined && producto.precio !== undefined;
}

async function mostrarProductos() {
    const productos = await productosBD.get();
    const productosValidos = [];

    productos.forEach(producto => {
        const producto1 = new Producto({ id: producto.id, ...producto.data() });
        if (validar(producto1.datos)) {
            productosValidos.push(producto1.datos);
        }
    });

    return productosValidos;
}

async function buscarPorId(id) {
    const producto = await productosBD.doc(id).get();
    const producto1 = new Producto({ id: producto.id, ...producto.data() });
    return validar(producto1.datos) ? producto1.datos : undefined;
}

async function nuevoProducto(data) {
    const producto1 = new Producto(data);
    if (validar(producto1.datos)) {
        await productosBD.doc().set(producto1.datos);
        return true;
    }
    return false;
}

async function borrarProductos(id) {
    if (await buscarPorId(id) !== undefined) {
        await productosBD.doc(id).delete();
        return true;
    }
    return false;
}

async function modificarProducto(id, nuevosDatos) {
    const productoDoc = await productosBD.doc(id).get();
    if (!productoDoc.exists) {
        throw new Error("Producto no encontrado");
    }
    await productosBD.doc(id).update(nuevosDatos);
    return { mensaje: "Producto actualizado correctamente", id };
}

module.exports = {
    mostrarProductos,
    nuevoProducto,
    borrarProductos,
    buscarPorId,
    modificarProducto,
};
