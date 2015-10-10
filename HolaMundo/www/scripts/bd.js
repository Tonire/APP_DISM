
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var dataBase = null;
var agregar = false;
var estaciones = [];
var lecturas = [];

function startDB(meterDatos) {
   /* var req = indexedDB.deleteDatabase("monitor");
    req.onsuccess = function () {
        console.log("Deleted database successfully");
    };
    req.onerror = function () {
        console.log("Couldn't delete database");
    };
    req.onblocked = function () {
        console.log("Couldn't delete database due to the operation being blocked");
    };*/
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

    data.onsuccess = function (e) {
        console.log("Objetos agregados correctamente!!!");
        cargaTodo("EstacionesLectoras",true,false);
        cargaTodo("Lecturas",false,false);
        alert('Objeto agregado correctamente');
    };
    var si=true
    data.onerror = function (a) {
        if (si == true) {
            console.log("No se han cargado objetos. Cargando de todas maneras");
            cargaTodo("EstacionesLectoras", true, false);
            cargaTodo("Lecturas", false, false);
            //alert(a.toString());
            si = false;
        }
        
    };

}

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
            
            //alert("Carga completa!!!  " + elementos[0]);
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
    
    //return elementos;


}
function getLecturas() {
    return lecturas  
}

function printEstaciones() {
    if (dataBase != null) {
        dataBase.onsuccess = function (e) {
            cargaTodo("EstacionesLectoras",false,true);
        }
    }
}
function limpiaTabla() {
    $('#tablaEstaciones tbody tr').remove();
}
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
            html = html + '<tr><td><input type="checkbox"></td><th scope="row">' + lecturas[i].idIndividuo + '</th><td>' + lecturas[i].idLector + '</td><td>' + lecturas[i].latitud + '</td><td>' + lecturas[i].longitud + '</td><td>' + lecturas[i].fechaHora + '</td></tr>';
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