"use client";

import Link from "next/link";

export default function EditarProducto({ id }) {
    return (
        <Link className="link"  href={`/productos/modificar/${id}`}>
            Editar
        </Link>
    );
}
