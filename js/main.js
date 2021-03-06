'use strict';

//declaracion de variables globales

var inputs = document.querySelectorAll('.input_card');
var comenzar = document.querySelector('.boton');
var resultado;
var trasera = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
var section = document.querySelector('.card__seccion');
var contando = document.querySelector('.counter');
var cont = 0;

contando.innerHTML = cont;

//identifica el valor del input seleccionado

function buscar() {
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      resultado = inputs[i].value;
    }
  }
}
//event listener a los inputs

for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('click', buscar);
}

//desencadena el juego con un event listener en el boton

comenzar.addEventListener('click', empezar);

//inicia el juego

function empezar() {
  //reset

  section.innerHTML = '';

  //quito la clase grid que añado al valor 6 del input

  section.classList.remove('grid');

  fetch(
    'https://raw.githubusercontent.com/Adalab/cards-data/master/' +
      resultado +
      '.json'
  )
    .then(function(respuesta) {
      //me devuelve un objeto y lo pasamos a formato json

      return respuesta.json();
    })
    .then(function(respuesta2) {
      //creo los elementos

      for (var i = 0; i < respuesta2.length; i++) {
        const contenedor = document.createElement('div');
        contenedor.classList.add('poke__div');
        const imagen = document.createElement('img');
        imagen.classList.add('poke__image');
        const imagen2 = document.createElement('img');
        imagen2.classList.add('poke__image', 'poke__hidden');
        const parrafo = document.createElement('p');
        parrafo.innerHTML=respuesta2[i].pair;

        imagen.src = trasera;
        imagen2.src = respuesta2[i].image;

        //mejoro la visualizacion con 6 cartas

        if (resultado === '6') {
          section.classList.add('grid');
        }
        //añado los elementos al section

        contenedor.appendChild(imagen);
        contenedor.appendChild(imagen2);
        contenedor.appendChild(parrafo);
        section.appendChild(contenedor);
      }

      mostarCarta();
    });
}

//event listener a las imagenes

function mostarCarta() {
  var mostrarcarta = document.querySelectorAll('.poke__image');

  for (var i = 0; i < mostrarcarta.length; i++) {
    mostrarcarta[i].addEventListener('click', showCard);

  }
}

//oculta la tarjeta clicada y muestra la otra

function showCard(event) {
  if (event.currentTarget.src === trasera) {
    event.currentTarget.classList.add('poke__hidden');
    event.currentTarget.parentElement.children[1].classList.remove(
      'poke__hidden'
    );
  } else {
    event.currentTarget.classList.add('poke__hidden');
    event.currentTarget.parentElement.children[0].classList.remove(
      'poke__hidden'
    );
  }
  cont = cont+1;
  contando.innerHTML = cont;

}

