"use client"; // Esto indica que el componente debe renderizarse en el lado del cliente

export default function Cargando() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#000000" // Fondo oscuro para combinar con el resto de la app
        }}>
            <div style={{
                width: "50px",
                height: "50px",
                border: "5px solid #444", // Color gris oscuro para el borde del spinner
                borderTop: "5px solid #800080", // Morado para el borde superior
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                marginBottom: "20px"
            }}></div>
            <h1 style={{
                fontSize: "1.5em",
                color: "#800080", // Morado para el texto
                fontFamily: "Arial, Helvetica, sans-serif",
                fontWeight: "bold"
            }}>Cargando...</h1>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}