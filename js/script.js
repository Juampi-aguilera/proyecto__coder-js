// array servicios para proximamente pushear los servicios seleccionados
let servicios = [];

// carrito de compras
let textoCarrito=document.createElement("h3");
let contenedorCarrito=document.querySelector("#carrito");

//funcionalidad para el carrito
let borrarCarrito=document.createElement("button");

//agregando datos del carrito al storage
carrito=JSON.parse(localStorage.getItem("carrito"));

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
    if(carrito>0){
        textoCarrito.className="text-center m-5 border border-secondary";
        contenedorCarrito.append(textoCarrito);
        contenedorCarrito.append(borrarCarrito);
        textoCarrito.textContent=`El total a pagar es de $${carrito}`;
    }
}
actualizarCarrito();

// funcion flecha para agregar un producto al carrito
const agregarAlCarrito = (producto) => {
    carrito+=producto.precio;
    actualizarCarrito();
    localStorage.setItem("carrito",carrito);
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
    carrito=0;
    localStorage.setItem("carrito",carrito);
})
