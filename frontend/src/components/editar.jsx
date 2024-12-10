"use client"

import Link from "next/link";

export default function EditarUsuario({ id }) {
    return (
        <Link className="link"  href={`/usuarios/modificar/${id}`}>
            Editar
        </Link>
    );
}
