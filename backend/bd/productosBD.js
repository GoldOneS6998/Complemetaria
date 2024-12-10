// Importa el objeto `productosBD` que probablemente se usa para interactuar con Firebase.
const {productosBD} = require("./conexion");
// Importa la clase `Producto` desde otro archivo.
const Producto = require("../clases/Producto");


// Función para validar que un objeto `producto` tiene los atributos necesarios.
function validar(producto){
    var valido = false;
    // Verifica que los campos 'nombre', 'producto', y 'precio' no sean indefinidos.
    if (producto.nombre != undefined && producto.cantidad != undefined && producto.precio != undefined) {
        valido = true;
    }
    return valido;
}

// Función asíncrona que obtiene todos los productos de la base de datos.
async function mostrarProductos(){
    // Obtiene los productos de la base de datos.
    const productos = await productosBD.get();
    
    // Arreglo que almacenará los productos válidos.
    productosValidos = [];
    
    // Itera sobre cada producto.
    productos.forEach(producto => {
        // Crea una instancia de la clase `Producto` con los datos del producto extraído.
        const producto1 = new Producto({id: producto.id, ...producto.data()});
        
        // Valida si el producto tiene todos los campos requeridos.
        if (validar(producto1.datos)) {
            // Si es válido, lo agrega a la lista de productos válidos.
            productosValidos.push(producto1.datos);
        }
    });
    
    // Retorna el arreglo con los productos válidos.
    return productosValidos;
}

// Función asíncrona que busca un producto por su ID.
async function buscarPorId(id){
    var productoValido;
    
    // Busca al producto en la base de datos usando su ID.
    const producto = await productosBD.doc(id).get();
    
    // Crea una instancia de la clase `Producto` con los datos del producto encontrado.
    const producto1 = new Producto({id: producto.id, ...producto.data()});
    
    // Si el producto es válido, lo almacena en `productoValido`.
    if (validar(producto1.datos)) {
        productoValido = producto1.datos;
    }
    
    // Retorna el producto válido (si existe).
    return productoValido;
}

// Función asíncrona para crear un nuevo producto.
async function nuevoProducto(data) {
    // Crea una instancia de `Producto` con los datos proporcionados.
    const producto1 = new Producto(data);
    
    var productoValido = {};
    var productoGuardado = false;
    
    // Si los datos del producto son válidos, los guarda en la base de datos.
    if (validar(producto1.datos)) {
        productoValido = producto1.datos;
        await productosBD.doc().set(productoValido);
        productoGuardado = true;
    }
    
    // Retorna un booleano indicando si el producto fue guardado exitosamente.
    return productoGuardado;
}

// Función asíncrona para borrar un producto por su ID.
async function borrarProductos(id) {
    var productoBorrado = true;
    
    // Busca al producto en la base de datos usando su ID.
    if (await buscarPorId(id) != undefined) {
        console.log("Se borrará el producto");
        
        // Borra al producto de la base de datos si existe.
        await productosBD.doc(id).delete();
    }
    
    // Retorna un booleano indicando que el producto fue borrado (por defecto `true`).
    return productoBorrado;
}

// Ejemplo de función para modificar un producto
async function modificarProducto(id, nuevosDatos) {
    try {
        const productoDoc = await productosBD.doc(id).get();
        if (!productoDoc.exists) {
            throw new Error("Producto no encontrado");
        }
        await productosBD.doc(id).update(nuevosDatos);
        return { mensaje: "Producto actualizado correctamente", id };
    } catch (error) {
        console.error("Error al modificar producto:", error);
        throw error;
    }
}



module.exports = {
    mostrarProductos,
    nuevoProducto,
    borrarProductos,
    buscarPorId,
    modificarProducto, // Asegúrate de exportar la función
};

//borrarProductos("60lHh5DKcWbICJqsR7v1"); // Elimina el producto con ID "103"
//mostrarProductos(); // Llama a la función para mostrar productos
//buscarPorId("AA9neFFUFEDZNMPWc1mD"); // Busca al producto con ID "102"
//nuevoProducto(data1); // Crea un nuevo producto con los datos proporcionados
