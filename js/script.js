
// array servicios para proximamente pushear los servicios seleccionados
let servicios = [];

// carrito de compras
let carrito=0;
let textoCarrito=document.createElement("h3");
let contenedorCarrito=document.querySelector("#carrito");

//botones de agregar al carrito
const sesionX1 = document.querySelector("#sesionX1");
const sesionX4 = document.querySelector("#sesionX4");
const sesionX8 = document.querySelector("#sesionX8");

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

//eleccion de productos por parte del usuario
const sumarAlCarrito = (acumulador,producto) => acumulador+=producto;

// cuando se toca el boton se agrega al carrito

sesionX1.addEventListener("click",function(){
    carrito+=servicio1.precio;
    textoCarrito.textContent=`El total a pagar es de $${carrito}`
})
sesionX4.addEventListener("click",function(){
    carrito+=servicio2.precio;
    textoCarrito.textContent=`El total a pagar es de $${carrito}`
})
sesionX8.addEventListener("click",function(){
    carrito+=servicio3.precio;
    textoCarrito.textContent=`El total a pagar es de $${carrito}`
})

textoCarrito.className="text-center m-5 border border-secondary"
contenedorCarrito.append(textoCarrito)