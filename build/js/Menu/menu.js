
var infoMenu = function() {

    var htmlMenu = '';
    var arrMenu = [0,0];

    $.ajax({
        method: "GET",
        url: url_back+'/cloudmenus',
        success: function(respuesta) {
            $.each(respuesta, function (key ,item) {


                    htmlMenu += '<li class="nav-item">';
                    htmlMenu += '<a href="#" class="nav-link active">';
                    htmlMenu += '<i class="' + item.imagen + '"></i>';
                    htmlMenu += '<p >&nbsp; &nbsp;' + item.descripcion + '</p>';
                    htmlMenu += '<ul class="nav nav-treeview" style="display: none;">';

                        $.each(item.hijos, function (k ,i) {
                            htmlMenu += '<li class="dropdown-item">';
                            htmlMenu += '<a href="#" data-load="' + i.url + '">';
                            htmlMenu += '<i class="' + i.imagen + '"></i>';
                            // htmlMenu += '<p>&nbsp; &nbsp;' + i.descripcion + '</p>';
                            htmlMenu +=  i.descripcion;
                            htmlMenu += '</a>';
                            htmlMenu += '</li>';

                            }); 

                    htmlMenu += '</ul>';
                    htmlMenu += '</a>';
                    htmlMenu += '</li>';

            }); 

            htmlMenu += '<li class="nav-item">';
            htmlMenu += '<a href="#" class="nav-link active" data-load="logout">';
            htmlMenu += '<i class="fas fa-power-off"></i>';
            htmlMenu += '<p >&nbsp; &nbsp;Cerrar sesión</p>';
            htmlMenu += '</a>';
            htmlMenu += '</li>';

                $('#li-menu').html(htmlMenu);
                $('.load-menu').click(clicMenu);
                
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
    }) 
}

var clicMenu = function() {

    var url = $(this).data('load'); 
    
    console.log(url);
    alert('here');
 
    //Valida si la opcion seleccionada es para salir del sistema
    if(url == 'logout'){
        localStorage.clear();
                $.ajax({
                    method: "GET",
                    url: url_back + 'logout',
                    success: function(respuesta) {
                        console.log(respuesta.message);
                       // $('#content-data').html(respuesta.message);         
                    },
                    error: function() {
                        var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                        sweetMessage('error', mensaje);
                    }
                }) 
                
            window.location.href = url_front;

    } else {
        $.ajax({
            method: "GET",
            url: url,
            success: function(respuesta) {
                $('#content-data').html(respuesta);         
            },
            error: function() {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
          }) 
    }
}

$( document ).ready(function() {
    infoMenu(); 
});