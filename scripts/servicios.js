// array servicios para proximamente pushear los servicios seleccionados
let servicios = [];

// carrito de compras
let contenedorIconoCarrito=document.querySelector("#icono__carrito");
let contenedorCarrito2=document.querySelector("#items");
let contenedorCarritoTotal=document.querySelector("#carrito__total");
let tablaFooter=document.querySelector("#tabla__footer");

//funcionalidad para el carrito
let borrarCarrito=document.createElement("button"); //sacar

//agregando datos del carrito al storage
carritoTotal=JSON.parse(localStorage.getItem("carritoTotal")) || 0;
carrito=JSON.parse(localStorage.getItem("carrito")) || [];

class ProductosCarrito{
    constructor(producto,cantidad){
        this.producto=producto,
        this.cantidad=cantidad
    }
}

//botones de agregar al carrito
const sesionX1 = document.querySelector("#agregar__sesionX1");
const sesionX4 = document.querySelector("#agregar__sesionX4");
const sesionX8 = document.querySelector("#agregar__sesionX8");

// creamos una clase servicio con todos las características del mismo
class Servicio{
    constructor(id,nombre,tipo,precio){
        this.id=id,
        this.nombre=nombre,
        this.tipo=tipo,
        this.precio=precio
    }
}

let servicio1=new Servicio(1,"Sesión Individual","Sesion",2500);
let servicio2=new Servicio(2,"Pack de Cuatro Sesiones","Sesion",8000);
let servicio3=new Servicio(3,"Pack de Ocho Sesiones","Sesion",15200);

//pusheamos los servicios al array
servicios.push(servicio1,servicio2,servicio3);

// si hay algo en el carrito este se muestra
const mostrarCarrito=_=>{
    if(carritoTotal>0){
        contenedorIconoCarrito.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                                          </svg>`;
        contenedorIconoCarrito.id="icono__carrito--id";
    }
}
mostrarCarrito();

// se agrega el carrito al DOM
function actualizarCarrito(){
    contenedorCarrito2.innerHTML="";

    carritoTotal=0;
    // imprime cada producto del carrito en su respectiva linea
    carrito.forEach(producto=>{
        let tablaCarrito=document.createElement("tr");
        tablaCarrito.innerHTML=`<td>${producto.producto.nombre}</td>
                      <td>$${producto.producto.precio}</td>       
                      <td><input type="number" id="cantidad__producto--id-${producto.producto.id}" value="${producto.cantidad}" min="1" style="width: 35px; height=32"></td> 
                      <td>$${producto.cantidad*producto.producto.precio}</td>
                      <td>
                        <button class="btn btn-danger" id="eliminar__producto--id-${producto.producto.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>
                      </td>`;

        contenedorCarrito2.append(tablaCarrito);
        
        //se suman los productos al carrito total
        carritoTotal+=producto.cantidad*producto.producto.precio;

        // si se le suma la cantidad cambia el precio total
        let inputCantidadProductos=document.getElementById(`cantidad__producto--id-${producto.producto.id}`);
        inputCantidadProductos.addEventListener("change",function(ev){
            let nuevaCantidad=ev.target.value;
            producto.cantidad=nuevaCantidad;
            actualizarCarrito()
        })

        //borrar un producto del carrito
        let eliminar__producto=document.querySelector(`#eliminar__producto--id-${producto.producto.id}`);
        eliminar__producto.addEventListener("click",function(){
            removerProductoCarrito(producto);
        })

    });

    // muestra el total del carrito en el footer del modal
    contenedorCarritoTotal.innerHTML=`Total: $${carritoTotal}`
    tablaFooter.appendChild(contenedorCarritoTotal);

    //agregar el carrito al storage
    localStorage.setItem("carrito",JSON.stringify(carrito));

    //se guarda el carrito total en el storage
    localStorage.setItem("carritoTotal",carritoTotal);

}
actualizarCarrito()

// funcion para remover un producto del carrito
function removerProductoCarrito(productoAEliminar){
    // array nuevo con los productos in el eliminado
    let elementosAMantener = carrito.filter((elemento)=>
        elemento.producto.id != productoAEliminar.producto.id
    );
    //borro el carrito original
    carrito.length=0;

    //envio los elementos del array nuevo al carrito original
    elementosAMantener.forEach((elemento)=>{carrito.push(elemento)});
    actualizarCarrito();

    // Cuando se borran todos los elementos del carrito la pagina se recarga y este desaparece
    carritoTotal==0 && location.reload();
}

// función flecha para agregar un producto al carrito
const agregarAlCarrito = (producto) => {
    let {precio:precioProducto}=producto; //Desestructuracion con alias. sacar? o poner en otro lado
    
    localStorage.setItem("carritoTotal",carritoTotal);
    
    //busca si el producto a agregar no esta actualmente agregado
    let elementoExistente=carrito.find((elemento)=>elemento.producto.id==producto.id);

    // si esta agregado le suma 1 a la cantidad
    if(elementoExistente){
        elementoExistente.cantidad+=1;
    }else{
        //agrega el producto al array carrito
        carrito.push(new ProductosCarrito(producto,1));
    }
    actualizarCarrito();
    mostrarCarrito();

    localStorage.setItem("carrito",JSON.stringify(carrito));

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
function eventoAgregarCarrito(boton,servicio){
    boton.addEventListener("click",function(){
        agregarAlCarrito(servicio);
    });
}

//ejecucion de la funcion para el evento de agregar al carrito
eventoAgregarCarrito(sesionX1,servicio1)
eventoAgregarCarrito(sesionX4,servicio2)
eventoAgregarCarrito(sesionX8,servicio3)