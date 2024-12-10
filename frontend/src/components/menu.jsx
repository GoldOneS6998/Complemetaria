"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Menu() {
    const router = useRouter();
    const pathname = usePathname();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("");

    // Actualizar searchType cada vez que la ruta cambia
    useEffect(() => {
        const path = pathname.split("/")[1]; // Obtener la primera parte de la ruta (usuarios, productos, ventas)
        if (["usuarios", "productos", "ventas"].includes(path)) {
            setSearchType(path);
        } else {
            setSearchType(""); // Limpiar si no es una ruta válida
        }
    }, [pathname]); // Escuchar cambios en la ruta

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm && searchType) {
            router.push(`/${searchType}/mostrar?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    const clearFilter = () => {
        setSearchTerm(""); // Limpiar el término de búsqueda
        if (searchType) {
            router.push(`/${searchType}/mostrar`); // Redirigir a la página sin el filtro
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">Navbar</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" href="/usuarios/mostrar">Usuarios</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="/productos/mostrar">Productos</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="/ventas/mostrar">Ventas</Link>
                        </li>

                    </ul>
                    <form className="d-flex" role="search" onSubmit={handleSearch}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder={`Buscar en ${searchType || "..."}`}
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-outline-success me-2" type="submit" disabled={!searchType}>
                            Buscar
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={clearFilter}
                            disabled={!searchType}
                        >
                            Limpiar Filtro
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}
