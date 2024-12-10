// EditarVentaLink.js
"use client";

import Link from "next/link";

export default function EditarVentaLink({ id }) {
    return (
        <Link className="link"  href={`/ventas/modificar/${id}`}>
            Editar Venta
        </Link>
    );
}
