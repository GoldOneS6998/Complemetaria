class Producto {
    constructor(data) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.cantidad = data.cantidad;
        this.precio = data.precio;
    }

    set id(id) {
        if (id) {
            this._id = id;
        }
    }

    set nombre(nombre) {
        const nombreRegex = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if (nombreRegex.test(nombre)) {
            this._nombre = nombre;
        } else {
            throw new Error(
                "Nombre inválido: Debe iniciar con una letra mayúscula, seguido de minúsculas, y puede contener espacios."
            );
        }
    }

    set cantidad(cantidad) {
        if (Number.isInteger(cantidad) && cantidad > 0) {
            this._cantidad = cantidad;
        } else {
            throw new Error("Cantidad inválida: Debe ser un número entero positivo.");
        }
    }

    set precio(precio) {
        if (typeof precio === "number" && precio > 0) {
            this._precio = precio;
        } else {
            throw new Error("Precio inválido: Debe ser un número positivo.");
        }
    }

    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }

    get cantidad() {
        return this._cantidad;
    }

    get precio() {
        return this._precio;
    }

    get datos() {
        return {
            ...(this.id !== undefined && { id: this.id }),
            nombre: this.nombre,
            cantidad: this.cantidad,
            precio: this.precio,
        };
    }
}

module.exports = Producto;

