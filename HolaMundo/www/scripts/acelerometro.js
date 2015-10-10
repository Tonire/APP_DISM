// Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);
//si = 0;
// Cordova is ready
//
var debug = false;
var headerText = "Debug";
function onDeviceReady() {
    var header = document.getElementById('header-page');
    headerText = header.innerHTML;
    //navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
    var options = { frequency: 40 };  // Update every x seconds

    var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    
    var onShake = function () {
        // Fired when a shake is detected
        if (debug == true) {
            debug = false;
        } else {
            debug = true;
        }
        
    };

    shake.startWatch(onShake, 30);
}

// onSuccess: Get a snapshot of the current acceleration
//
function onSuccess(acceleration) {
   /* console.log('Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: ' + acceleration.timestamp + '\n');*/

    if (window.event) { // IE fix
        event = window.event;
    }

    // Grab the mouse's X-position.
    var x = parseInt(acceleration.x);
    var y = parseInt(acceleration.y);
    var main = document.getElementById('main');
    var header = document.getElementById('header-page');
    if ((Math.abs(acceleration.x)*10> 2|| Math.abs(acceleration.y)*10 > 2)) {
        
        //var mousex = event.clientX;
        // if (si == 20) {
        if (debug == true) {
            header.innerHTML = " Datos del acelerometro: <br> X: " + acceleration.x + " Y: " + acceleration.y + "<br> " + "Posición del background: <br>" + ((-100) + (-x*2)) + "px " + ((-100) + (y*2)) + "px" ;
        } else {
            header.innerHTML = headerText;
        }
        

        main.style.backgroundPosition = ((-100) + (-x*2)) + 'px ' + ((-100) + (y *2)) + 'px';
           // si = 0;
        //}
        
    }
    //si++;
    
}

// onError: Failed to get the acceleration
//
function onError() {
    alert('onError!');
}
