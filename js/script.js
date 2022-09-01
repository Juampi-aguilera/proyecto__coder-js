// array servicios para proximamente pushear los servicios seleccionados
let servicios = [];

// carrito de compras
let textoCarrito=document.createElement("h3");
let contenedorCarrito=document.querySelector("#carrito");
let contenedorIconoCarrito=document.querySelector("#icono__carrito")

//funcionalidad para el carrito
let borrarCarrito=document.createElement("button");

//agregando datos del carrito al storage
carritoTotal=JSON.parse(localStorage.getItem("carritoTotal")) || 0;

//botones de agregar al carrito
const sesionX1 = document.querySelector("#agregar__sesionX1");
const sesionX4 = document.querySelector("#agregar__sesionX4");
const sesionX8 = document.querySelector("#agregar__sesionX8");

// creamos una clase servicio con todos las características del mismo
class Servicio{
    constructor(nombre,tipo,precio){
        this.nombre=nombre,
        this.tipo=tipo,
        this.precio=precio
    }
}

let servicio1=new Servicio("Sesión Individual","Sesion",2500);
let servicio2=new Servicio("Pack de Cuatro Sesiones","Sesion",8000);
let servicio3=new Servicio("Pack de Ocho Sesiones","Sesion",15200);

//pusheamos los servicios al array
servicios.push(servicio1,servicio2,servicio3);

// si hay algo en el carrito este se muestra
const actualizarCarrito=_=>{
    if(carritoTotal>0){
        textoCarrito.className="text-center m-5 border border-secondary";
        contenedorCarrito.append(textoCarrito);
        contenedorCarrito.append(borrarCarrito);
        textoCarrito.textContent=`El total a pagar es de $${carritoTotal}`;
        contenedorIconoCarrito.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                                          </svg>`;
        contenedorIconoCarrito.id="icono__carrito--id"
    }
}
actualizarCarrito();

// funcion flecha para agregar un producto al carrito
const agregarAlCarrito = (producto) => {
    let {precio:precioProducto}=producto; //Desestructuracion con alias
    carritoTotal+=precioProducto;
    actualizarCarrito();
    localStorage.setItem("carritoTotal",carritoTotal);
    // uso de toastify
    Toastify({
        text: "Producto añadido al carrito!",
        duration: 2000,
        gravity: "top",
        position: "right",
        style: {
          background: "#EFDFBF",
          margin:"60px",
          color:"#1A3C40",
          border: "2px solid #1A3C40",
          cursor:"default"
        },
      }).showToast();
}

// cuando se toca el boton se agrega al carrito
sesionX1.addEventListener("click",function(){
    agregarAlCarrito(servicio1);
}) 
sesionX4.addEventListener("click",function(){
    agregarAlCarrito(servicio2);
})
sesionX8.addEventListener("click",function(){
    agregarAlCarrito(servicio3);
})

//eliminar carrito
borrarCarrito.textContent="Eliminar carrito";
borrarCarrito.className="btn btn-outline-success mx-5";

borrarCarrito.addEventListener("click",function(){
    carritoTotal=0;
    localStorage.setItem("carritoTotal",carritoTotal);
    location.reload();
})
