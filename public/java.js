//Ventana principal/ inicio scroll 
window.addEventListener('scroll', function() {
    var parrafoInicio = document.querySelector('.parrafo_inicio');
    var posicionDesdeArriba = parrafoInicio.getBoundingClientRect().top;
    var tamañoDePantalla = window.innerHeight / 1.3; // Ajusta este valor según necesites

    if (posicionDesdeArriba < tamañoDePantalla) {
        parrafoInicio.classList.add('animar-scroll');
    }
});

// FORMULARIO 
const miFormulario = document.querySelector ("#formulario");

miFormulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const nombreInput = document.querySelector('#nombreInput');
    const emailInput = document.querySelector('#emailInput');
    const optionsInput = document.querySelector('#optionsInput')

    const mensaje = {
        nombre: nombreInput.value,
        email: emailInput.value,
        opcion: optionsInput.value
    }
    fetch('https://luxana-isp-default-rtdb.firebaseio.com/correo.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mensaje)
    }).then((respuesta) => {
        return respuesta.json(); 
    }).then((dataFinal) => {
        console.log('Datos guardados:', dataFinal);
        alert('¡Suscripción exitosa! Gracias por unirte a nosotros.');
        miFormulario.reset();
    });
    
});

// Metodo Crud 

const urlJuegosDeMesa = "https://prueba-f77e.restdb.io/rest/jdmweb?apikey=0a088a25d849efa20181322f4ad03c27334b1"; 

const appJuegos = {
    listarJuegos: () => {
        const contenedor = document.getElementById ("contenedorJuegos"); 

        let contenidoHTML = "";
        
        fetch(urlJuegosDeMesa).then(respuesta => respuesta.json()).then(jdm => {
            console.log(jdm);
            for (const juegosdm of jdm) {
                contenidoHTML += `
                <div class="row">
                <div class="col">
                    <div class="card" id="card-ma">
                    <img src="${juegosdm.imgUrl}" class="card-img-top" id="card-im">
                        <div class=""card-body" id="card-bdys"> 
                            <h5 class="card-title">Nombre del Juego: ${juegosdm.nombreDelJuego}</h5>
                            <h8 class="card-text">Cantidad de Jugadores: ${juegosdm.cantidadDeJugadores}</8>
                            <h9 class="card-text"> Tiempo de Juego: ${juegosdm.tiempoDeJuego}</9>
                            <br>
                            class=
                            <a href="#" onclick="appJuegos.eliminarJuegos('${juegosdm._id}','${juegosdm.de}')">Eliminar</a>
                            <a href="#" onclick="appJuegos.editarJuegos('${juegosdm._id}')">Editar</a>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
            `
            }
        })
    }
}






