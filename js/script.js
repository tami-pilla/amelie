
// ABRIR-CERRAR MENU
const abrir_menu = document.querySelector('#btn-abrir-menu')
const menu__off__canvas = document.querySelector('#menu')
const cerrar_menu = document.querySelector('#btn-cerrar-menu')

abrir_menu.addEventListener('click', show)
cerrar_menu.addEventListener('click', hide)


function show (){
 menu__off__canvas.classList.add('menu-activo')
}

function hide (){
    menu__off__canvas.classList.remove('menu-activo')
}



   



// CAMBIO EN EL MENU AL HACER SCROLL
window.addEventListener('scroll', function(){
var header_scroll = document.getElementById('header-scroll');
   header_scroll.classList.toggle('abajo', window.scrollY>600);
 })



// MENU DROPDOWN
const btn_dropdown = document.querySelector('.dropdown-btn')
const menu_dropdown = document.querySelector('.menu-dropdown')


btn_dropdown.addEventListener('click', dropdown)


function dropdown (){
  menu_dropdown.classList.toggle('show_dropdown');
 }
 




//  CARRITO VENTANA MODAL
const modal = document.getElementById('modal')
const abrir_modal = () => {
    modal.style.display = 'flex';
}

const cerrar_modal = () => {
    modal.style.display = 'none';
}




