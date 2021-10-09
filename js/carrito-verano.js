const producto_1 = document.getElementById('producto1')
const producto_2 = document.getElementById('producto2')
const producto_3 = document.getElementById('producto3')
const producto_4 = document.getElementById('producto4')
const producto_5 = document.getElementById('producto5')
const producto_6 = document.getElementById('producto6')
const producto_7 = document.getElementById('producto7')
const producto_8 = document.getElementById('producto8')


const items_verano = document.getElementById('items-verano')
const footer_verano = document.getElementById('footer-verano')
const template_carrito_verano = document.getElementById('template-carrito-verano').content
const template_footer_verano = document.getElementById('template-footer-verano').content

const fragment = document.createDocumentFragment()

let carrito_verano = {}



producto_1.addEventListener('click', e => {
    addCarrito(e)
})

producto_2.addEventListener('click', e => {
    addCarrito(e)
})

producto_3.addEventListener('click', e => {
    addCarrito(e)
})

producto_4.addEventListener('click', e => {
    addCarrito(e)
})

producto_5.addEventListener('click', e => {
    addCarrito(e)
})

producto_6.addEventListener('click', e => {
    addCarrito(e)
})

producto_7.addEventListener('click', e => {
    addCarrito(e)
})

producto_8.addEventListener('click', e => {
    addCarrito(e)
})





items_verano.addEventListener('click', e => {
    btnAccion(e)
})

document.addEventListener('DOMContentLoaded', () => {

    if(localStorage.getItem('carrito_verano')) {
       carrito_verano = JSON.parse(localStorage.getItem('carrito_verano'))
       pintarCarrito()
    }
})




const addCarrito = e => {

    //    console.log(e.target)
    //    console.log(e.target.classList.contains('btn-agregar'))
        if(e.target.classList.contains('btn-agregar')) {
    
           setCarrito(e.target.parentElement)
        }
    
        if(e.target.classList.contains('btn-agregar')) {
            
        swal(' ', 'Este producto se ha añadido al carrito', 'success');
        }
    
        e.stopPropagation()
    }


    
// Esta es la funcion que manipula el carrito. Recibe un objeto.
// Ese objeto es todo lo que se tiene seleccionado. Al hacer click en el boton para agregrar, se seleccionan todos los elementos (toda la tarjeta) y son empujados.
// Luego Se va a empujar el contenido de setCarrito al objeto vacio let carrito = {}
// La constante producto es una coleccion de objetos de la coleccion de objetos let carrito = {}.

const setCarrito = objeto => {

    const producto = {
      id: objeto.querySelector('.btn-agregar').dataset.id,
      titulo: objeto.querySelector('h5').textContent,
      precio: objeto.querySelector('.precio').textContent,
      cantidad: 1
    }

 
    // Para acceder a los objetos (en este caso carrito) se le preguntaban si tenian determinada propiedad hasOwnProperty(key)
   // Si en el ya existe un producto.id quiere decir que el producto se esta duplicando, por lo tanto hay que aumentar la cantidad.
   // La cantidad entonces va a ser igual a.. (se accede a esa info a traves de ..) carrito.[el elemento que se duplica], una vez que se accede, se accede solo a la cantidad y se le aumenta 1
   
   if(carrito_verano.hasOwnProperty(producto.titulo)) {
       producto.cantidad = carrito_verano[producto.titulo].cantidad + 1
   }

    // Una vez que se tiene el objeto producto se tiene que empujar al carrito. Carrito en su propiedad producto.id va a ser igual a una copia. Con los ... se accede a la info de producto (id, titulo, precio, cantidad) y se hace una copia de esa info
   // Se crea el index con el producto.id (el id serviria para identificar cada producto)
   carrito_verano[producto.titulo] = {...producto}
   // Cada ver que se agregue un producto se EJECUTAR pintarCarrito (va a aparecer esa info en el DOM)
   pintarCarrito()
}

// Ahora se deben pintar los elementos seleccionados dentro del carrito (similar a pintar la data de las cards)
// Para acceder a los objetos de carrito se hace a traves de Object.values y recien ahi se puede hacer un recorrido por cada uno con el forEach (Object.values se utiliza porque carrito es una coleccion de objetos y en este caso no se pueden utilizar las musmas funcionalidades que en los arrays)
// producto.id hace referencia el id de const producto, el producto que se empuja cuando algo se agrega al carrito

const pintarCarrito = () => {
   
   items_verano.innerHTML = ''
   Object.values(carrito_verano).forEach( producto => {
       template_carrito_verano.querySelector('th').textContent = producto.id
       template_carrito_verano.querySelectorAll('td')[0].textContent = producto.titulo
       template_carrito_verano.querySelectorAll('td')[1].textContent = producto.cantidad
       template_carrito_verano.querySelector('.btn-sumar').dataset.id = producto.id
       template_carrito_verano.querySelector('.btn-restar').dataset.id = producto.id
       template_carrito_verano.querySelector('span').textContent = producto.cantidad * producto.precio


       const clone = template_carrito_verano.cloneNode(true)
       fragment.appendChild(clone)
   })

 // la info clonada debe pintarse en los items
   items_verano.appendChild(fragment)

     //Cada vez que se pinta el carrito tambinen se tiene que pintar el footer
  pintarFooter()

     //Aca voy a guardar la info que venga del carrito en el LocalStorage. Se usa setItem porque se esta ALMACENANDO, guardando.
    // Se guarda con la key 'carrito'. 
    // La colecion de objetos carrito estan guardados como un string plano de texto (el JSON hace esto) y luego aca se va a querer que vuelva a ser una coleccion de objetos (con el JSON.parse)
    localStorage.setItem('carrito_verano', JSON.stringify(carrito_verano))
  
}


// Ahora se pinta el footer. El cual cambia si hay productos agregados en carrito.
// eL tamplateFooter se va a pintar en el footer, en el tfoot de la tabla de los items

const pintarFooter = () => {
   footer_verano.innerHTML = ''

   // Se pregunta si el carrito contiene elementos preguntando si la longitud del objeto es igual a 0. Si lo es, si no tiene elementos y esta vacio, se pinta la info de carrito vacio a traves de un templateString ``
   // Con el return hace que si el if es verdadero, devuelva ese templatestrig y luego SALGA de la funcion y no sigue leyengo lo de abajo
   if(Object.keys(carrito_verano).length === 0) {
       footer_verano.innerHTML = `
       <th scope="row" colspan="5">Tu carrito esta vacío!</th>
       `
       return
   }

   // Si hay productos en el carrito, se debe hacer unas operaciones. Sumar la cantidad de productos totales (nCantidad) y mostrar el precio final (nPrecio)
   // Se crean  constantes que sea la suma de todas las cantidades y la suma de las cantidades por el precio (precio final).               Se va a utilizar el reduce que va a tomar una funcion con parametros, que itere en las cantidades de cada producto y en cada iteracion va a ir acumulando esas {cantidades} en una cantidad total en el footer (nCantidad). Lo que va a devolver es un numero por eso el 0

   const nCantidad = Object.values(carrito_verano).reduce((acc, {cantidad}) => acc + cantidad,0)
   const nPrecio = Object.values(carrito_verano).reduce((acc , {cantidad, precio}) => acc + cantidad * precio,0)

   // Esto ahora se tiene que pintar en el templateFooter                                                                                   Lo primero que se va a modifucar es el primer <td> que es igual al total de productos (nCantidad) y luego el segundo <td> igual al precio total (nPrecio)

   template_footer_verano.querySelectorAll('td')[0].textContent = nCantidad
   template_footer_verano.querySelector('span').textContent = nPrecio
  

   const clone = template_footer_verano.cloneNode(true)
   fragment.appendChild(clone)
   footer_verano.appendChild(fragment)

   // Ahora se va a detectar el boton de vaciar el carrito y se le indica que ante el evento click, let carrio = {} vuelva a ser un objeto VACIO. 

   const btnVaciar = document.getElementById('vaciar-carrito')
   btnVaciar.addEventListener('click', () => {
       carrito_verano = {}
       pintarCarrito()
   })
}

// Ahora se van a detectar los botones de agregar o sacar.
   // Para aumentar o sacar primero de debe acceder a la coleccion de objetos (productos) y capturar el id de ese producto
   const btnAccion = e => {

   }