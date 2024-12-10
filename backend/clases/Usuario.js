class Usuario {
    // Constructor que inicializa los atributos del objeto Usuario con los datos proporcionados
    constructor(data) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.usuario = data.usuario;
        this.password = data.password;
        this.salt = data.salt;
        this.tipoUsuario = data.tipoUsuario;
    }

    // Métodos 'set' para asignar valores a los atributos privados
    set id(id) {
        this._id = id; // Asigna el ID del usuario
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

    // Validación del nombre de usuario (en este caso parece que usa las mismas reglas que 'nombre')
    set usuario(usuario) {
        const usuarioRegex = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if (usuarioRegex.test(usuario)) {
            this._usuario = usuario; // Asigna el nombre de usuario solo si cumple con el regex
        } else {
            // console.log('Usuario inválido: Debe tener al menos 3 caracteres y contener solo letras, números o guiones bajos.');
        }
    }

    // Validación de la contraseña, asegurando que tenga al menos 6 caracteres
    set password(password = "") {
        if (password.length >= 6) {
            this._password = password; // Asigna la contraseña solo si tiene 6 o más caracteres
        } else {
            // console.log('Contraseña inválida: Debe tener al menos 6 caracteres.');
        }
    }

    // Asignación del salt para la contraseña
    set salt(salt) {
        this._salt = salt; // Asigna el valor del 'salt'
    }

    // Asignación del tipo de usuario
    set tipoUsuario(tipoUsuario) {
        this._tipoUsuario = tipoUsuario; // Asigna el tipo de usuario
    }

    // Métodos 'get' para acceder a los atributos privados
    get id() {
        return this._id;
    }
    get nombre() {
        return this._nombre;
    }
    get usuario() {
        return this._usuario;
    }
    get password() {
        return this._password;
    }
    get salt() {
        return this._salt;
    }
    get tipoUsuario() {
        return this._tipoUsuario;
    }

    // Método 'get' que devuelve un objeto con todos los datos del usuario
    get datos() {
        // Si el usuario tiene ID, incluye el ID en los datos retornados
        if (this.id != undefined) {
            return {
                id: this.id,
                nombre: this.nombre,
                usuario: this.usuario,
                password: this.password,
                salt: this.salt,
                tipoUsuario: this.tipoUsuario,
            };
        } else {
            // Si no tiene ID, devuelve los demás datos (para insertar un nuevo usuario)
            return {
                nombre: this.nombre,
                usuario: this.usuario,
                password: this.password,
                salt: this.salt,
                tipoUsuario: this.tipoUsuario,
            };
        }
    }
}

// Exporta la clase Usuario para poder ser utilizada en otros módulos
module.exports = Usuario;

/* 
// Ejemplo de cómo crear una nueva instancia de Usuario
data = {
    id: "fjkd",
    nombre: "Felipe Estrella",
    usuario: "felipe",
    password: "abc",
}

const usuario1 = new Usuario(data);
console.log(usuario1); 
*/
