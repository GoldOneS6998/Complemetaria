"use client"

import Link from "next/link";
import axios from "axios";

export default function BorrarProducto({id}){
    async function borrarProducto() {
        console.log("estas en borrar"+ id);
        const url = "http://localhost:3000/productos/borrarProducto/" + id;
        const respuesta = await axios.delete(url);
        window.location.replace("/productos/mostrar");
    }
    return(
        <Link className="link"  href="" onClick={borrarProducto}>Borrar Producto</Link>
    );
};


//<td className="table-data"><Link href="" onClick={borrarUsuario}>Borrar</Link></td>