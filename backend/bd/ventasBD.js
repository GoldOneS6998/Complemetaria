const { productosBD, ventasBD, obtenerUsuarioPorId } = require("./conexion");

async function nuevaVenta(data) {
    console.log("Iniciando creación de venta...");

    const productos = [];
    for (let i = 0; i < data.productos.length; i += 2) {
        productos.push({
            id: data.productos[i],
            cantidad: parseInt(data.productos[i + 1])
        });
    }

    let total = 0;

    for (let producto of productos) {
        console.log(`Validando producto con ID: ${producto.id}`);
        try {
            const productoData = await productosBD.doc(producto.id).get();
            if (!productoData.exists) {
                return { success: false, message: `El producto con ID ${producto.id} no existe` };
            }

            const productoInfo = productoData.data();
            const subtotal = productoInfo.precio * producto.cantidad;
            total += subtotal;

            console.log(`Producto validado, subtotal: ${subtotal}`);
        } catch (error) {
            console.error(`Error validando producto con ID ${producto.id}:`, error);
            return { success: false, message: `Error validando producto con ID ${producto.id}` };
        }
    }

    const venta = {
        usuarioId: data.usuarioId,
        productos,
        total,
        estatus: "vendido",
        fecha: new Date()
    };

    console.log("Guardando la venta...");
    try {
        const nuevaVentaRef = await ventasBD.doc();
        await nuevaVentaRef.set(venta);
        return { success: true, message: "Venta registrada exitosamente", ventaId: nuevaVentaRef.id };
    } catch (error) {
        console.error("Error al registrar la venta:", error);
        return { success: false, message: "Error al registrar la venta" };
    }
}

async function buscarVentaPorId(ventaId) {
    console.log(`Buscando venta con ID: ${ventaId}`);
    try {
        const ventaDoc = await ventasBD.doc(ventaId).get();
        if (!ventaDoc.exists) {
            return { success: false, message: `La venta con ID ${ventaId} no existe` };
        }
        return { success: true, venta: ventaDoc.data() };
    } catch (error) {
        console.error(`Error buscando venta con ID ${ventaId}:`, error);
        return { success: false, message: `Error buscando venta con ID ${ventaId}` };
    }
}

async function cancelarVenta(ventaId) {
    console.log(`Cancelando venta con ID: ${ventaId}`);
    try {
        const ventaDoc = await ventasBD.doc(ventaId).get();
        if (!ventaDoc.exists) {
            return { success: false, message: `La venta con ID ${ventaId} no existe` };
        }
        await ventasBD.doc(ventaId).update({ estatus: "cancelado" });
        return { success: true, message: `Venta con ID ${ventaId} cancelada exitosamente` };
    } catch (error) {
        console.error(`Error cancelando venta con ID ${ventaId}:`, error);
        return { success: false, message: `Error cancelando venta con ID ${ventaId}` };
    }
}

async function mostrarVentas() {
    console.log("Obteniendo ventas...");
    try {
        const ventas = await ventasBD.get();
        const ventasValidas = [];

        for (const venta of ventas.docs) {
            const ventaData = venta.data();
            let usuarioNombre = "Usuario no encontrado";

            try {
                const usuario = await obtenerUsuarioPorId(ventaData.usuarioId);
                if (usuario.exists) {
                    usuarioNombre = usuario.data().nombre;
                }
            } catch (error) {
                console.error(`Error obteniendo usuario con ID ${ventaData.usuarioId}:`, error);
            }

            ventasValidas.push({
                id: venta.id,
                usuarioNombre,
                ...ventaData,
            });
        }

        return ventasValidas;
    } catch (error) {
        console.error("Error obteniendo ventas:", error);
        return [];
    }
}

async function modificarVenta(ventaId, nuevosDatos) {
    console.log(`Modificando venta con ID: ${ventaId}`);
    try {
        const ventaDoc = await ventasBD.doc(ventaId).get();
        if (!ventaDoc.exists) {
            return { success: false, message: `La venta con ID ${ventaId} no existe` };
        }

        await ventasBD.doc(ventaId).update(nuevosDatos);
        return { success: true, message: `Venta con ID ${ventaId} modificada exitosamente` };
    } catch (error) {
        console.error(`Error modificando venta con ID ${ventaId}:`, error);
        return { success: false, message: `Error modificando venta con ID ${ventaId}` };
    }
}

module.exports = {
    nuevaVenta,
    mostrarVentas,
    buscarVentaPorId,
    cancelarVenta,
    modificarVenta,
};
