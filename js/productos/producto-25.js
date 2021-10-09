const prod_25 = document.getElementById('prod25')

const item_25 = document.getElementById('item-25')
const footer25 = document.getElementById('footer-25')
const template_carrito25 = document.getElementById('template-carrito-25').content
const template_footer25 = document.getElementById('template-footer-25').content

const fragment = document.createDocumentFragment()

let carrito_25 = {}



prod_25.addEventListener('click', e => {
    addcarrito(e)
})


item_25.addEventListener('click', e => {
    btnAccion(e)
})

document.addEventListener('DOMContentLoaded', () => {

    if(localStorage.getItem('carrito_25')) {
       carrito_25 = JSON.parse(localStorage.getItem('carrito_25'))
       pintarcarrito()
    }
})




const addcarrito = e => {

    //    console.log(e.target)
    //    console.log(e.target.classList.contains('btn-agregar'))
        if(e.target.classList.contains('btn-agregar')) {
    
           setcarrito(e.target.parentElement)
        }
    
        if(e.target.classList.contains('btn-agregar')) {
            
        swal(' ', 'Este producto se ha añadido al carrito', 'success');
        }
    
        e.stopPropagation()
    }


    
// Esta es la funcion que manipula el carrito_25. Recibe un objeto.
// Ese objeto es todo lo que se tiene seleccionado. Al hacer click en el boton para agregrar, se seleccionan todos los elementos (toda la tarjeta) y son empujados.
// Luego Se va a empujar el contenido de setcarrito_25 al objeto vacio let carrito_25 = {}
// La constante producto es una coleccion de objetos de la coleccion de objetos let carrito_25 = {}.

const setcarrito = objeto => {

    const producto = {
      id: objeto.querySelector('.btn-agregar').dataset.id,
      titulo: objeto.querySelector('h5').textContent,
      precio: objeto.querySelector('.precio').textContent,
      cantidad: 1
    }

 
    // Para acceder a los objetos (en este caso carrito_25) se le preguntaban si tenian determinada propiedad hasOwnProperty(key)
   // Si en el ya existe un producto.id quiere decir que el producto se esta duplicando, por lo tanto hay que aumentar la cantidad.
   // La cantidad entonces va a ser igual a.. (se accede a esa info a traves de ..) carrito_25.[el elemento que se duplica], una vez que se accede, se accede solo a la cantidad y se le aumenta 25
   
   if(carrito_25.hasOwnProperty(producto.titulo)) {
       producto.cantidad = carrito_25[producto.titulo].cantidad + 1
   }

    // Una vez que se tiene el objeto producto se tiene que empujar al carrito_25. carrito_25 en su propiedad producto.id va a ser igual a una copia. Con los ... se accede a la info de producto (id, titulo, precio, cantidad) y se hace una copia de esa info
   // Se crea el index con el producto.id (el id serviria para identificar cada producto)
   carrito_25[producto.titulo] = {...producto}
   // Cada ver que se agregue un producto se EJECUTAR pintarcarrito_25 (va a aparecer esa info en el DOM)
   pintarcarrito()
}

// Ahora se deben pintar los elementos seleccionados dentro del carrito_25 (similar a pintar la data de las cards)
// Para acceder a los objetos de carrito_25 se hace a traves de Object.values y recien ahi se puede hacer un recorrido por cada uno con el forEach (Object.values se utiliza porque carrito_25 es una coleccion de objetos y en este caso no se pueden utilizar las musmas funcionalidades que en los arrays)
// producto.id hace referencia el id de const producto, el producto que se empuja cuando algo se agrega al carrito_25

const pintarcarrito = () => {
   
   item_25.innerHTML = ''
   Object.values(carrito_25).forEach( producto => {
       template_carrito25.querySelector('th').textContent = producto.id
       template_carrito25.querySelectorAll('td')[0].textContent = producto.titulo
       template_carrito25.querySelectorAll('td')[1].textContent = producto.cantidad
       template_carrito25.querySelector('.btn-sumar').dataset.id = producto.id
       template_carrito25.querySelector('.btn-restar').dataset.id = producto.id
       template_carrito25.querySelector('span').textContent = producto.cantidad * producto.precio


       const clone = template_carrito25.cloneNode(true)
       fragment.appendChild(clone)
   })

 // la info clonada debe pintarse en los items
   item_25.appendChild(fragment)

     //Cada vez que se pinta el carrito_25 tambinen se tiene que pintar el footer25
  pintarfooter()

     //Aca voy a guardar la info que venga del carrito_25 en el LocalStorage. Se usa setItem porque se esta ALMACENANDO, guardando.
    // Se guarda con la key 'carrito_25'. 
    // La colecion de objetos carrito_25 estan guardados como un string plano de texto (el JSON hace esto) y luego aca se va a querer que vuelva a ser una coleccion de objetos (con el JSON.parse)
    localStorage.setItem('carrito_25', JSON.stringify(carrito_25))
  
}


// Ahora se pinta el footer25. El cual cambia si hay productos agregados en carrito_25.
// eL tamplatefooter25 se va a pintar en el footer25, en el tfoot de la tabla de los items

const pintarfooter = () => {
   footer25.innerHTML = ''

   // Se pregunta si el carrito_25 contiene elementos preguntando si la longitud del objeto es igual a 0. Si lo es, si no tiene elementos y esta vacio, se pinta la info de carrito_25 vacio a traves de un templateString ``
   // Con el return hace que si el if es verdadero, devuelva ese templatestrig y luego SALGA de la funcion y no sigue leyengo lo de abajo
   if(Object.keys(carrito_25).length === 0) {
       footer25.innerHTML = `
       <th scope="row" colspan="8">Tu carrito esta vacío!</th>
       `
       return
   }

   // Si hay productos en el carrito_25, se debe hacer unas operaciones. Sumar la cantidad de productos totales (nCantidad) y mostrar el precio final (nPrecio)
   // Se crean  constantes que sea la suma de todas las cantidades y la suma de las cantidades por el precio (precio final).               Se va a utilizar el reduce que va a tomar una funcion con parametros, que itere en las cantidades de cada producto y en cada iteracion va a ir acumulando esas {cantidades} en una cantidad total en el footer25 (nCantidad). Lo que va a devolver es un numero por eso el 0

   const nCantidad = Object.values(carrito_25).reduce((acc, {cantidad}) => acc + cantidad,0)
   const nPrecio = Object.values(carrito_25).reduce((acc , {cantidad, precio}) => acc + cantidad * precio,0)

   // Esto ahora se tiene que pintar en el templatefooter25                                                                                   Lo primero que se va a modifucar es el primer <td> que es igual al total de productos (nCantidad) y luego el segundo <td> igual al precio total (nPrecio)

   template_footer25.querySelectorAll('td')[0].textContent = nCantidad
   template_footer25.querySelector('span').textContent = nPrecio
  

   const clone = template_footer25.cloneNode(true)
   fragment.appendChild(clone)
   footer25.appendChild(fragment)

   // Ahora se va a detectar el boton de vaciar el carrito_25 y se le indica que ante el evento click, let carrio = {} vuelva a ser un objeto VACIO. 

   const btnVaciar = document.getElementById('vaciar-carrito')
   btnVaciar.addEventListener('click', () => {
       carrito_25 = {}
       pintarcarrito()
   })
}

// Ahora se van a detectar los botones de agregar o sacar.
   // Para aumentar o sacar primero de debe acceder a la coleccion de objetos (productos) y capturar el id de ese producto
   const btnAccion = e => {

   }