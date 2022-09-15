/*       Juego de Memoria de Cartas “Harry Potter”
Utilizando la API de personajes de Harry Potter http://hp-api.herokuapp.com/api/characters realice un juego de memoria de Cartas. 
El objetivo es lograr memorizar la ubicación de las diferentes cartas con el fin de voltear sucesivamente las 2 cartas idénticas que 
formen pareja, para llevárselas (sacarlas del tablero). La partida se terminará cuando estén todas las parejas encontradas.

a)	Presente un tablero de cartas (5 columnas) utilizando solo personajes que tengan imágenes. (Recuerde que deben ser 2 cartas por personaje). 
Presente las cartas del lado oculto.
b)	Agregue un botón “comenzar a jugar” que inicialice un timer en 5 minutos. El cual se mostrará en pantalla e ira decrementando por segundo 
hasta llegar a 0 donde finalizara la partida si es que no finalizo antes.
c)	Lleve en un contador la cantidad de intentos realizados.
d)	Cada vez que el usuario hace click sobre una carta se muestra el contenido y se espera por saber si la próxima opción hace match o no.
e)	Si la segunda opción hace match se deben sacar las cartas emparejadas del tablero. Si no se vuelven a ocultar para que el usuario continue 
el juego.
f)	Si se encontraron todas las parejas antes de que termine el tiempo entonces el jugador gana y se le informa la cantidad de intentos utilizados.
   *  / 


/***PARAMETROS PARA EL JUEGO  *****/
var oJuego = new Object() ; //instanciamos un nuevo objeto, el juego de harry
oJuego.columnas = 5; //establecemos el número de columnas que tendrá el tablero
oJuego.filas = 4; //establecermos el número de filas que tendrá el tablero
oJuego.extension=".png"; //extensión para TODAS las imagenes
oJuego.ruta     ="img/"; //directorio dónde seguardan las imagenes
oJuego.pulsada  = new Array (0,0); //array para guardar las parejas de cartas al pulsar
oJuego.intentos = 0; //contador de intentos
oJuego.aciertos = 0; //contador de aciertos

var MAXIMO_FICHAS = oJuego.filas * oJuego.columnas; //el máximo de fichas para el tablero
var aImagenes = new Array(); //array para guardar las imagenes
var enPausa = false; //pause para esperar a pulsar la segunda carta
/********************************/

/************FUNCIONES***********/
//Función para cargar todas las imagenes. Le damos un tamaño de 100x100
//Guardamos cada imagen dentro del array para guardar las imagenes
function cargarImagenes(){
    

    for( i = 0; i < MAXIMO_FICHAS;i++){
           aImagenes[i] = new Image(100,100);
        aImagenes[i].src = oJuego.ruta + i + oJuego.extension;
    }

}

/*********************************/

//functión para pintar en la página el tablero
//por defecto se muestra en todas la celdas la imagen llamada cruz.png
//se guardan todos los elementos de la tabla dentro de la variable salida
//que se muestra al final de la función.
function mostrarTablero(){

    //mostramos los contadores
    document.getElementById("movimientos").innerHTML = oJuego.intentos;
    document.getElementById("aciertos").innerHTML    = oJuego.aciertos;

    var salida = "<table>\n";
         
   for (i=0; i < MAXIMO_FICHAS ; i++) {
        if (i % oJuego.columnas == 0 ){
            salida += "\n<tr>"
        }         
        salida += '<td id="carta_'+ i + '"><a href="" onclick="return false" onmousedown="mostrar(' +i + ')" onmouseup="comprobar('+i+')" >'+
                  '<img src="' + oJuego.ruta+ "cruz" + oJuego.extension + '"></a></td>';    
    }
    salida += "</table>";

    document.getElementById("tablero").innerHTML = salida;
}

/*********************************/

//functión para empezar y establecer los parámetros antes de mostrar el tablero
function empezarJuego(){
    var nUno, nDos, nTemp;
    oJuego.pulsada  = new Array (-1,-1); //iniciamos en -1 para solo poder usar las posiciones 1 y 0
    oJuego.intentos = 0;
    oJuego.aciertos = 0;

    // ordenar array ()
    oJuego.cartas = new Array (MAXIMO_FICHAS)
    for (i=0; i < MAXIMO_FICHAS ; i++ ){
           oJuego.cartas[i] = i;
    }

    // desordenar el array()
    i = 100 ;
    while (i--){
        nUno = azar(); //aleatorio para separar las parejas
        nDos = azar(); //aleatorio para separar la pareja de la anterior
        if (nDos != nUno ){ //establecemos el orden
              nTemp = oJuego.cartas[nUno]
              oJuego.cartas[nUno] = oJuego.cartas[nDos]
              oJuego.cartas[nDos] = nTemp;
          }
    }

    mostrarTablero(); //mostramos el tablero gracias a la función mostrarTablero
}

/*********************************/

// funciones varias para el juego
function azar(){  
    return Math.floor(Math.random()*MAXIMO_FICHAS);
}

/*********************************/

//función para comprobar si se han pulsado una o dos cartas
function soloImpar(n){
    return (n % 2 == 0 ? n : n - 1);
}

/*********************************/

//functión para mostrar cada una de las imagenes
function mostrar(nFicha){
   if (!enPausa){
       //buscamos la imagen en el array
       if ( document.images[nFicha].src.indexOf(oJuego.ruta + "cruz"+ oJuego.extension)!=-1 ) {
           document.images[nFicha].src = aImagenes[ oJuego.cartas[nFicha] ].src;
           if ( oJuego.pulsada[0] == -1 )
               oJuego.pulsada[0]= nFicha;
           else 
               oJuego.pulsada[1]= nFicha;
       } else {
         //en caso de que se pulse una imagen ya girada    
         alert("Pulsa sobre una imagen sin pareja ... !!");
       }
    }
}

/*********************************/

//functión para volver a dar la vuelta a las cartas
function quitarPausa(){
    enPausa= false;
    document.images[oJuego.pulsada[0]].src = oJuego.ruta + "cruz"+ oJuego.extension;
    document.images[oJuego.pulsada[1]].src = oJuego.ruta + "cruz"+ oJuego.extension;

   // volver las teclas 
    oJuego.pulsada[0] = -1;
    oJuego.pulsada[1] = -1; 
}

/*********************************/

function comprobar(){
    // comprobar dos teclas    
    if( enPausa || oJuego.pulsada[1] == -1){
        return ;
   }
    
    oJuego.intentos++; //añadimos uno al contador

    //en caso de acertar 
    if ( soloImpar(oJuego.cartas[oJuego.pulsada[0]]) == soloImpar(oJuego.cartas[oJuego.pulsada[1]]) ) { 
        oJuego.aciertos++; //añadimos uno al contador aciertos
        //si el número de aciertos multiplicado por 2 es igual al número de fichas
        //se da por teminado el juego
        if ( oJuego.aciertos * 2 == MAXIMO_FICHAS ) {
            //Paramos el cronómetro
            detenerse()
            //mensaje de final de juego
            alert("Bien Jugado ... y solo lo has tenido que intentar "+oJuego.intentos+" veces\nComo premio un chorizo de cantimpalo!!!" +
                "\nHas tardado en completar el juego "+contador_m+":"+(contador_s-1));
        }
        oJuego.pulsada[0] = -1;
        oJuego.pulsada[1] = -1;
    } else {
       enPausa= true; //activamos pause
       setTimeout(quitarPausa,1000); //establecemos el pause en 1 segundo para darse la vuelta las imagenes cuando no coincidan
    }
    
    //mostramos los contadores
    document.getElementById("movimientos").innerHTML = oJuego.intentos;
    document.getElementById("aciertos").innerHTML    = oJuego.aciertos;
}

/*********************************/

//Evento que al cargarse la ventana carga las funciones cargarImagenes, empezarJuego y cargar el reloj

window.onload = function iniciamos () { 
    cargarImagenes();
    empezarJuego();
    bienvenida();
}

/********************************/
//esta función hace funcionar el reloj desde que se carga la página
function carga(){
        contador_s =0;
        contador_m =0;
            s = document.getElementById("segundos");
            m = document.getElementById("minutos");

                cronometro = setInterval(
                        function(){
                        if(contador_s==60)
                                {
                                    contador_s=0;
                                    contador_m++;
                                    m.innerHTML = contador_m;

                                    if(contador_m==60)
                                        {
                                        contador_m=0;
                                        }
                                }

                        s.innerHTML = contador_s;
                            contador_s++;

                        }
                    ,1000);

        }

/***********************************/
//Esta función detiene el cronómetro
    var cronometro;

    function detenerse(){
           clearInterval(cronometro);
    }

/***************************************/
//Función de bienvenida  que inicia al reloj
function bienvenida(){
    carga();
}



/*   TEMPORIZADOR */

let horas = 0;
let minutos = 5;
let segundos = 0;
cargarSegundo();

//Definimos y ejecutamos los segundos
function cargarSegundo(){
    let txtSegundos;

    if(segundos < 0){
        segundos = 59; 
    }

    //Mostrar Segundos en pantalla
    if(segundos < 10){
        txtSegundos = `0${segundos}`;
    }else{
        txtSegundos = segundos;
    }
    document.getElementById('segundos').innerHTML = txtSegundos;
    segundos--;

    cargarMinutos(segundos);
}

//Definimos y ejecutamos los minutos
function cargarMinutos(segundos){
    let txtMinutos;

    if(segundos == -1 && minutos !== 0){
        setTimeout(() =>{
            minutos--;
        },500)
    }else if(segundos == -1 && minutos == 0){
        setTimeout(() =>{
            minutos = 59;
        },500)
    }

    //Mostrar Minutos en pantalla
    if(minutos < 10){
        txtMinutos = `0${minutos}`;
    }else{
        txtMinutos = minutos;
    }
    document.getElementById('minutos').innerHTML = txtMinutos;
    cargarHoras(segundos,minutos);
}

//Definimos y ejecutamos las horas
function cargarHoras(segundos,minutos){
    let txtHoras;

    if(segundos == -1 && minutos == 0 && horas !== 0){
        setTimeout(() =>{
            horas--;
        },500)
    }else if(segundos == -1 && minutos == 0 && horas == 0){
        setTimeout(() =>{
            horas = 2;
        },500)
    }

    //Mostrar Horas en pantalla
    if(horas < 10){
        txtHoras = `0${horas}`;
    }else{
        txtHoras = horas;
    }
    document.getElementById('horas').innerHTML = txtHoras;
}

//Ejecutamos cada segundo
setInterval(cargarSegundo,1000);



// cargo el fecth
const response= await fetch('http://hp-api.herokuapp.com/api/characters');
const respuesta= await response.json();
let personajes = respuesta.filter(x => x.image !="");
personajes - personajes.concat(personajes);