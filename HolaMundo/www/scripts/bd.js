
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var dataBase = null;
var agregar = false;
var estaciones = [];
var lecturas = [];

/** Método principal de IdexedDB 
* @param boolean meterDatos
* Si es true, se lanzará el método encargado de meter datos a la base de datos
*/
function startDB(meterDatos) {
    /*var req = indexedDB.deleteDatabase("monitor");
    req.onsuccess = function () {
        console.log("Deleted database successfully");
    };
    req.onerror = function () {
        console.log("Couldn't delete database");
    };
    req.onblocked = function () {
        console.log("Couldn't delete database due to the operation being blocked");
    };
    agregar = true;*/
    dataBase = indexedDB.open("monitor", 1);
 
    dataBase.onupgradeneeded = function (e) {
        active = dataBase.result;
        object = active.createObjectStore("EstacionesLectoras", { keyPath : 'idEstacion', autoIncrement : false });
        object.createIndex('by_longitud', 'longitud', { unique : false });
        object.createIndex('by_latitud', 'latitud', { unique: false });

        object2 = active.createObjectStore("Lecturas", { keyPath: 'idIndividuo', autoIncrement: false });
        object2.createIndex('by_idLector', 'idLector', { unique: false });
        object2.createIndex('by_fechaHora', 'fechaHora', { unique: false });
        object2.createIndex('by_longitud', 'longitud', { unique: false });
        object2.createIndex('by_latitud', 'latitud', { unique: false });
        agregar = true;
    };

    dataBase.onsuccess = function (e) {
       // alert('Base de datos cargada correctamente ' + agregar);
        console.log("Base de datos cargada correctamente!!!! " + agregar);
        
        if (meterDatos == true) {
            if (agregar == true) {
                add();
            } else {
                cargaTodo("EstacionesLectoras", true, false);
                cargaTodo("Lecturas", false, false);
            }
                
        } else {
            
        }
    };
        
    dataBase.onerror = function (e)  {
        alert('Error cargando la base de datos');
    };

}
/** Método encargado de introducir a mano estaciones y lecturas a IndexedDB
* Cuando se termina de añadir se llama el método cargaTodo, encargado de
* rellenar los dos arrays de estaciones y lecturas.
*/
function add() {
    var active = dataBase.result;
    var data = active.transaction(["EstacionesLectoras","Lecturas"], "readwrite");
    var oEstaciones = data.objectStore("EstacionesLectoras");
    var oLecturas = data.objectStore("Lecturas");

    oEstaciones.add({
        idEstacion: "1",
        latitud: "38.384360",
        longitud: "-0.510633"
    });
    oEstaciones.add({
        idEstacion: "2",
        latitud: "38.386483",
        longitud: "-0.511287"
    });
    oEstaciones.add({
        idEstacion: "3",
        latitud: "38.385545",
        longitud: "-0.513047"
    });

    oEstaciones.add({
        idEstacion: "4",
        latitud: "38.383623",
        longitud: "-0.512296"
    });
    oEstaciones.add({
        idEstacion: "5",
        latitud: "38.383291",
        longitud: "-0.510161"
    });

    oLecturas.add({
        idIndividuo: "ind01",
        idLector: "5",
        fechaHora: new Date().toString(),
        latitud: "38.383439",
        longitud: "-0.509599"

    });
    oLecturas.add({
        idIndividuo: "ind02",
        idLector: "5",
        fechaHora: new Date().toString(),
        latitud: "38.383436",
        longitud: "-0.510628"
    });
    oLecturas.add({
        idIndividuo: "ind03",
        idLector: "5",
        fechaHora: new Date().toString(),
        latitud: "38.383198",
        longitud: "-0.509223"
    });
    oLecturas.add({
        idIndividuo: "ind04",
        idLector: "4",
        fechaHora: new Date().toString(),
        latitud: "38.383936",
        longitud: "-0.512591"
    });
    oLecturas.add({
        idIndividuo: "ind05",
        idLector: "4",
        fechaHora: new Date().toString(),
        latitud: "38.383978",
        longitud: "-0.511797"
    });
    oLecturas.add({
        idIndividuo: "ind06",
        idLector: "4",
        fechaHora: new Date().toString(),
        latitud: "38.383760",
        longitud: "-0.511727"
    });
    oLecturas.add({
        idIndividuo: "ind07",
        idLector: "3",
        fechaHora: new Date().toString(),
        latitud: "38.385459",
        longitud: "-0.512908"
    });
    oLecturas.add({
        idIndividuo: "ind08",
        idLector: "3",
        fechaHora: new Date().toString(),
        latitud: "38.385497",
        longitud: "-0.513610"
    });
    oLecturas.add({
        idIndividuo: "ind09",
        idLector: "2",
        fechaHora: new Date().toString(),
        latitud: "38.386149",
        longitud: "-0.511287"
    });
    oLecturas.add({
        idIndividuo: "ind10",
        idLector: "2",
        fechaHora: new Date().toString(),
        latitud: "38.387007",
        longitud: "-0.511126"
    });
    oLecturas.add({
        idIndividuo: "ind11",
        idLector: "2",
        fechaHora: new Date().toString(),
        latitud: "38.386203",
        longitud: "-0.511266"
    });
    oLecturas.add({
        idIndividuo: "ind12",
        idLector: "2",
        fechaHora: new Date().toString(),
        latitud: "38.386649",
        longitud: "-0.511856"
    });
    oLecturas.add({
        idIndividuo: "ind13",
        idLector: "1",
        fechaHora: new Date().toString(),
        latitud: "38.384215",
        longitud: "-0.511259"
    });
    oLecturas.add({
        idIndividuo: "ind14",
        idLector: "1",
        fechaHora: new Date().toString(),
        latitud: "38.384617",
        longitud: "-0.510765"
    });
    oLecturas.add({
        idIndividuo: "ind15",
        idLector: "1",
        fechaHora: new Date().toString(),
        latitud: "38.384105",
        longitud: "-0.510423"
    });
    oLecturas.add({
        idIndividuo: "ind16",
        idLector: "1",
        fechaHora: new Date().toString(),
        latitud: "38.384587",
        longitud: "-0.509973"
    });

    data.oncomplete = function (e) {
        console.log("Objetos agregados correctamente!!!");
        cargaTodo("EstacionesLectoras",true,false);
        cargaTodo("Lecturas",false,false);
    };
    var si=true
    data.onerror = function (a) {
        if (si == true) {
            console.log("No se han cargado objetos. Cargando de todas maneras");
            cargaTodo("EstacionesLectoras", true, false);
            cargaTodo("Lecturas", false, false);
            si = false;
        }
        
    };

}
/** cargaTodo rellena los arrays de estaciones y lecturas. Estos arrays deben estar llenos, pues son el corazón de la aplicación
* @params String tabla, boolean pintar, boolean html
* tabla debe ser igual a la tabla que se quiere cargar de la base de datos
* pintar debe ser true si se quiere pintar en el mapa los marcadores una vez cargados.
* html debe ser true si se quiere escribir la tabla en el html después de cargar los datos.
*/
function cargaTodo(tabla,pintar,html) {
    
    if (dataBase != null) {
        
        var active = dataBase.result;
        var data = active.transaction(["EstacionesLectoras", "Lecturas"], "readonly");

        var oEstaciones = data.objectStore("EstacionesLectoras");
        var oLecturas = data.objectStore("Lecturas");

        
        if (tabla.localeCompare("EstacionesLectoras") == 0) {
            estaciones = [];
            oEstaciones.openCursor().onsuccess = function (objeto) {
                
                var resultado = objeto.target.result;

                if (resultado != null) {
                    estaciones.push(resultado.value);
                    resultado.continue();
                } else {
                    return;
                }
            };
        } else {
            lecturas = [];
            oLecturas.openCursor().onsuccess = function (objeto) {
                
                var resultado = objeto.target.result;

                if (resultado != null) {
                    lecturas.push(resultado.value);
                    resultado.continue();
                } else {
                    return;
                }
            };
        }
        data.oncomplete = function () {
            if (tabla.localeCompare("EstacionesLectoras") == 0) {
                if (pintar == true) {
                    console.log("Carga completa!!! Pintando marcadores....");
                    dibujaMarcadores(estaciones, tabla);
                }
                if (html == true) {
                    generateHtml(tabla);
                }
                
            } else {
                if (pintar == true) {
                    console.log("Carga completa!!! Pintando marcadores....");
                    dibujaMarcadores(lecturas, tabla);
                }
                if (html == true) {
                    generateHtml(tabla);
                }
            }
        };
    }

}
/* getLecturas simplemente retorna el array de lecturas.
* este método es llamado desde el mapa para pintar las lecturas.
*/
function getLecturas() {
    return lecturas;
}

/* Método auxiliar para imprimir la tabla de las estaciones en el html */
function printEstaciones() {
    if (dataBase != null) {
        dataBase.onsuccess = function (e) {
            cargaTodo("EstacionesLectoras",false,true);
        }
    }
}
/* limpiaTabla borra la tabla html */
function limpiaTabla() {
    $('#tablaEstaciones tbody tr').remove();
}

/* generateHtml se encarga de recorrer el array de estaciones o lecturas y escribe una tabla html con todo el contenido de los objetos
* @params String tabla
* tabla debe ser igual a la tabla que queremos imprimir. En nuestro caso, EstacionesLectoras o Lecturas.
*/
function generateHtml(tabla) {
    
    var html = '';
    if (tabla.localeCompare("EstacionesLectoras") == 0) {
        limpiaTabla();
        for (var i = 0; i < estaciones.length; i++) {
            html = html + '<tr><td><input type="checkbox"></td><th scope="row">' + estaciones[i].idEstacion + '</th><td>' + estaciones[i].latitud + '</td><td>' + estaciones[i].longitud + '</td></tr>';
        }
        $('#tablaEstaciones tbody').append(html);

        var offset = 0;
        $("#tablaEstaciones tbody tr").each(function (fila, obj) {
            offset++;
            setTimeout(function () {
                fade(obj);
            }, 150 * offset, obj);
        });
    } else {
        limpiaTablaEstaciones();
        for (var i = 0; i < lecturas.length; i++) {
            html = html + '<tr><td><input type="checkbox"></td><th scope="row">' + lecturas[i].idIndividuo + '</th><td>' + lecturas[i].idLector + '</td><td>' + lecturas[i].latitud + '</td><td>' + lecturas[i].longitud + '</td><td>' +$.format.date(lecturas[i].fechaHora, 'dd/mm/yy') + '</td></tr>';
        }
        $('#tablaLecturas tbody').append(html);

        var offset = 0;
        $("#tablaLecturas tbody tr").each(function (fila, obj) {
            offset++;
            setTimeout(function () {
                fade(obj);
            }, 150 * offset, obj);
        });
    }
    
    
    
}
/* fade es un método auxilir para añadir un pequeño efecto 'fade' a cada fila de la tabla
* @params Object objeto
* objeto es la fila (o parte del html) a la que le queremos aplicar el efecto.
* Para darle un pequeño offset, este método es llamado desde dentro del bucle para generar el html
* utilizando la función intrínseca de javascript setTimeout (veanse las líneas 348 y 334)
*/
function fade(objeto) {
    $(objeto).addClass("load");
}

function printLecturas() {
    if (dataBase != null) {
        dataBase.onsuccess = function (e) {
            cargaTodo("Lecturas", false, true);
        }
    }
}

/* getDataFromApiRest se encarga de obtener toda la información desde la API REST, y rellena los arrays principales (que son prioridad)
* @params boolean mapa, String tabla
* mapa será true si queremos poner los marcadores directamente en el mapa
* tabla debe ser igual a la tabla que queremos obtener (aunque aquí está 'hardcodeado' para obtener primero las estaciones y luego las lecturas)
*/
function getDataFromApiRest(mapa,tabla) {
    estaciones = [];
    lecturas = [];

    $.getJSON("http://localhost:3000/estaciones", function (data) {
        
        $.each(data, function (key, val) {
            estaciones.push(val);
        });
        cargaLecturasFromApiRest(mapa,tabla);
    });
    
}

/* Ídem a getDataFormApiRest pero carga las lecturas */
function cargaLecturasFromApiRest(mapa,tabla) {
    $.getJSON("http://localhost:3000/lecturas", function (data) {

        $.each(data, function (key, val) {
            lecturas.push(val);
        });
        if (mapa) {
            printMarkersFromApiRest();
        } else {
            generateHtml(tabla);
        }
    });
}


/* dibuja los marcadores una vez cargados los datos desde la API REST */
function printMarkersFromApiRest() {
    dibujaMarcadores(estaciones, "EstacionesLectoras");
}