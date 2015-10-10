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
            addMarkerLectura(lecturas[fila].latitud, lecturas[fila].longitud);
            $('#id').val(lecturas[fila].idIndividuo);
            $('#id').prop("disabled", true);
            $('#esta').val(lecturas[fila].idLector);
            $('#lat').val(lecturas[fila].latitud);
            $('#long').val(lecturas[fila].longitud);
            $('#fech').val(lecturas[fila].fechaHora);
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
                limpiaTablaEstaciones();
                modificaLectura(lecturas[fila]);
                marker.setMap(null);
            } else {
                if (contador == 0) {
                    sweetAlert("Oops...", "Debes seleccionar al menos una lectura!", "error");
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
                limpiaTablaEstaciones();
                addLectura();
                marker.setMap(null);
                $('#adding').attr("id", "editar");
                add = false;
            }
        } else {
            if (contador == 0) {
                sweetAlert("Oops...", "Debes seleccionar al menos una lectura!", "error");
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
        addMarkerLectura(38.385242, -0.513235);
        $('#id').attr("placeholder", "ID de la lectura");
        $('#esta').attr("placeholder", "Estación asociada");
        $('#fech').attr("placeholder","Fecha/Hora");
        $('#lat').attr("placeholder", "Latitud");
        $('#long').attr("placeholder", "Longitud");
        $('#fech').val('');
        $('#esta').val('');
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
            eliminaLectura(lecturas[i].idIndividuo);
            contador++;
        }
    });
    if (contador != 0) {
        cargaTodo("Lecturas", false, true);
    } else {
        sweetAlert("Oops...", "Debes seleccionar al menos una lectura!", "error");
    }
});


function eliminaLectura(num) {
    if (dataBase != null) {
        var active = dataBase.result;
        var data = active.transaction(["Lecturas"], "readwrite");

        var oEstaciones = data.objectStore("Lecturas");

        oEstaciones.delete(num);
        data.oncomplete = function (e) {
            console.log("Lectura borrada correctamente!!!");
        }
    }
}


function addMarkerLectura(latitud, longitud) {

    var posicion = new google.maps.LatLng(latitud, longitud);
    var ico = 'images/mobile-phones.png';
    marker = new google.maps.Marker({
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

function modificaLectura(lect) {
    if (dataBase != null) {

        var active = dataBase.result;
        var data = active.transaction(["Lecturas"], "readwrite");

        var oLecturas = data.objectStore("Lecturas");
        oLecturas.onerror = function (e) {
            alert("error " + e);
        }
        lect.idIndividuo = $('#id').val();
        lect.idLector = $('#esta').val();
        lect.fechaHora = $('#fech').val();
        lect.latitud = parseFloat($('#lat').val());
        lect.longitud = parseFloat($('#long').val());
        oLecturas.put(lect);
        
        data.oncomplete = function (e) {
            console.log("Objetos modificados correctamente!!!");
            cargaTodo("Lecturas", false, true);
        };
    }
}

function limpiaTablaEstaciones() {
    $('#tablaLecturas tbody tr').remove();
}

function addLectura() {
    if (dataBase != null) {
        if ($('#id').val() != null && $('#lat').val() != null && $('#long').val() != null) {
            var active = dataBase.result;
            var data = active.transaction(["Lecturas"], "readwrite");

            var oLecturas = data.objectStore("Lecturas");
            oLecturas.put({
                idIndividuo: $('#id').val(),
                idLector: $('#esta').val(),
                fechaHora: $('#fech').val(),
                latitud: $('#lat').val(),
                longitud: $('#long').val()
            });
            data.oncomplete = function (e) {
                console.log("Objetos agregados correctamente!!!");
                cargaTodo("Lecturas", false, true);
                //alert('Objeto agregado correctamente');
            };
        } else {
            cargaTodo("Lecturas", false, true);
            sweetAlert('Oops', 'Debe rellenar todos los campos. Error irrecuperable', "error");
        }
    }
}