const { productosBD, ventasBD , obtenerUsuarioPorId} = require("./conexion");


// Función para crear una nueva venta
async function nuevaVenta(data) {
    console.log("Iniciando creación de venta...");

    // Transformar el array plano en un array de objetos con id y cantidad
    const productos = [];
    for (let i = 0; i < data.productos.length; i += 2) {
        productos.push({
            id: data.productos[i],
            cantidad: parseInt(data.productos[i + 1])  // Convertir la cantidad a número
        });
    }

    let total = 0;

    // Validar los productos y calcular el total
    for (let producto of productos) {
        console.log(`Validando producto con ID: ${producto.id}`);

        try {
            const productoData = await productosBD.doc(producto.id).get();
            if (!productoData.exists) {
                console.log(`El producto con ID ${producto.id} no existe`);
                return { success: false, message: `El producto con ID ${producto.id} no existe` };
            }

            const productoInfo = productoData.data();
            const precio = productoInfo.precio;

            const subtotal = precio * producto.cantidad;
            total += subtotal;

            console.log(`Producto con ID ${producto.id} validado correctamente, precio: ${precio}, cantidad: ${producto.cantidad}, subtotal: ${subtotal}`);
        } catch (error) {
            console.error(`Error al validar el producto con ID ${producto.id}:`, error);
            return { success: false, message: `Error al validar el producto con ID ${producto.id}` };
        }
    }

    // Creamos la venta con estatus "vendido"
    const venta = {
        usuarioId: data.usuarioId,
        productos: productos,
        total: total,
        estatus: "vendido",  // Estatus inicial de la venta
        fecha: new Date()
    };

    console.log("Guardando la venta en Firebase...");
    try {
        const nuevaVentaRef = await ventasBD.doc();  // Generar ID de la venta
        await nuevaVentaRef.set(venta);  // Guardar la venta
        console.log("Venta registrada exitosamente");
        return { success: true, message: "Venta registrada exitosamente", ventaId: nuevaVentaRef.id };
    } catch (error) {
        console.error("Error al registrar la venta:", error);
        return { success: false, message: "Error al registrar la venta" };
    }
}




async function buscarVentaPorId(ventaId) {
    console.log(`Buscando la venta con ID: ${ventaId}`);

    try {
        const ventaDoc = await ventasBD.doc(ventaId).get();
        if (!ventaDoc.exists) {
            return { success: false, message: `La venta con ID ${ventaId} no existe` };
        }
        console.log(`Venta con ID ${ventaId} encontrada`);
        return { success: true, venta: ventaDoc.data() };
    } catch (error) {
        console.error(`Error al buscar la venta con ID ${ventaId}:`, error);
        return { success: false, message: `Error al buscar la venta con ID ${ventaId}` };
    }
}


async function cancelarVenta(ventaId) {
    console.log(`Cancelando la venta con ID: ${ventaId}`);

    try {
        const ventaDoc = await ventasBD.doc(ventaId).get();
        if (!ventaDoc.exists) {
            return { success: false, message: `La venta con ID ${ventaId} no existe` };
        }

        // Cambiar el estatus a "cancelado"
        await ventasBD.doc(ventaId).update({ estatus: "cancelado" });
        console.log(`Venta con ID ${ventaId} cancelada`);
        return { success: true, message: `Venta con ID ${ventaId} cancelada exitosamente` };
    } catch (error) {
        console.error(`Error al cancelar la venta con ID ${ventaId}:`, error);
        return { success: false, message: `Error al cancelar la venta con ID ${ventaId}` };
    }
}

/*Función original para mostrar todas las ventas
async function mostrarVentas() {
    const ventas = await ventasBD.get();
    let ventasValidas = [];

    ventas.forEach(venta => {
        ventasValidas.push({ id: venta.id, ...venta.data() });
    });

    return ventasValidas;
}*/

async function mostrarVentas() {
    const ventas = await ventasBD.get();
    let ventasValidas = [];

    for (const venta of ventas.docs) {
        const ventaData = venta.data();
        let usuarioNombre = "Usuario no encontrado"; // Valor por defecto si no se encuentra

        try {
            // Obtener el nombre del usuario usando el usuarioId
            const usuario = await obtenerUsuarioPorId(ventaData.usuarioId);
            if (usuario.exists) {
                usuarioNombre = usuario.data().nombre;
            }
        } catch (error) {
            console.error(`Error al obtener usuario con ID ${ventaData.usuarioId}:`, error);
        }

        ventasValidas.push({
            id: venta.id,
            usuarioNombre, // Incluimos el nombre del usuario
            ...ventaData,
        });
    }

    return ventasValidas;
}



productosBD.get()
    .then(snapshot => {
        if (snapshot.empty) {
            console.log('No se encontraron productos.');
        } else {
            console.log('Conexión a productos exitosa.');
        }
    })
    .catch(err => {
        console.log('Error al conectar a productos:', err);
    });


async function modificarVenta(ventaId, nuevosDatos) {
    console.log(`Modificando la venta con ID: ${ventaId}`);

    try {
        const ventaDoc = await ventasBD.doc(ventaId).get();
        if (!ventaDoc.exists) {
            return { success: false, message: `La venta con ID ${ventaId} no existe` };
        }

        // Actualizar la venta con los nuevos datos
        await ventasBD.doc(ventaId).update(nuevosDatos);
        console.log(`Venta con ID ${ventaId} modificada exitosamente`);
        return { success: true, message: `Venta con ID ${ventaId} modificada exitosamente` };
    } catch (error) {
        console.error(`Error al modificar la venta con ID ${ventaId}:`, error);
        return { success: false, message: `Error al modificar la venta con ID ${ventaId}` };
    }
}

module.exports = {
    nuevaVenta,
    mostrarVentas,
    buscarVentaPorId,
    cancelarVenta,
    modificarVenta, 
};

