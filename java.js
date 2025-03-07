
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
        
        //tomamos la referencia del contenedor donde se mostarran los cancions
        const contenedor = document.getElementById ("contenedorJuegos"); 

        //creamos una variable vacia que contendrá todo el codigo HTML que vamos a insertar
        let contenidoHTML = "";
        
        fetch(urlJuegosDeMesa).then(respuesta => respuesta.json()).then(jdm => {
            console.log(jdm);
            for (const juegosdm of jdm) {
                contenidoHTML += `
                <div class="row">
                <div class="col">
                    <div class="card" id="card-ma">
                    <img src="${juegosdm.ImgUrl}" class="card-img-top" id="card-im">
                        <div class=""card-body" id="card-bdys"> 
                            <h5 class="card-title">Nombre del Juego: ${juegosdm.NombreDelJuego}</h5>
                            <h8 class="card-text">Cantidad de Jugadores: ${juegosdm.CantidadDeJugadores}</8>
                            <h9 class="card-text"> Tiempo de Juego: ${juegosdm.TiempoDeJuego}</9>
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
            //se inserta el bloque de contenido generado en la variable contenedor.
            contenedor.innerHTML=contenidoHTML;
        })
    },
    
    //Este método agrega un juego a la web y base de datos 

    agregarJuego: () => {

        // Se obtienen los valores del campo del formulario 

        const txtId=document.getElementsById("txtId");
        const txtNombreDelJuego=document.getElementsById("txtNombreDelJuego");
        const txtCantidadDeJugadores=document.getElementsById("txtCantidadDeJugadores");
        const txtTiempoDeJuego=document.getElementsById("txtTiempoDeJuego")
        const txtImgUrl=document.getElementsById("txtImgUrl");
        
        let urlApi=''; // Inicialización del URL
        let metodoHttp=''; //inicializacion de  Metodo Http

        if (txtId.value==''){
            urlApi= "https://prueba-f77e.restdb.io/rest/jdmweb?apikey=0a088a25d849efa20181322f4ad03c27334b1";

            metodoHttp='POST';
        }
        // El objeto contiene los datos extraidos en el formulario 
        const juegoAGuardar = {
            "juego": txtNombreDelJuego.value,
            "cantidad": txtCantidadDeJugadores.value,
            "tiempo": txtTiempoDeJuego.value,
            "portada": txtImgUrl.value,
        }
        
        //Se envia una solicitud fecht a la API para guardar el juego 
        fetch(urlApi, {
            method: metodoHttp, // como la id esta vacia el metodo es POST
            headers: {
              'Content-Type': 'application/json' // se especifica que el contenido enviado es JSON
            },
            body: JSON.stringify(juegoAGuardarAGuardar) 
        })
        //cuando la solicitud es exitosa se imprime en la respuesta
        .then(response => {
            console.log(response);
            window.location.href="club.html"; // y redirecciona a la misma pagina 
        });

    }

}
appJuegos.listarJuegos()
