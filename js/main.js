'use strict';

let inputs = document.querySelectorAll('.input_card');
var comenzar = document.querySelector('.boton');
let resultado;
var cardBack = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
var section = document.querySelector('.card__seccion');
comenzar.addEventListener('click', empezar);

// function reset (){
//   section.innerHTLM = '';
// }

function empezar() {
  section.innerHTML='';
  fetch(
    'https://raw.githubusercontent.com/Adalab/cards-data/master/' +
      resultado +
      '.json'
  )
    .then(function(respuesta) {

      return respuesta.json();
    })
    .then(function(respuesta2) {

      for (var i = 0; i < respuesta2.length; i++) {
        const contenedor = document.createElement('div');
        contenedor.classList.add('poke__div');
        const imagen = document.createElement('img');
        imagen.classList.add('poke__image');

        imagen.src =
          'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
        imagen.setAttribute('data-url', respuesta2[i].image);
        // if(parseInt(resultado)===6){
        //   section.classList.add('grid');
        // }

        contenedor.appendChild(imagen);
        section.appendChild(contenedor);
      }

      mostarCarta();

    });
}

function mostarCarta() {
  var mostrarcarta = document.querySelectorAll('.poke__image');

  for (var i = 0; i < mostrarcarta.length; i++) {
    mostrarcarta[i].addEventListener('click', showCard);
  }
}
function showCard(event) {
  if (event.currentTarget.src === cardBack) {
    event.currentTarget.src = event.currentTarget.getAttribute('data-url');
  } else {
    event.currentTarget.src = cardBack;
  }
}

for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('click', buscar);
}

function buscar() {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      resultado = inputs[i].value;

    }
  }
}
