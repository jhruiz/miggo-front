
//window.CSRF_TOKEN = '{{ csrf_token() }}';

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

            if (respuesta) {

                //Almacena la información del usuario en el local storage
                localStorage.setItem('email', respuesta.data.email);
                localStorage.setItem('id', respuesta.data.id);
                localStorage.setItem('access_token', respuesta.access_token);
                localStorage.setItem('date', new Date());            

                sweetMessage('success', 'login correcto'); 

                window.location.href = window.location+'pages/main/main.html';
            } else {
                console.log('entra aqui');
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
});