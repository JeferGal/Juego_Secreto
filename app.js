// =======================
// Variables globales
// =======================

// Usar Array para almacenar los números que ya han sido sorteados
let listaNumeroSorteados = [];

// Definimos el número máximo que el usuario puede adivinar
let numeroMaximo = 10;

// Generamos un número secreto al iniciar el juego
let numeroSecreto = generarNumeroSecreto();
console.log(numeroSecreto);

// Variable para contar los intentos del usuario
let intentos = 1;

// =======================
// Funciones utilitarias
// =======================

// Función para asignar texto a un elemento HTML.
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

// =======================
// Inicialización de la interfaz
// =======================

// Llamamos y asignamos el texto al título y al párrafo principal
asignarTextoElemento("h1", "Juego del número secreto");
asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}:`);

// =======================
// Lógica del juego
// =======================

/**
 * Función que se ejecuta al hacer clic en el botón "Intentar".
 * Verifica si el número ingresado por el usuario es igual al número secreto.
 */
function verificarIntento() {
    let numeroUsuario = parseInt(document.getElementById("valorUsuario").value);
    // Si el número ingresado es el correcto, mostramos un mensaje de éxito
    if (numeroUsuario === numeroSecreto) {
        asignarTextoElemento("p",`¡Has acertado! Lo has logrado en ${intentos} ${intentos === 1 ? "intento" : "intentos"}.`
        );
        // Botón reiniciar se habilita solo cuando el usuario acierta el número secreto
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        // Si el número ingresado es mayor o menor que el número secreto, mostramos un mensaje correspondiente
        if (numeroUsuario > numeroSecreto) {
            asignarTextoElemento("p", "El número secreto es menor");
        } else {
            asignarTextoElemento("p", "El número secreto es mayor");
        }
        // Incrementamos el contador de intentos y limpiamos el campo de entrada
        intentos++;
        limpiarCampo();
    }
    return;
}

/**
 * Función que se ejecuta al hacer clic en el botón "Nuevo juego".
 * Reinicia el juego y el estado de la interfaz.
 */
function reiniciarJuego() {
    limpiarCampo(); // Limpiar el campo de entrada
    numeroSecreto = generarNumeroSecreto(); // Reiniciar el número secreto
    console.log(numeroSecreto);
    document.getElementById("reiniciar").setAttribute("disabled", "true"); // Deshabilitamos el botón de reinicio
    intentos = 1; // Reiniciamos el contador de intentos
}

/**
 * Funcion para limpiar el campo de entrada del usuario.
 */
function limpiarCampo() {
    document.getElementById("valorUsuario").value = "";
}

/**
 * Genera un número secreto aleatorio entre 1 y numeroMaximo (10).
 * Asegura que no se repita un número ya sorteado.
 */
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    console.log(numeroGenerado);
    console.log(listaNumeroSorteados);

    if (listaNumeroSorteados.length == numeroMaximo) {
        // Si ya se han sorteado todos los números, mostramos un mensaje
        asignarTextoElemento("p", "Todos los números posibles han sido sorteados.");
    } else {
        // Si aún hay números disponibles, verificamos si el número generado ya fue sorteado
        if (listaNumeroSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            // Si el número no fue sorteado, lo agregamos a la lista y lo retornamos
            listaNumeroSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}