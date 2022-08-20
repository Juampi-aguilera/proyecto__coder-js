// array servicios para proximamente pushear los servicios seleccionados
let servicios = [];

// carrito de compras
let carrito=0;
let textoCarrito=document.createElement("h3");
let contenedorCarrito=document.querySelector("#carrito");

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

// funcion flecha para agregar un producto al carrito
const agregarAlCarrito = (producto) => {
    carrito+=producto.precio;// hacer funcion de esto
    textoCarrito.textContent=`El total a pagar es de $${carrito}`;
    if(carrito>0){
        textoCarrito.className="text-center m-5 border border-secondary";
        contenedorCarrito.append(textoCarrito);
    }
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

//fsdfvsd