const inicio = document.getElementById("inicio");
const registro = document.getElementById("registro");
const comenzar = document.getElementById("comenzar");
const volver = document.getElementById("volver");
const nombreJugador = document.getElementById("nombreJugador");
const agregar = document.getElementById("agregar");
const listaJugadores = document.getElementById("listaJugadores");
let jugadores = [];
let equiposActuales = []; 
const contadorJugadores = document.getElementById("contadorJugadores");
const siguienteRegistro = document.getElementById("siguienteRegistro");
const mensajeMinimo = document.getElementById("mensajeMinimo");
const formarEquipos = document.getElementById("formarEquipos");
const volverRegistro = document.getElementById("volverRegistro");
const dosEquipos = document.getElementById("dosEquipos");
const tresEquipos = document.getElementById("tresEquipos");
const resultadoEquipos = document.getElementById("resultadoEquipos");

comenzar.addEventListener("click",function(){
    registro.hidden = false;
    inicio.hidden = true;
});
volver.addEventListener("click", function(){
    registro.hidden = true;
    inicio.hidden = false;
});

agregar.addEventListener("click", function(){
    const nombre= nombreJugador.value.trim();
    if (nombre===""){
        return;
    }
    jugadores.push(nombre);
    console.log(jugadores);
    const nuevoJugador = document.createElement("li");
    
    const textoNombre = document.createElement("span");
    textoNombre.textContent = nombre;

    const botonSubir = document.createElement("button");
    botonSubir.classList.add("boton-subir");
    botonSubir.textContent = "↑"

    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("boton-eliminar");
    botonEliminar.textContent = "X";

    botonEliminar.addEventListener("click", function(){
        const posicion = Array.from(listaJugadores.children)
        .indexOf(nuevoJugador);

        if(posicion !==-1){
            jugadores.splice(posicion,1);
        }
        nuevoJugador.remove();
        actualizarRegistro();

        console.log(jugadores);
    });

    botonSubir.addEventListener("click", function(){
        const jugadorAnterior = nuevoJugador.previousElementSibling;
        if(jugadorAnterior !==null){
            const posicion = Array.from(listaJugadores.children)
            .indexOf(nuevoJugador);
            [jugadores[posicion-1], jugadores[posicion]]=
            [jugadores[posicion], jugadores[posicion-1]];
            listaJugadores.insertBefore(nuevoJugador, jugadorAnterior);
            console.log(jugadores);
        }
    })
    nuevoJugador.appendChild(textoNombre);
    nuevoJugador.appendChild(botonSubir);
    nuevoJugador.appendChild(botonEliminar);

    listaJugadores.appendChild(nuevoJugador);
    actualizarRegistro();

    nombreJugador.value = "";
});
function actualizarRegistro(){
    const cantidad = listaJugadores.children.length;
    if (cantidad === 1){
        contadorJugadores.textContent = "1 jugador";
    } else {
        contadorJugadores.textContent = cantidad + " jugadores";
    }
    siguienteRegistro.disabled = cantidad < 4;
    mensajeMinimo.hidden = cantidad >=4;
}
actualizarRegistro();

siguienteRegistro.addEventListener("click", function(){
    if (jugadores.length >= 4){
        registro.hidden = true;
        formarEquipos.hidden = false;
    }
});
volverRegistro.addEventListener("click", function(){
    formarEquipos.hidden = true;
    registro.hidden = false;
})
function generarEquipos(cantidadEquipos){
    const equipos = [];
    for (let i = 0; i < cantidadEquipos; i++){
        equipos.push([]);
    }
    for(let i = 0; i < jugadores.length; i++) {
        const numeroEquipo = i % cantidadEquipos;
        equipos[numeroEquipo].push(jugadores[i]);
    }
    console.log(equipos);
    return equipos;
}
function mostrarEquipos(equipos){
    resultadoEquipos.innerHTML="";
    for (let i = 0; i < equipos.length; i++) {
        const contenedorEquipo = document.createElement("div");
        contenedorEquipo.classList.add("equipo");
        const tituloEquipo = document.createElement("h3");
        tituloEquipo.textContent = "Equipo " + (i + 1);

        const listaEquipo = document.createElement("ul");
        for (let j = 0; j < equipos[i].length; j++){
            const jugador = document.createElement("li");
            const nombre = document.createElement("span");
            nombre.textContent = equipos [i][j];

            const botonMover = document.createElement("button");
            if (i === 0) {
                botonMover.textContent = "→";
            } else {
                botonMover.textContent = "←";
            }
            botonMover.classList.add("boton-mover");

            botonMover.addEventListener("click", function(){
                moverJugador(i, j);
            });
            if (i === 0) {
                jugador.appendChild(nombre);
                jugador.appendChild(botonMover);
            } else {
                jugador.appendChild(botonMover);
                jugador.appendChild(nombre);
            }
            listaEquipo.appendChild(jugador);
        }

        contenedorEquipo.appendChild(tituloEquipo);
        contenedorEquipo.appendChild(listaEquipo);

        resultadoEquipos.appendChild(contenedorEquipo);
        }
}
dosEquipos.addEventListener("click", function(){
    equiposActuales = generarEquipos(2);
    mostrarEquipos(equiposActuales);
});
tresEquipos.addEventListener("click", function() {
    equiposActuales = generarEquipos(3);
    mostrarEquipos(equiposActuales);
});

function moverJugador(equipoOrigen, posicionJugador) {

    if (equiposActuales[equipoOrigen].length <= 1){
        alert("El equipo debe tener al menos un jugador.");
    }

    // Identificar el siguiente equipo
    const equipoDestino = (equipoOrigen + 1) % equiposActuales.length;

    // Sacar al jugador de su equipo original
    const jugador = equiposActuales[equipoOrigen].splice(posicionJugador, 1)[0];

    // Agregarlo al equipo de destino
    equiposActuales[equipoDestino].push(jugador);

    // Actualizar los equipos en pantalla
    mostrarEquipos(equiposActuales);

    console.log(equiposActuales);
}
