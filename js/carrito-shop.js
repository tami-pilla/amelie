const producto_1 = document.getElementById('producto1')
const producto_2 = document.getElementById('producto2')
const producto_3 = document.getElementById('producto3')
const producto_4 = document.getElementById('producto4')
const producto_5 = document.getElementById('producto5')
const producto_6 = document.getElementById('producto6')
const producto_7 = document.getElementById('producto7')
const producto_8 = document.getElementById('producto8')

const producto_9 = document.getElementById('producto9')
const producto_10 = document.getElementById('producto10')
const producto_11 = document.getElementById('producto11')
const producto_12 = document.getElementById('producto12')
const producto_13 = document.getElementById('producto13')
const producto_14 = document.getElementById('producto14')
const producto_15 = document.getElementById('producto15')
const producto_16 = document.getElementById('producto16')

const producto_17 = document.getElementById('producto17')
const producto_18 = document.getElementById('producto18')
const producto_19 = document.getElementById('producto19')
const producto_20 = document.getElementById('producto20')
const producto_21 = document.getElementById('producto21')
const producto_22 = document.getElementById('producto22')
const producto_23 = document.getElementById('producto23')
const producto_24 = document.getElementById('producto24')

const producto_25 = document.getElementById('producto25')
const producto_26 = document.getElementById('producto26')
const producto_27 = document.getElementById('producto27')
const producto_28 = document.getElementById('producto28')
const producto_29 = document.getElementById('producto29')
const producto_30 = document.getElementById('producto30')
const producto_31 = document.getElementById('producto31')
const producto_32 = document.getElementById('producto32')

const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCarrito = document.getElementById('template-carrito').content
const templateFooter = document.getElementById('template-footer').content

const fragment = document.createDocumentFragment()

let carrito = {}



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

producto_9.addEventListener('click', e => {
    addCarrito(e)
})


producto_10.addEventListener('click', e => {
    addCarrito(e)
})

producto_11.addEventListener('click', e => {
    addCarrito(e)
})
producto_12.addEventListener('click', e => {
    addCarrito(e)
})
producto_13.addEventListener('click', e => {
    addCarrito(e)
})
producto_14.addEventListener('click', e => {
    addCarrito(e)
})
producto_15.addEventListener('click', e => {
    addCarrito(e)
})
producto_16.addEventListener('click', e => {
    addCarrito(e)
})


producto_17.addEventListener('click', e => {
    addCarrito(e)
})

producto_18.addEventListener('click', e => {
    addCarrito(e)
})

producto_19.addEventListener('click', e => {
    addCarrito(e)
})
producto_20.addEventListener('click', e => {
    addCarrito(e)
})
producto_21.addEventListener('click', e => {
    addCarrito(e)
})
producto_22.addEventListener('click', e => {
    addCarrito(e)
})
producto_23.addEventListener('click', e => {
    addCarrito(e)
})
producto_24.addEventListener('click', e => {
    addCarrito(e)
})


producto_25.addEventListener('click', e => {
    addCarrito(e)
})

producto_26.addEventListener('click', e => {
    addCarrito(e)
})

producto_27.addEventListener('click', e => {
    addCarrito(e)
})
producto_28.addEventListener('click', e => {
    addCarrito(e)
})
producto_29.addEventListener('click', e => {
    addCarrito(e)
})
producto_30.addEventListener('click', e => {
    addCarrito(e)
})
producto_31.addEventListener('click', e => {
    addCarrito(e)
})
producto_32.addEventListener('click', e => {
    addCarrito(e)
})



items.addEventListener('click', e => {
    btnAccion(e)
})

document.addEventListener('DOMContentLoaded', () => {

    if(localStorage.getItem('carrito')) {
       carrito = JSON.parse(localStorage.getItem('carrito'))
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
   
   if(carrito.hasOwnProperty(producto.titulo)) {
       producto.cantidad = carrito[producto.titulo].cantidad + 1
   }

    // Una vez que se tiene el objeto producto se tiene que empujar al carrito. Carrito en su propiedad producto.id va a ser igual a una copia. Con los ... se accede a la info de producto (id, titulo, precio, cantidad) y se hace una copia de esa info
   // Se crea el index con el producto.id (el id serviria para identificar cada producto)
   carrito[producto.titulo] = {...producto}
   // Cada ver que se agregue un producto se EJECUTAR pintarCarrito (va a aparecer esa info en el DOM)
   pintarCarrito()
}

// Ahora se deben pintar los elementos seleccionados dentro del carrito (similar a pintar la data de las cards)
// Para acceder a los objetos de carrito se hace a traves de Object.values y recien ahi se puede hacer un recorrido por cada uno con el forEach (Object.values se utiliza porque carrito es una coleccion de objetos y en este caso no se pueden utilizar las musmas funcionalidades que en los arrays)
// producto.id hace referencia el id de const producto, el producto que se empuja cuando algo se agrega al carrito

const pintarCarrito = () => {
   
   items.innerHTML = ''
   Object.values(carrito).forEach( producto => {
       templateCarrito.querySelector('th').textContent = producto.id
       templateCarrito.querySelectorAll('td')[0].textContent = producto.titulo
       templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
       templateCarrito.querySelector('.btn-sumar').dataset.id = producto.id
       templateCarrito.querySelector('.btn-restar').dataset.id = producto.id
       templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

       const clone = templateCarrito.cloneNode(true)
       fragment.appendChild(clone)
   })

 // la info clonada debe pintarse en los items
   items.appendChild(fragment)

     //Cada vez que se pinta el carrito tambinen se tiene que pintar el footer
  pintarFooter()

     //Aca voy a guardar la info que venga del carrito en el LocalStorage. Se usa setItem porque se esta ALMACENANDO, guardando.
    // Se guarda con la key 'carrito'. 
    // La colecion de objetos carrito estan guardados como un string plano de texto (el JSON hace esto) y luego aca se va a querer que vuelva a ser una coleccion de objetos (con el JSON.parse)
    localStorage.setItem('carrito', JSON.stringify(carrito))
  
}


  


// Ahora se pinta el footer. El cual cambia si hay productos agregados en carrito.
// eL tamplateFooter se va a pintar en el footer, en el tfoot de la tabla de los items

const pintarFooter = () => {
   footer.innerHTML = ''

   // Se pregunta si el carrito contiene elementos preguntando si la longitud del objeto es igual a 0. Si lo es, si no tiene elementos y esta vacio, se pinta la info de carrito vacio a traves de un templateString ``
   // Con el return hace que si el if es verdadero, devuelva ese templatestrig y luego SALGA de la funcion y no sigue leyengo lo de abajo
   if(Object.keys(carrito).length === 0) {
       footer.innerHTML = `
       <th scope="row" colspan="5">Tu carrito esta vacío!</th>
       `
       return
   }

   // Si hay productos en el carrito, se debe hacer unas operaciones. Sumar la cantidad de productos totales (nCantidad) y mostrar el precio final (nPrecio)
   // Se crean  constantes que sea la suma de todas las cantidades y la suma de las cantidades por el precio (precio final).               Se va a utilizar el reduce que va a tomar una funcion con parametros, que itere en las cantidades de cada producto y en cada iteracion va a ir acumulando esas {cantidades} en una cantidad total en el footer (nCantidad). Lo que va a devolver es un numero por eso el 0

   const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
   const nPrecio = Object.values(carrito).reduce((acc , {cantidad, precio}) => acc + cantidad * precio,0)

   // Esto ahora se tiene que pintar en el templateFooter                                                                                   Lo primero que se va a modifucar es el primer <td> que es igual al total de productos (nCantidad) y luego el segundo <td> igual al precio total (nPrecio)

   templateFooter.querySelectorAll('td')[0].textContent = nCantidad
   templateFooter.querySelector('span').textContent = nPrecio
  

   const clone = templateFooter.cloneNode(true)
   fragment.appendChild(clone)
   footer.appendChild(fragment)

   // Ahora se va a detectar el boton de vaciar el carrito y se le indica que ante el evento click, let carrio = {} vuelva a ser un objeto VACIO. 

   const btnVaciar = document.getElementById('vaciar-carrito')
   btnVaciar.addEventListener('click', () => {
       carrito = {}
       pintarCarrito()
   })
}

// Ahora se van a detectar los botones de agregar o sacar.
   // Para aumentar o sacar primero de debe acceder a la coleccion de objetos (productos) y capturar el id de ese producto
   const btnAccion = e => {

 }