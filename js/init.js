//Ancho y alto del div de fondo de la aplicación
// VARIABLES GLOBALES

var anchoFondo = document.getElementsByClassName('fondo')[0].clientWidth - document.getElementById('plantilla').clientWidth - 50;		
var altoFondo = document.getElementsByClassName('fondo')[0].clientHeight - document.getElementsByClassName('barra-inferior')[0].clientHeight - 20;
let objetoJuego = new Juego(); 

//detectamos click sobre el botón y llamamos a juego.play()
document.getElementsByTagName('button')[0].onclick = function () {
	objetoJuego.play();
};
document.body.style.overflow = 'hidden'; // eliminar el posible overflow