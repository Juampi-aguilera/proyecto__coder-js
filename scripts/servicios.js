// array servicios para proximamente pushear los servicios seleccionados
let servicios = [];

// carrito de compras
let contenedorIconoCarrito=document.querySelector("#icono__carrito");
let contenedorCarrito=document.querySelector("#items");
let contenedorCarritoTotal=document.querySelector("#carrito__total");
let tablaFooter=document.querySelector("#tabla__footer");
let botonFinalizarCompra=document.querySelector("#boton__finalizar");

//agregando datos del carrito al storage
carritoTotal=JSON.parse(localStorage.getItem("carritoTotal")) || 0;
carrito=JSON.parse(localStorage.getItem("carrito")) || [];

// llamada al json local "servicios"
async function obtenerJSONServicios(){
    const URLJSON = "../scripts/servicios.json";
    const resp = await fetch (URLJSON);
    const data = await resp.json();
    servicios = data;
    funcionalidadAlAgregado()
}
obtenerJSONServicios();

//clase para los productos del carrito
class ProductosCarrito{
    constructor(producto,cantidad){
        this.producto = producto,
        this.cantidad = cantidad
    }
}

// cuando se toca el boton se agrega al carrito
function eventoAgregarCarrito(boton,servicio){
    boton.addEventListener("click",function(){
        agregarAlCarrito(servicio);
    });
}

//aplicando el evento agregar al carrito a los respectivos botones
function funcionalidadAlAgregado(){
    servicios.forEach(servicio =>{
        let botonServicio = document.querySelector(`#agregar__servicio-id${servicio.id}`);
        eventoAgregarCarrito(botonServicio,servicio);
    })    
}


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
    contenedorCarrito.innerHTML="";
    carritoTotal=0;

    // imprime cada producto del carrito en su respectiva linea
    carrito.forEach(elemento=>{
        let tablaCarrito=document.createElement("tr");
        let {producto:elementoAImprimir}=elemento; //Desestructuración con alias.
        tablaCarrito.innerHTML=`<td>${elementoAImprimir.nombre}</td>
                      <td>$${elementoAImprimir.precio}</td>       
                      <td><input type="number" id="cantidad__producto--id-${elementoAImprimir.id}" value="${elemento.cantidad}" min="1" style="width: 35px; height=32"></td> 
                      <td>$${elemento.cantidad*elementoAImprimir.precio}</td>
                      <td>
                        <button class="btn btn-danger" id="eliminar__producto--id-${elementoAImprimir.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>
                      </td>`;

        contenedorCarrito.append(tablaCarrito);
        
        //se suman los productos al carrito total
        carritoTotal+=elemento.cantidad*elementoAImprimir.precio;

        // si se le suma la cantidad cambia el precio total
        let inputCantidadProductos=document.getElementById(`cantidad__producto--id-${elementoAImprimir.id}`);
        inputCantidadProductos.addEventListener("change",function(ev){
            let nuevaCantidad=ev.target.value;
            elemento.cantidad=nuevaCantidad;
            actualizarCarrito()
        })

        //borrar un producto del carrito
        let eliminar__producto=document.querySelector(`#eliminar__producto--id-${elementoAImprimir.id}`);
        eliminar__producto.addEventListener("click",function(){
            removerProductoCarrito(elemento);
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
    localStorage.setItem("carritoTotal",carritoTotal);

    //busca si el producto a agregar no esta actualmente agregado
    let elementoExistente=carrito.find((elemento)=>elemento.producto.id==producto.id);

    // si esta agregado le suma 1 a la cantidad
    if(elementoExistente){
        elementoExistente.cantidad=parseInt(elementoExistente.cantidad) + 1;
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

boton__finalizar.addEventListener("click",function(){
    window.location.href = `https://api.whatsapp.com/send?phone=541139019897&text=Hola vero! Realice una compra via web con un total de $${carritoTotal}. Me gustaría proceder con el pago.`;
    localStorage.removeItem("carrito");
    localStorage.removeItem("carritoTotal");
})