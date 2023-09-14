import { comprarProducto, comprarProductoBuzo, carritoCounter,} from "./carrito.js"


const divProductos = document.getElementById("productos")
const divProductosBuzos = document.getElementById("productosBuzos")

let usuarioLogeado = JSON.parse(sessionStorage.getItem("usuario"))
export let productosDisponibles = JSON.parse(localStorage.getItem("productos"))
export let productosDisponiblesBuzos = [];

fetch("../db/data-buzo.json")
  .then((response) => response.json())
  .then((data) => {
    productosDisponiblesBuzos = data;

    data.forEach((producto) => {
      const { imagen, nombre, categoria, precio, id, link, alt } = producto;

      let cardBuzos = document.createElement("div");
      cardBuzos.className = "ofertas animacionCaja";
      cardBuzos.innerHTML = `
        <a href="${link}">
          <img src="${imagen}" alt="${alt}">
        </a>
        <p class="card-title">${nombre}</p>
        <p class="card-text">Categoria: ${categoria}</p>
        <p class="card-text">Precio: <b>$${precio}</b></p>
        <button id="btn${id}" class="btn btn-danger">Agregar al carrito</button>
      `;

      divProductosBuzos.appendChild(cardBuzos);

      const btnComprar = document.getElementById(`btn${id}`);
      btnComprar.addEventListener("click", () => comprarProductoBuzo(id));
    });
  })
  .catch((error) => {
    console.error("Error al obtener los datos:", error);
  });
    
export const generarCardsProductos = (productos) => {
  divProductos.innerHTML = "";
  
  productos.forEach((producto) => {
    
    const { imagen, nombre, categoria, precio, id, link, alt} = producto
    
    let card = document.createElement("div");
    card.className = "ofertas animacionCaja";
    card.innerHTML = `
    <a href="${link}">
    <img src="${imagen}" alt="${alt}">
    </a>
    <p class="card-title">${nombre}</p>
    <p class="card-text">Categoria: ${categoria}</p>
    
    <p class="card-text">Precio: <b>$${precio}</b></p>
    <button id="btn${id}" class="btn btn-danger">Agregar al carrito</button>    

    ${
      usuarioLogeado?.admin === true ? `<button id="eliminar${id}" class="btn btn-danger">Eliminar</button>`  : ""
      
    }
    </div>
    </div>`;

    divProductos.appendChild(card);

    const btnComprar = document.getElementById(`btn${id}`)
    btnComprar.addEventListener("click", () => comprarProducto(id))

    if(usuarioLogeado?.admin === true){
      const btnEliminar = document.getElementById(`eliminar${id}`)
      btnEliminar.addEventListener("click", () => eliminarProducto(id))
    }
  });
};
    
    
carritoCounter();

document.addEventListener("DOMContentLoaded", () => {   
  const dropdownDiv = document.createElement("div");
  dropdownDiv.className = "dropdown";
  const container = document.getElementById("userLogin");

  if (usuarioLogeado !== null) {
    const spanElement = document.createElement("span");
    spanElement.textContent = usuarioLogeado.user;
    dropdownDiv.appendChild(spanElement);

    const dropdownContentDiv = document.createElement("div");
    dropdownContentDiv.className = "dropdown-content";

    const pElement = document.createElement("button");
    pElement.textContent = "Cerrar Sesión";
    pElement.id = "cerrar__sesion";
    pElement.addEventListener("click", () => {
      Swal.fire({
        text: `Gracias por comprar en nuestra tienda ${usuarioLogeado.user}. Te esperamos pronto`,
        confirmButtonColor: '#bb0000',
      });
      sessionStorage.removeItem("usuario");
      setTimeout(() => {
        location.reload();
      }, 3000);
      
    });
    dropdownContentDiv.appendChild(pElement);
    dropdownDiv.appendChild(dropdownContentDiv);
  } else {
    const a = document.createElement("a");
    a.href = "../pages/usuarios.html";
    a.textContent = "Login";
    dropdownDiv.appendChild(a);
  }

  container.appendChild(dropdownDiv);
  generarCardsProductos(productosDisponibles);
});




