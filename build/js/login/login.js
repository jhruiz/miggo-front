
var loginFunction = function() {  

    var email = $('#email').val();
    var password = $('#password').val();

    $.ajax({
        method: 'POST',
        url: url_back + 'login?',
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        data: { 
            email: email, password: password },
        success: function(respuesta) {

            console.log(respuesta);

            if (respuesta.data) {
                //Almacena la información del usuario en el local storage
                localStorage.setItem('email', respuesta.data.email);//TODO: guardar el nombre para mostrarlo en todas las paginas
                localStorage.setItem('id', respuesta.data.id);
                localStorage.setItem('nombres', respuesta.data.tercero.nombres);
                localStorage.setItem('empresa_id', respuesta.data.empresa_id);
                localStorage.setItem('empresa', respuesta.data.empresa.nombre);
                localStorage.setItem('msgpuc', respuesta.data.empresa.msgpuc);
                localStorage.setItem('moneda', respuesta.data.empresa.moneda);
                localStorage.setItem('nivelgasto', respuesta.data.empresa.nivelgasto);
                localStorage.setItem('sucursal', respuesta.data.empresa.empresa_id? respuesta.data.empresa.empresa_id : '');
                localStorage.setItem('access_token', respuesta.access_token);
                localStorage.setItem('date', new Date());            

                sweetMessage('success', 'login correcto'); 

                // window.location.href = window.location+'main/main.html';
                window.location.href =  url_front + 'main/main.html';
            } else {
                sweetMessage('warning', respuesta.message);
            }
            
        },
        error: function(data) {
            var mensaje = 'Se produjo un error. Por favor, inténtelo nuevamente'.
            sweetMessage('error', mensaje);
        }
      })
}

var enviarCorreo = function() {  
 
    url ='sendPasswordResetLink';
    var email = $('#forgot').val();

    $.ajax({
        method: 'POST',
        url: url_back + url,
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        data: { email: email },
        success: function(respuesta) {

            if (respuesta) {
                sweetMessage('success', 'Correo electrónico se envió con éxito'); 
                sweetMessage('success', 'verifique su bandeja de entrada.'); 
                window.location.href =  home;

            } else {
                sweetMessage('warning', respuesta.mensaje);
            }
            
        },
        error: function(data) {
            console.log(data);
            var mensaje = 'Se produjo un error. Por favor, inténtelo nuevamente'.
            sweetMessage('error', mensaje);
        }
      })


}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


var cambioPassword = function () {

     var token = getParameterByName('token');
     var email = $('#email').val();
     var password = $('#password').val();
     var passwordConfirm = $('#password-confirm').val();
     var url = 'resetPassword';

    //  console.log('token'+token+' '+email+' '+password+' '+passwordConfirm);

     $.ajax({
        method: 'POST',
        url: url_back + url,
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        data: { resetToken: token, email: email, password: password, password_confirmation: passwordConfirm  },
        success: function(respuesta) {

            if (respuesta) {
                console.log(respuesta.data)
                sweetMessage('success', 'La contraseña ha sido actualizada'); 
                window.location.href =  home;

            } else {
                sweetMessage('warning', respuesta.mensaje);
            }
            
        },
        error: function(data) {
            var mensaje = 'Se produjo un error. Por favor, inténtelo nuevamente'.
            sweetMessage('error', mensaje);
        }
      })



}

$( document ).ready(function() {
    localStorage.clear();
    $('#make-login').click(loginFunction);
    $('#make-forgot').click(enviarCorreo);
    $('#make-recover').click(cambioPassword);

});