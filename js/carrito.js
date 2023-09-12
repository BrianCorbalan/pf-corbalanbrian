import { productosDisponibles, productosDisponiblesBuzos } from "./estructura.js"

JSON.parse(sessionStorage.getItem("carrito")) === null && sessionStorage.setItem("carrito", JSON.stringify([]))


document.addEventListener("DOMContentLoaded", () => {
    dibujarCarrito()
})


let carrito = JSON.parse(sessionStorage.getItem("carrito"))
const listaCarrito = document.getElementById("items")
const footCarrito = document.getElementById("totales")
const cantidadCarrito = document.getElementById("cantidadCarrito");


export const comprarProducto = (idProducto) => {

    const producto = productosDisponibles.find((producto) => producto.id === idProducto)

    const { nombre, precio, imagen, id } = producto

    const productoCarrito = carrito.find((producto) => producto.id === idProducto)

    if(productoCarrito === undefined){
        const nuevoProductoCarrito = {
            id: id,
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        }

    carrito.push(nuevoProductoCarrito)
    sessionStorage.setItem("carrito", JSON.stringify(carrito) )
    }else{
        const indexProductoCarrito = carrito.findIndex((producto) => producto.id === idProducto)

        carrito[indexProductoCarrito].cantidad++
        carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad

        sessionStorage.setItem("carrito", JSON.stringify(carrito))
    }
    carrito = JSON.parse(sessionStorage.getItem("carrito"))

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Se agregó ${nombre} al carrito`,
        showConfirmButton: false,
        timer: 1500
      })
    carritoCounter()
}

export const comprarProductoBuzo = (idProducto) => {

    const producto = productosDisponiblesBuzos.find((producto) => producto.id === idProducto)

    const { nombre, precio, imagen, id } = producto

    const productoCarrito = carrito.find((producto) => producto.id === idProducto)

    if(productoCarrito === undefined){
        const nuevoProductoCarrito = {
            id: id,
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        }

    carrito.push(nuevoProductoCarrito)
    sessionStorage.setItem("carrito", JSON.stringify(carrito) )
    }else{
        const indexProductoCarrito = carrito.findIndex((producto) => producto.id === idProducto)

        carrito[indexProductoCarrito].cantidad++
        carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad

        sessionStorage.setItem("carrito", JSON.stringify(carrito))
    }
    carrito = JSON.parse(sessionStorage.getItem("carrito"))

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Se agregó ${nombre} al carrito`,
        showConfirmButton: false,
        timer: 1500
      })
    carritoCounter()

}

const dibujarCarrito = () => {

        listaCarrito.innerHTML = ''
    carrito.forEach(producto => {
        const { imagen, nombre, cantidad, precio, id, } = producto
        let body = document.createElement("tr")

        body.className = "productoCarrito"

        body.innerHTML = `
        <th><img id="fotoProductoCarrito" src="${imagen}" style="width:40%; height: 30%"></th>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio /cantidad}</td>
        <td>$${precio}</td>
        <td>
        <button id="-${id}" class="btn btn-dark" style="width: 40px">-</button>
        <button id="+${id}" class="btn btn-dark" style="width: 40px">+</button>
        </td>
        `

        listaCarrito.append(body)
        
        const btnRestar = document.getElementById(`-${id}`)
        const btnAgregar = document.getElementById(`+${id}`)

        btnRestar.addEventListener("click", () => restarCantidad(id))
        btnAgregar.addEventListener("click", () => aumentarCantidad(id))
        
    });
    carritoCounter()
    dibujarFooter()
}

const dibujarFooter = () => {

    if(carrito.length > 0){
        footCarrito.innerHTML = ""

        let footer = document.createElement("tr")

        footer.innerHTML = `
        <th><b>Total:</b></th>
        <td>Remeras</td>
        <td>${generarTotales().cantidadTotal}</td>
        <td>Precio</td>
        <td>$${generarTotales().costoTotal}</td>
        `

        footCarrito.append(footer)
    }else{
        footCarrito.innerHTML = "<h3>No hay producto en carrito</h3>"
    }

}


const generarTotales = () => {
    const costoTotal = carrito.reduce((total, { precio }) => total + precio, 0)
    const cantidadTotal = carrito.reduce((total, {cantidad}) => total + cantidad, 0)

    return {
        costoTotal: costoTotal,
        cantidadTotal: cantidadTotal
    }
}

const aumentarCantidad = (id) => {
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad

    carrito[indexProductoCarrito].cantidad++
    carrito[indexProductoCarrito].precio = precio*carrito[indexProductoCarrito].cantidad

    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    dibujarCarrito()

}

const restarCantidad = (id) => {
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad

    carrito[indexProductoCarrito].cantidad--
    carrito[indexProductoCarrito].precio = precio*carrito[indexProductoCarrito].cantidad

    if(carrito[indexProductoCarrito].cantidad === 0){
        carrito.splice(indexProductoCarrito, 1)
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    dibujarCarrito()
}

export const counterTotales = () => {
    return parseInt(carrito.reduce((total, { cantidad }) => total + cantidad, 0));
}

export const carritoCounter = () => {
    cantidadCarrito.style.display = "flex";
  
    const carritoLength = counterTotales();
  
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};