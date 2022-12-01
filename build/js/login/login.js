var url_api = 'http://localhost:85/miggo-accountant-back/public/api/login?';

//window.CSRF_TOKEN = '{{ csrf_token() }}';

var loginFunction = function() {  

    var email = $('#email').val();
    var password = $('#password').val();

   // alert(email+' '+password);
    $.ajax({
        method: 'POST',
        url: url_api,
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        data: { 
            email: email, password: password },
        success: function(respuesta) {
           // alert(' exitosamente !!!');
           // console.log(respuesta.data);
            if (respuesta) {

                //Almacena la información del usuario en el local storage
                localStorage.setItem('email', respuesta.data.email);
                localStorage.setItem('id', respuesta.data.id);
                localStorage.setItem('access_token', respuesta.access_token);
                localStorage.setItem('date', new Date());            

                //alert(localStorage.email);
                //alert(localStorage.getItem(email)); null

                sweetMessage('success', 'login correcto'); //TODO:revisar funcion sweetmessage
                //window.location.href = window.location + 'pages/main/main.html';
                window.location.href = window.location+'pages/main/main.html';
            } else {
                sweetMessage('warning', respuesta.mensaje);
            }
            
        },
        error: function(data) {
            var mensaje = 'Se produjo un error. Por favor, inténtelo nuevamente'.
            sweetMessage('error', mensaje);
            console.log(data.responseText);
        }
      })
}

$( document ).ready(function() {
    localStorage.clear();
    $('#make-login').click(loginFunction);
});