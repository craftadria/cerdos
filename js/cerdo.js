class Cerdo {		//class Cerdo{
	constructor(id) {			//constructor(id){
		function random() {
			/*funcion random() devuelve valor aleatorio entre -5 y 5*/
			//return Math.random() * (5 - -5) + -5;

			//La condición expresada en el enunciado es ERRÓNEA. Si el valor = 0 no habrá movimiento y si el valor es negativo, se moverá hacia arriba ??
			return Math.random() * 5;
		}

		function randomXPosition() {
			return Math.floor(Math.random() * anchoFondo);
        }

		// variable random_posicion_x : Guarda la posicion aleatoria en el eje x dentro de mi ventana
		let random_position_x = randomXPosition();

		// PROPIEDADES
		this.id = id;											// this.id = id
		this.vida = 1;											// this.vida = 1
		this.top = 0;											// this.top = 0
		this.left = random_position_x;							// this.left = random_posicion_x
		this.velx = 0;											// this.velx = 0
		this.vely = random();									// this.vely = random()
		this.estado = 'esperando';								// this.estado = 'esperando' //puede valer salvado, muerto, esperando o volando
		this.clon = '';											// this.clon = '' //Guarda el html correspondiente al cerdo
		this.partida = null;
	}

	establecerObjetoPartida(partida) {
		this.partida = partida;
    }

	// método Jugar()
	jugar() {													//jugar(){
		function clonarTag(tagId, nuevoId) {
			let htmlTag = document.getElementById(tagId).tagName;
			let nuevoObjeto = document.createElement(htmlTag);
			nuevoObjeto.id = nuevoId;
			nuevoObjeto.classList = document.getElementById(tagId).classList;

			return nuevoObjeto;
		}

		//Guardamos en this.clon un clon del div #plantilla
		//añadimos a this.clon el atributo id correspondiente a la propiedad this.id del objeto

		this.clon = clonarTag('plantilla', this.id);

		// cambiamos la propiedad css left para que coincida con this.left
		this.clon.style.left = this.left.toString() + "px";

		//Añado el html de this.clon al div .fondo
		document.getElementsByClassName('fondo')[0].appendChild(this.clon);

		let that = this;

		//Añadimos listener de click a this.clon 
		this.clon.onclick = function () {						//Si click en cerdo...						
			that.clon.onclick = null;

			that.estado = 'salvado';							//cambiamos this.estado a salvado
			that.clon.classList += ' feliz';					//Añadimos la clase feliz al cerdo
						
			//incrementamos la propiedad cerdos_salvados del objeto partida			
			let cerdosActuales = that.partida.incrementarCerdosSalvados();

			//Actualizamos el el dom para que aparezcan los cerdos salvados en pantalla
			document.getElementById('div_cerdos_salvados').innerText = cerdosActuales.toString();	

			//Cargamos sonido y reproducimos	
			let audio = new Audio('sonidos/oink.mp3');
			audio.play();

			//Ponemos temporizador para que al cabo de un segundo se llame al metodo borrarCerdo			
			let intervalo = setInterval(function (cerdo) {
				clearTimeout(intervalo);
				cerdo.borrarCerdo();
			}, 1 * 1000, that);
		};
	}

	matarCerdo() {												// método matarCerdo()
		this.estado = 'muerto';									// cambiamos propiedad estado del cerdo a 'muerto'
		this.clon.classList += ' hot';							// añadimos al clon la clase 'hot'		
		this.clon.style.top = (altoFondo + 35).toString() + "px";
				
		//eliminamos la clase 'cerdo'
		let clasesActuales = this.clon.className.split(' ').filter(x => x != 'cerdo');
		this.clon.className = clasesActuales.join(' ');

		//incrementamos la propiedad cerdos_muertos del objeto 'juego'
		let cerdosMuertosActuales = this.partida.incrementarCerdosMuertos();

		//insertamos en pantalla los cerdos muertos
		document.getElementById('div_cerdos_muertos').innerText = cerdosMuertosActuales.toString();

		//cargamos y reproducimos el sonido del cerdo muerto
		let audio = new Audio('sonidos/chilla.mp3');
		audio.play();
	}

	moverCerdo() {	// método mover()
		if (this.estado == 'volando') {							// miramos si el estado del cerdo es 'volando'. En caso afirmativo...			
			if (this.top >= altoFondo) {						// comprobamos que el cerdo ha llegado al final de la pantalla. Si es así...
				this.matarCerdo();								// llamamos al método martarCerdo()			
			}
			else {												// Si aún está volando 
				let speed = 5 * this.vely;						// Calcular velocidad
				if (speed < 2) speed = 2;						// Mínimo de velocidad

				this.top += speed;								//incrementamos la posición top del cerdo !! POR LA VELOCIDAD DE Y ??? 

				//Actualizamos el propiedad CSS top del clon con el valor this.top
				document.getElementById(this.id).style.top = this.top.toString() + 'px';
			}
		}
	}

	borrarCerdo() {												// método borrarCerdo()
		//Cambiamos el valor de la propiedad display del cerdo por 'none'
		document.getElementById(this.id).style = 'display: none;';
	}
}
