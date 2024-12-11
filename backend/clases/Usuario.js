class Usuario {
    constructor(data) {
        this.id = data.id; // Puede ser undefined
        this.nombre = data.nombre;
        this.usuario = data.usuario;
        this.password = data.password;
        this.salt = data.salt;
        this.tipoUsuario = data.tipoUsuario;
    }

    // Validación básica para 'id' (opcional)
    set id(id) {
        if (id) {
            this._id = id;
        }
    }

    // Validación del nombre
    set nombre(nombre) {
        const nombreRegex = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ][a-záéíóúñ']{1,})*$/;
        if (nombreRegex.test(nombre)) {
            this._nombre = nombre;
        } else {
            throw new Error(
                "Nombre inválido: Debe iniciar con una letra mayúscula, seguido de minúsculas, y puede contener espacios."
            );
        }
    }

    // Validación del nombre de usuario
    set usuario(usuario) {
        const usuarioRegex = /^[a-zA-Z0-9_]{3,}$/; // Letras, números y guiones bajos; mínimo 3 caracteres
        if (usuarioRegex.test(usuario)) {
            this._usuario = usuario;
        } else {
            throw new Error(
                "Usuario inválido: Debe tener al menos 3 caracteres y contener solo letras, números o guiones bajos."
            );
        }
    }

    // Validación de la contraseña
    set password(password = "") {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/; // Al menos una minúscula, una mayúscula y un número
        if (passwordRegex.test(password)) {
            this._password = password;
        } else {
            throw new Error(
                "Contraseña inválida: Debe tener al menos 6 caracteres, incluyendo una mayúscula, una minúscula y un número."
            );
        }
    }

    // Asignación del salt para la contraseña
    set salt(salt) {
        this._salt = salt || ""; // Puede ser un valor vacío si no se usa
    }

    // Validación del tipo de usuario
    set tipoUsuario(tipoUsuario) {
        const tiposPermitidos = ["admin", "cliente", "vendedor"];
        if (tiposPermitidos.includes(tipoUsuario)) {
            this._tipoUsuario = tipoUsuario;
        } else {
            throw new Error(
                `Tipo de usuario inválido: Debe ser uno de los siguientes valores: ${tiposPermitidos.join(", ")}.`
            );
        }
    }

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

    // Método para obtener los datos del usuario
    get datos() {
        return {
            ...(this.id !== undefined && { id: this.id }),
            nombre: this.nombre,
            usuario: this.usuario,
            password: this.password,
            salt: this.salt,
            tipoUsuario: this.tipoUsuario,
        };
    }
}

module.exports = Usuario;

