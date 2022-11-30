var url_api = 'http://localhost/miggo-accountant-back/public/api/login?';

//window.CSRF_TOKEN = '{{ csrf_token() }}';

var loginFunction = function() {  

    var email = $('#email').val();
    var password = $('#password').val();

   // alert(email+' '+password);
   $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
    });
    $.ajax({
        method: 'POST',
        url: url_api,
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        data: { 
          //  "_token": $("meta[name='csrf-token']").attr("content"),
            email: email, password: password },
        success: function(respuesta) {

            alert(' exitosamente !!!');


            if ( respuesta.estado ) {

                //Almacena la información del usuario en el local storage
                localStorage.setItem('email', respuesta.data['0'].email);
                localStorage.setItem('id', respuesta.data['0'].id);
                localStorage.setItem('date', new Date());            

                sweetMessage('success', 'login correcto');
                window.location.href = window.location + 'pages/main/main.html';
            } else {
                sweetMessage('warning', respuesta.mensaje);
            }
            
        },
        error: function(data) {
            //var mensaje = 'Se produjo un error. Por favor, inténtelo nuevamente'.
            //sweetMessage('error', mensaje);
            //console.log(data.responseText);
        }
      })
}

$( document ).ready(function() {
    localStorage.clear();
    $('#make-login').click(loginFunction);
});