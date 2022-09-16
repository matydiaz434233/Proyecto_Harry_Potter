let listapersonajes;
let listaobjetos ={};
let cartas;
let seleccionados = [];
const urlapi = "http://hp-api.herokuapp.com/api/characters";

const personajesharry = async () => {
try {
    const response = await fetch("http://hp-api.herokuapp.com/api/characters");
  const respuesta = await response.json();
  listaobjetos = respuesta.filter((x) => x.image != "");
  listaobjetos = listaobjetos.concat(listaobjetos);
  console.log (listaobjetos);
  listaobjetos.sort(()=> Math.random() - 0.5);
  cargar


} catch (error) {
    console.log(error);
}
  
};
const hacervisible= ()=>{
let TEMPORIZADOR= document.getElementById("tiempo");
TEMPORIZADOR.classList.toggle("inv");

}

let CargarJuego= (objeto)=>{

}














/*   TEMPORIZADOR */

let horas = 0;
let minutos = 5;
let segundos = 0;
cargarSegundo();

//Definimos y ejecutamos los segundos
function cargarSegundo() {
  let txtSegundos;

  if (segundos < 0) {
    segundos = 59;
  }

  //Mostrar Segundos en pantalla
  if (segundos < 10) {
    txtSegundos = `0${segundos}`;
  } else {
    txtSegundos = segundos;
  }
  document.getElementById("segundos").innerHTML = txtSegundos;
  segundos--;

  cargarMinutos(segundos);
}

//Definimos y ejecutamos los minutos
function cargarMinutos(segundos) {
  let txtMinutos;

  if (segundos == -1 && minutos !== 0) {
    setTimeout(() => {
      minutos--;
    }, 500);
  } else if (segundos == -1 && minutos == 0) {
    setTimeout(() => {
      minutos = 59;
    }, 500);
  }

  //Mostrar Minutos en pantalla
  if (minutos < 10) {
    txtMinutos = `0${minutos}`;
  } else {
    txtMinutos = minutos;
  }
  document.getElementById("minutos").innerHTML = txtMinutos;
  cargarHoras(segundos, minutos);
}

//Definimos y ejecutamos las horas
function cargarHoras(segundos, minutos) {
  let txtHoras;

  if (segundos == -1 && minutos == 0 && horas !== 0) {
    setTimeout(() => {
      horas--;
    }, 500);
  } else if (segundos == -1 && minutos == 0 && horas == 0) {
    setTimeout(() => {
      horas = 2;
    }, 500);
  }

  //Mostrar Horas en pantalla
  if (horas < 10) {
    txtHoras = `0${horas}`;
  } else {
    txtHoras = horas;
  }
  document.getElementById("horas").innerHTML = txtHoras;
}

//Ejecutamos cada segundo
setInterval(cargarSegundo, 1000);