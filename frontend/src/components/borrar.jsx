"use client"

import Link from "next/link";
import axios from "axios";

export default function BorrarUsuario({id}){
    async function borrar() {
        console.log("estas en borrar"+ id);
        const url = "http://localhost:3000/borrarUsuario/" + id;
        const respuesta = await axios.delete(url);
        window.location.replace("/usuarios/mostrar");
    }
    return(
        <Link className="link"  href="" onClick={borrar}>Borrar</Link>
    );
};


//<td className="table-data"><Link href="" onClick={borrarUsuario}>Borrar</Link></td>