
var infoMenu = function() {

    var htmlMenu = '';
    var arrMenu = [0,0];





    $.ajax({
        method: "GET",
        url: url_back+'/cloudmenus',
        success: function(respuesta) {
            $.each(respuesta, function (key ,item) {

                    htmlMenu += '<li class="nav-item dropdown">';
                    htmlMenu += '<a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-load="">';
                    htmlMenu += '<i class="' + item.imagen + '"></i>';
                    htmlMenu += '<p >&nbsp; &nbsp;' + item.descripcion + '</p>';
                    htmlMenu += '<ul class="dropdown-menu">';

                        $.each(item.hijos, function (k ,i) {
                            htmlMenu += '<li class="dropdown-item">';
                            htmlMenu += '<a href="#" class="nav-link load-menu" data-load="' + i.url + '">';
                            htmlMenu += '<i class="' + i.imagen + '"></i>';
                            htmlMenu += '<p>&nbsp; &nbsp;' + i.descripcion + '</p>';
                            htmlMenu += '</a>';
                            htmlMenu += '</li>';

                            }); 

                    htmlMenu += '</ul>';
                    htmlMenu += '</a>';
                    htmlMenu += '</li>';
            }); 

                $('#li-menu').html(htmlMenu);
                $('.load-menu').click(clicMenu);
                
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
    }) 
}

/**
 * Carga el contenido de la ruta seleccinada en el div dispuesto en la pagina main
 */
var clicMenu = function() {

    var url = $(this).data('load');    
 
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
                
            window.location.href = url_front;   //TODO: logout    

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

/**
 * Crea el html del menu
 */
var loadPrincipalMenu = function() {

    // arrMenu = infoMenu();
    // var htmlMenu = '';
    // arrMenu.forEach(element => {
    //     htmlMenu += '<li class="nav-item">';
    //     htmlMenu += '<a href="#" class="nav-link load-menu" data-load="' + element.load + '">';
    //     htmlMenu += '<i class="' + element.icon + '"></i>';
    //     htmlMenu += '<p>&nbsp; &nbsp;' + element.tittle + '</p>';
    //     htmlMenu += '</a>';
    //     htmlMenu += '</li>';
    // });

    // //console.log(element);

    // $('#li-menu').html(htmlMenu);
    // $('.load-menu').click(clicMenu);
    
};

$( document ).ready(function() {
    loadPrincipalMenu();  
});