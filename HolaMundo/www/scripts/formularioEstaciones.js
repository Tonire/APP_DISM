var marker = null;
var add = false;
$('#editar').click(function () {
    var contador = 0;
    var fila;
    $('input[type=checkbox]').each(function (i) {
        if ($(this).is(":checked")) {
            fila = i;
            contador++;
        }
    });
    if (contador == 1) {
        if (($('#editar').attr("value").localeCompare("EDITAR") == 0)) {
            $('#formu').removeClass('oculto');
            google.maps.event.trigger(map, "resize");
            addMarkerEstacion(estaciones[fila].latitud, estaciones[fila].longitud);
            $('#id').val(estaciones[fila].idEstacion);
            $('#id').prop("disabled", true);
            $('#lat').val(estaciones[fila].latitud);
            $('#long').val(estaciones[fila].longitud);
            $('#editar').removeClass('btn-primary');
            $('#editar').addClass('btn-success');
            $('#editar').val("FINALIZAR");
        } else {
            if ($('#editar').attr("value").localeCompare("FINALIZAR") == 0) {
                $('#editar').addClass('btn-primary');
                $('#editar').removeClass('btn-success');
                $('#editar').val("EDITAR");
                $('#formu').addClass('oculto');

                //Aqui actualizar los datos
                limpiaTabla();
                if (checkCookie() == false) {
                    modificaEstacion(estaciones[fila]);
                } else {
                    modificaEstacionApiRest(estaciones[fila]);
                }
                marker.setMap(null);
            } else {
                if (contador == 0) {
                    sweetAlert("Oops...", "Debes seleccionar al menos una estación!", "error");
                }
            }

        }
    } else {
        if (add == true) {
            if ($('#adding').attr("value").localeCompare("FINALIZAR") == 0) {
                $('#adding').addClass('btn-primary');
                $('#adding').removeClass('btn-success');
                $('#adding').val("EDITAR");
                $('#formu').addClass('oculto');

                //Aqui actualizar los datos
                limpiaTabla();
                if (checkCookie() == false) {
                    addEstacion();
                } else {
                    addEstacionApiRest();
                }
                marker.setMap(null);
                $('#adding').attr("id", "editar");
                add = false;
            }
        } else {
            if (contador == 0) {
                sweetAlert("Oops...", "Debes seleccionar al menos una estación!", "error");
            }
        }
    }
    
});

$('#add').click(function () {
    var contador = 0;
    $('#editar').attr("id", "adding");
    if (($('#adding').attr("value").localeCompare("EDITAR") == 0)) {
        $('#formu').removeClass('oculto');
        google.maps.event.trigger(map, "resize");
        addMarkerEstacion(38.385242, -0.513235);
        $('#id').attr("placeholder", "ID de la estación");
        $('#lat').attr("placeholder", "Latitud de la estación");
        $('#long').attr("placeholder", "Longitud de la estación");
        $('#id').val('');
        $('#id').prop("disabled", false);
        $('#lat').val('');
        $('#long').val('');
        $('#adding').removeClass('btn-primary');
        $('#adding').addClass('btn-success');
        $('#adding').val("FINALIZAR");
        add = true;
    }
});

$('#eliminar').click(function () {
    var contador = 0;
    var fila;
    $('input[type=checkbox]').each(function (i) {
        if ($(this).is(":checked")) {
            limpiaTabla();
            if (checkCookie() == false) {
                eliminaEstacion(estaciones[i].idEstacion);
            } else {
                eliminaEstacionApiRest(estaciones[i].idEstacion);
            }
            contador++;
        }
    });
    if (contador != 0) {
        if (checkCookie() == false) {
            cargaTodo("EstacionesLectoras", false, true);
        } else {
            getDataFromApiRest(false,"EstacionesLectoras");
        }
        
    } else {
        sweetAlert("Oops...", "Debes seleccionar al menos una estación!", "error");
    }
});
function addMarkerEstacion(latitud, longitud) {
    
    var posicion = new google.maps.LatLng(latitud, longitud);
    var ico = 'images/home-services.png';
    marker = new  google.maps.Marker({
        map: map,
        position: posicion,
        animation: google.maps.Animation.DROP,
        icon: ico,
        draggable: true
    });
    map.setCenter(posicion);
    map.setZoom(15);
    google.maps.event.addListener(marker, 'drag', drag(marker));
}
function drag(marcador) {
    if (marcador != null) {
        $('#lat').val('');
        $('#lat').val(marcador.getPosition().lat().toString());
        $('#long').val('');
        $('#long').val(marcador.getPosition().lng().toString());
    }
    
}

$('#lat').change(function () {
    if (map != null) {
        if ($('#lat').val() != '' && $('#long').val() != '') {
            var posicion = new google.maps.LatLng(parseFloat($('#lat').val()), parseFloat($('#long').val()));
            map.setCenter(posicion);
            marker.setPosition(posicion);
        }
    }
});
$('#long').change(function () {
    if (map != null) {
        if ($('#lat').val() != '' && $('#long').val() != '') {
            var posicion = new google.maps.LatLng(parseFloat($('#lat').val()), parseFloat($('#long').val()));
            map.setCenter(posicion);
            marker.setPosition(posicion);
        }
        
    }
});

function modificaEstacion(estacion) {
    if (dataBase != null) {

            var active = dataBase.result;
            var data = active.transaction(["EstacionesLectoras"], "readwrite");

            var oEstaciones = data.objectStore("EstacionesLectoras");
            estacion.idEstacion = $('#id').val();
            estacion.latitud = parseFloat($('#lat').val());
            estacion.longitud = parseFloat($('#long').val());
            oEstaciones.put(estacion);

            data.oncomplete = function (e) {
                console.log("Objetos modificados correctamente!!!");
                cargaTodo("EstacionesLectoras", false, true);
            };
    }
}

function modificaEstacionApiRest(estacion) {
    estacion.idEstacion = $('#id').val();
    estacion.latitud = parseFloat($('#lat').val());
    estacion.longitud = parseFloat($('#long').val());
    $.ajax({
        url: 'http://localhost:3000/estaciones/' + estacion.idEstacion,
        data: estacion,
        type: 'PUT',
        success: function (response) {
            getDataFromApiRest(false, "EstacionesLectoras");
        }
    });
}

function eliminaEstacion(num) {
    if (dataBase != null) {
        var active = dataBase.result;
        var data = active.transaction(["EstacionesLectoras"], "readwrite");

        var oEstaciones = data.objectStore("EstacionesLectoras");

        oEstaciones.delete(num);
        data.oncomplete = function (e) {
            console.log("Estacion borrada correctamente!!!");
        }
    }
}
function eliminaEstacionApiRest(num) {
    $.ajax({
        url: 'http://localhost:3000/estaciones/' + num,
        type: 'DELETE',
        success: function (response) {
            //getDataFromApiRest(false, "EstacionesLectoras");
        }
    });
}

function addEstacion() {
    if (dataBase != null) {
        if ($('#id').val() != '' && $('#lat').val() != '' && $('#long').val() != '') {
            var active = dataBase.result;
            var data = active.transaction(["EstacionesLectoras"], "readwrite");

            var oEstaciones = data.objectStore("EstacionesLectoras");
            oEstaciones.put({
                idEstacion: $('#id').val(),
                latitud: $('#lat').val(),
                longitud: $('#long').val()
            });
            data.oncomplete = function (e) {
                console.log("Objetos agregados correctamente!!!");
                cargaTodo("EstacionesLectoras", false, true);
                //alert('Objeto agregado correctamente');
            };
        } else {
            cargaTodo("EstacionesLectoras", false, true);
            sweetAlert('Oops', 'Debe rellenar todos los campos. Error irrecuperable',"error");
        }
    }
}

function addEstacionApiRest() {
    if ($('#id').val() != '' && $('#lat').val() != '' && $('#long').val() != '') {
        var cadena = '{"idEstacion":"' + $('#id').val() + '" "latitud":"' + $('#lat').val()+ '" "longitud":"' + $('#long').val()+ '"}';
        //var obj = JSON.parse(cadena);
        var posting = $.post('http://localhost:3000/estaciones', { idEstacion: $('#id').val(), latitud: $('#lat').val(), longitud: $('#long').val() });
        posting.done(function (data) {
            getDataFromApiRest(false, "EstacionesLectoras");
        });
    } else {
        getDataFromApiRest(false, "EstacionesLectoras");
        sweetAlert('Oops', 'Debe rellenar todos los campos. Error irrecuperable', "error");
    }
}