var map = null
var marcadoresLecturas = [];
var infos = [];
var infLectura = [];

/* initMap inicializa el mapa. Cuando termina comprueba si estamos utilizando la API REST con checkCoockie() y decide a qué método llamar
* si estamos usando la API REST llama a getDataFromApiRest(), a startDB si es de otra forma.
*/
function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: { lat: 38.385088, lng: -0.512985 }

    });
    directionsDisplay.setMap(map);

    var onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };

    $("#Inicio").change(onChangeHandler);
    $("#Fin").change(onChangeHandler);

    if (checkCookie() == false) {
        startDB(true);
    } else {
        getDataFromApiRest(true);
        
    }
        
}
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: $("#Inicio").val() ,
        destination: $("#Fin").val(),
        travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            console.log("No se puede calcular la ruta: " + status);
        }
    });
}
/* dibujaMarcadores se encarga de recorrer el array que se le pasa como primer parámetro y el tipo de elemento que se está dibujando
* @params Array elementos, String titulo
* A cada marcador de cada estación se le establece un listener (onClickListener, intrínseco de javascript) para que aparezcan sus 
* lecturas asociadas.
*/
function dibujaMarcadores(elementos,titulo) {
    var i = 0;
    infos = [];
    var marcadores = [];
    
    
    var ico = 'images/home-services.png';
    if (elementos != null  /*map != null*/) {
        for (i = 0; i < elementos.length; i++) {
            if (elementos[i] != null) {
                var posicion = new google.maps.LatLng(parseFloat(elementos[i].latitud), parseFloat(elementos[i].longitud));
                if (titulo.localeCompare("EstacionesLectoras") == 0) {
                    var strContent = crearContenido(elementos[i],"EstacionesLectoras");
                    var inf = new google.maps.InfoWindow({
                        content: strContent
                    });
                    infos.push(inf);
                    marcadores[i] = new google.maps.Marker({
                        map: map,
                        position: posicion,
                        title: "Estación lectora: " + elementos[i].idEstacion,
                        animation: google.maps.Animation.DROP,
                        icon: ico
                    });
                }
            }

            google.maps.event.addListener(marcadores[i], 'click', function (innerKey) {
                var j = 0;
                marcadoresLecturas = [];
                infLectura = [];
                return function () {
                    //marcadoresLecturas = [];
                    infLectura = [];
                    closeInfos(infos);
                    quitaMarcadores();
                    var offset = 0;
                    zoom(marcadores[innerKey]);
                    var lecturas = getLecturas();
                    
                    for (j = 0; j < lecturas.length; j++) {
                        if (lecturas[j].idLector.localeCompare(elementos[innerKey].idEstacion) == 0) {
                            var posicion = new google.maps.LatLng(parseFloat(lecturas[j].latitud), parseFloat(lecturas[j].longitud));
                            var strcnt = crearContenido(lecturas[j],"Lectura");
                            var inf = new google.maps.InfoWindow({
                                content: strcnt
                            });
                            infLectura.push(inf);
                            marcadorLectura(posicion, lecturas[j].idIndividuo, offset, "images/mobile-phones.png");
                            offset++;
                        }
                    }
                    setTimeout(function () {
                        infos[innerKey].open(map, marcadores[innerKey]);
                    },offset * 300);
                }
            }(i));
        }
    } else {
        console.error("No me llegan elementos");
    }
    
}

/* Método auxiliar para cerrar todas las ventanas de información y que no se superpongan. De esta manera queda una interfaz mucho más limpia.
* @params Array informaciones
* Se le pasa por parámetros el array con todas las ventanas de informaciones. Se recorren y se cierran.
*/
function closeInfos(informaciones) {
    var i = 0;
    for (i = 0; i < informaciones.length; i++) {
        informaciones[i].close();
    }
}
/* Método encargado de pintar en el mapa los marcadores de lecturas. Éste método es invocado al pinchar en un marcador. */
function marcadorLectura(posicion, titulo,j,ico) {
    var mark;
    setTimeout(function () {
        mark = new google.maps.Marker({
            map: map,
            position: posicion,
            title: "Lectura: " + titulo,
            animation: google.maps.Animation.BOUNCE,
            icon: ico
        });

        marcadoresLecturas.push(mark);
        google.maps.event.addListener(marcadoresLecturas[j], 'click', function (inKey) {
            var k = 0;
            return function () {
                closeInfos(infos);
                closeInfos(infLectura);
                infLectura[inKey].open(map, marcadoresLecturas[inKey]);

            }
        }(j));
        setTimeout(function () {
            mark.setAnimation(null);
        },750);
        
    }, j * 200);
    
}
/* Método auxiliar para quitar marcadores del mapa (En este caso está hardcodeado para quitar los marcadores de lecturas */
function quitaMarcadores() {
    var i = 0;
    if (marcadoresLecturas != null) {
        for (i = 0; i < marcadoresLecturas.length; i++) {
            marcadoresLecturas[i].setMap(null);
        }
    }
    marcadoresLecturas = [];
}
/* Método auxiliar para hacer zoom a un marcador cuando se pinche sobre él */
function zoom(marcador){
    map.setCenter(marcador.position);
    if (map.getZoom() < 17) {
        map.setZoom(17);
    }
}
/* crearContenido se encarga de hacer el html de las infoWindows que aparecen al pinchar sobre los distintos marcadores
* @params Array elemento, String tipo
* @reutrn str
* El return es una cadena de html con el texto de la infoWindow
*/
function crearContenido(elemento,tipo) {
    var str;
   // var background = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + elemento.latitud + ',' + elemento.longitud + '&heading=151.78&pitch=-0.76&key=AIzaSyAppFMUDP76wmOz3ZHQBoPzmRTNIBAEEJw';
    //var background = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=AIzaSyAppFMUDP76wmOz3ZHQBoPzmRTNIBAEEJw';
    var cabecera;
    if (tipo.localeCompare("EstacionesLectoras") == 0) {
        cabecera = "Estación Lectora " + elemento.idEstacion;
    } else {
        cabecera = "Lectura " + elemento.idIndividuo;
    }
    str = '<div>' +
         '<h5>' + cabecera + '</h5>'+
         '<p>Posición: '+ elemento.latitud+', '+elemento.longitud+'</p>'+
         '</div>';
    return str;
}


