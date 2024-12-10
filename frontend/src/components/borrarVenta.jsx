"use client"

import Link from "next/link";
import axios from "axios";

export default function BorrarVenta({id}){
    async function borrarVenta() {
        console.log("estas en borrar"+ id);
        const url = "http://localhost:3000/ventas/cancelarVenta/" + id;
        const respuesta = await axios.patch(url);
        window.location.replace("/ventas/mostrar");
    }
    return(
        <Link className="link"  href="" onClick={borrarVenta}>Cancelar Venta</Link>
    );
};


//<td className="table-data"><Link href="" onClick={borrarUsuario}>Borrar</Link></td>