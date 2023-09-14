import { generarCardsProductos, productosDisponibles } from "./estructura.js";


export const eliminarProducto = (id) => {

    const productoEliminar = productosDisponibles.findIndex(( producto ) => producto.id === id)
    productosDisponibles.splice(productoEliminar, 1)
    localStorage.setItem("productos", JSON.stringify(productosDisponibles))
    generarCardsProductos(JSON.parse(localStorage.getItem("productos")))  

}