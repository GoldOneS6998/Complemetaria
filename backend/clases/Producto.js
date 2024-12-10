class Producto {
    // Constructor que inicializa los atributos del objeto Producto con los datos proporcionados
    constructor(data) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.cantidad = data.cantidad;
        this.precio = data.precio;
    }

    // Métodos 'set' para asignar valores a los atributos privados
    set id(id) {
        this._id = id; // Asigna el ID del producto
    }

    // Validación del nombre para cumplir con un formato específico
    set nombre(nombre) {
        const nombreRegex = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if (nombreRegex.test(nombre)) {
            this._nombre = nombre; // Asigna el nombre solo si cumple con el regex
        } else {
            // console.log('Nombre inválido: Debe iniciar con una letra mayúscula, seguido de letras minúsculas y puede contener espacios.');
        }
    }

    // Validación del nombre de producto (en este caso parece que usa las mismas reglas que 'nombre')
    set cantidad(cantidad) {
        const cantidadRegex = /^[0-9]+(\.[0-9]+)?$/;
        if (cantidadRegex.test(cantidad)) {
            this._cantidad = cantidad; // Asigna el nombre de producto solo si cumple con el regex
        cantidad
            // console.log('Producto inválido: Debe tener al menos 3 caracteres y contener solo letras, números o guiones bajos.');
        }
    }

    // Validación de la precio, asegurando que tenga al menos 6 caracteres
    set precio(precio) {
        // Expresión regular para validar que el precio sea un número (entero o decimal positivo)
        const precioRegex = /^[0-9]+(\.[0-9]+)?$/;
        if (precioRegex.test(precio) && precio.length >= 1) {
            this._precio = precio; // Asigna el precio solo si es válido y tiene 6 o más caracteres
        } else {
            // console.log('Precio inválido: Debe ser un número válido con al menos 6 caracteres.');
        }
    }
    

    // Métodos 'get' para acceder a los atributos privados
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

    // Método 'get' que devuelve un objeto con todos los datos del producto
    get datos() {
        // Si el producto tiene ID, incluye el ID en los datos retornados
        if (this.id != undefined) {
            return {
                id: this.id,
                nombre: this.nombre,
                cantidad: this.cantidad,
                precio: this.precio,
            };
        } else {
            // Si no tiene ID, devuelve los demás datos (para insertar un nuevo producto)
            return {
                nombre: this.nombre,
                cantidad: this.cantidad,
                precio: this.precio,
            };
        }
    }
}

// Exporta la clase Producto para poder ser utilizada en otros módulos
module.exports = Producto;

/* 
// Ejemplo de cómo crear una nueva instancia de Producto
data = {
    id: "fjkd",
    nombre: "Felipe Estrella",
    cantidad: 15,
    precio: "abc",
}

const producto1 = new Producto(data);
console.log(producto1); 
*/
