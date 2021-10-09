const prod_12 = document.getElementById('prod12')

const item_12 = document.getElementById('item-12')
const footer12 = document.getElementById('footer-12')
const template_carrito12 = document.getElementById('template-carrito-12').content
const template_footer12 = document.getElementById('template-footer-12').content

const fragment = document.createDocumentFragment()

let carrito_12 = {}



prod_12.addEventListener('click', e => {
    addcarrito(e)
})


item_12.addEventListener('click', e => {
    btnAccion(e)
})

document.addEventListener('DOMContentLoaded', () => {

    if(localStorage.getItem('carrito_12')) {
       carrito_12 = JSON.parse(localStorage.getItem('carrito_12'))
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


    
// Esta es la funcion que manipula el carrito_12. Recibe un objeto.
// Ese objeto es todo lo que se tiene seleccionado. Al hacer click en el boton para agregrar, se seleccionan todos los elementos (toda la tarjeta) y son empujados.
// Luego Se va a empujar el contenido de setcarrito_12 al objeto vacio let carrito_12 = {}
// La constante producto es una coleccion de objetos de la coleccion de objetos let carrito_12 = {}.

const setcarrito = objeto => {

    const producto = {
      id: objeto.querySelector('.btn-agregar').dataset.id,
      titulo: objeto.querySelector('h5').textContent,
      precio: objeto.querySelector('.precio').textContent,
      cantidad: 1
    }

 
    // Para acceder a los objetos (en este caso carrito_12) se le preguntaban si tenian determinada propiedad hasOwnProperty(key)
   // Si en el ya existe un producto.id quiere decir que el producto se esta duplicando, por lo tanto hay que aumentar la cantidad.
   // La cantidad entonces va a ser igual a.. (se accede a esa info a traves de ..) carrito_12.[el elemento que se duplica], una vez que se accede, se accede solo a la cantidad y se le aumenta 12
   
   if(carrito_12.hasOwnProperty(producto.titulo)) {
       producto.cantidad = carrito_12[producto.titulo].cantidad + 1
   }

    // Una vez que se tiene el objeto producto se tiene que empujar al carrito_12. carrito_12 en su propiedad producto.id va a ser igual a una copia. Con los ... se accede a la info de producto (id, titulo, precio, cantidad) y se hace una copia de esa info
   // Se crea el index con el producto.id (el id serviria para identificar cada producto)
   carrito_12[producto.titulo] = {...producto}
   // Cada ver que se agregue un producto se EJECUTAR pintarcarrito_12 (va a aparecer esa info en el DOM)
   pintarcarrito()
}

// Ahora se deben pintar los elementos seleccionados dentro del carrito_12 (similar a pintar la data de las cards)
// Para acceder a los objetos de carrito_12 se hace a traves de Object.values y recien ahi se puede hacer un recorrido por cada uno con el forEach (Object.values se utiliza porque carrito_12 es una coleccion de objetos y en este caso no se pueden utilizar las musmas funcionalidades que en los arrays)
// producto.id hace referencia el id de const producto, el producto que se empuja cuando algo se agrega al carrito_12

const pintarcarrito = () => {
   
   item_12.innerHTML = ''
   Object.values(carrito_12).forEach( producto => {
       template_carrito12.querySelector('th').textContent = producto.id
       template_carrito12.querySelectorAll('td')[0].textContent = producto.titulo
       template_carrito12.querySelectorAll('td')[1].textContent = producto.cantidad
       template_carrito12.querySelector('.btn-sumar').dataset.id = producto.id
       template_carrito12.querySelector('.btn-restar').dataset.id = producto.id
       template_carrito12.querySelector('span').textContent = producto.cantidad * producto.precio


       const clone = template_carrito12.cloneNode(true)
       fragment.appendChild(clone)
   })

 // la info clonada debe pintarse en los items
   item_12.appendChild(fragment)

     //Cada vez que se pinta el carrito_12 tambinen se tiene que pintar el footer12
  pintarfooter()

     //Aca voy a guardar la info que venga del carrito_12 en el LocalStorage. Se usa setItem porque se esta ALMACENANDO, guardando.
    // Se guarda con la key 'carrito_12'. 
    // La colecion de objetos carrito_12 estan guardados como un string plano de texto (el JSON hace esto) y luego aca se va a querer que vuelva a ser una coleccion de objetos (con el JSON.parse)
    localStorage.setItem('carrito_12', JSON.stringify(carrito_12))
  
}


// Ahora se pinta el footer12. El cual cambia si hay productos agregados en carrito_12.
// eL tamplatefooter12 se va a pintar en el footer12, en el tfoot de la tabla de los items

const pintarfooter = () => {
   footer12.innerHTML = ''

   // Se pregunta si el carrito_12 contiene elementos preguntando si la longitud del objeto es igual a 0. Si lo es, si no tiene elementos y esta vacio, se pinta la info de carrito_12 vacio a traves de un templateString ``
   // Con el return hace que si el if es verdadero, devuelva ese templatestrig y luego SALGA de la funcion y no sigue leyengo lo de abajo
   if(Object.keys(carrito_12).length === 0) {
       footer12.innerHTML = `
       <th scope="row" colspan="5">Tu carrito esta vacío!</th>
       `
       return
   }

   // Si hay productos en el carrito_12, se debe hacer unas operaciones. Sumar la cantidad de productos totales (nCantidad) y mostrar el precio final (nPrecio)
   // Se crean  constantes que sea la suma de todas las cantidades y la suma de las cantidades por el precio (precio final).               Se va a utilizar el reduce que va a tomar una funcion con parametros, que itere en las cantidades de cada producto y en cada iteracion va a ir acumulando esas {cantidades} en una cantidad total en el footer12 (nCantidad). Lo que va a devolver es un numero por eso el 0

   const nCantidad = Object.values(carrito_12).reduce((acc, {cantidad}) => acc + cantidad,0)
   const nPrecio = Object.values(carrito_12).reduce((acc , {cantidad, precio}) => acc + cantidad * precio,0)

   // Esto ahora se tiene que pintar en el templatefooter12                                                                                   Lo primero que se va a modifucar es el primer <td> que es igual al total de productos (nCantidad) y luego el segundo <td> igual al precio total (nPrecio)

   template_footer12.querySelectorAll('td')[0].textContent = nCantidad
   template_footer12.querySelector('span').textContent = nPrecio
  

   const clone = template_footer12.cloneNode(true)
   fragment.appendChild(clone)
   footer12.appendChild(fragment)

   // Ahora se va a detectar el boton de vaciar el carrito_12 y se le indica que ante el evento click, let carrio = {} vuelva a ser un objeto VACIO. 

   const btnVaciar = document.getElementById('vaciar-carrito')
   btnVaciar.addEventListener('click', () => {
       carrito_12 = {}
       pintarcarrito()
   })
}

// Ahora se van a detectar los botones de agregar o sacar.
   // Para aumentar o sacar primero de debe acceder a la coleccion de objetos (productos) y capturar el id de ese producto
   const btnAccion = e => {

   }