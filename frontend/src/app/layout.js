import Link from "next/link";
import Script from "next/script";
//import "@/app/estilos.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Menu from "@/components/menu";

export const metadata={
    title:"Hola con Next",
    decription:"Sitios frontend con next",
}

export default function RootLayout({children}) {
    return(
        <html>
            <body>
                <Menu />
                {children}
                
                <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></Script>
                <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></Script>
            </body>
        </html>
    );
} 