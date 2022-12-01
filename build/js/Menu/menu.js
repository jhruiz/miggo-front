var url_api = 'http://localhost:85/miggo-accountant-back/public/api';

//https://es.stackoverflow.com/questions/300866/chequear-si-existe-una-posicion-en-un-array-bidimensional

var infoMenu = function() {

    var htmlMenu = '';
    var arrMenu = [];
    var arre_cloudmenu = [];
    var nuevoArray = new Array();


    $.ajax({
        method: "GET",
        url: url_api+'/cloudmenus?sort_by=cloudmenu_id',
        success: function(respuesta) {

            //********************************** */
            $.each(respuesta.data, function (key, item) {

            console.log('cloudmenu_id'+item.cloudmenu_id);
            console.log('orden'+item.orden);

                if($.inArray(item.cloudmenu_id , nuevoArray, false)){
                      nuevoArray.push(item);

                }else if($.inArray(item.cloudmenu_id , nuevoArray, true)){


                }

               arrMenu.push({
                    'load' : item.url,
                    'icon' : item.imagen,
                    'tittle' : item.descripcion
                    });
                
                }); 
                
                arrMenu.forEach(element => {
                    htmlMenu += '<li class="nav-item">';
                    htmlMenu += '<a href="#" class="nav-link load-menu" data-load="' + element.load + '">';
                    htmlMenu += '<i class="' + element.icon + '"></i>';
                    htmlMenu += '<p>&nbsp; &nbsp;' + element.tittle + '</p>';
                    htmlMenu += '</a>';
                    htmlMenu += '</li>';
                });
            
                //console.log(element);
            
                $('#li-menu').html(htmlMenu);
                $('.load-menu').click(clicMenu);
                
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
    }) 

};

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
                    url: 'http://localhost/miggo-accountant-back/public/api/logout',
                    success: function(respuesta) {
                        console.log(respuesta.message);
                       // $('#content-data').html(respuesta.message);         
                    },
                    error: function() {
                        var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                        sweetMessage('error', mensaje);
                    }
                }) 
                
            window.location.href = "http://localhost/miggo-front/";   //TODO: logout    

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
    arrMenu = infoMenu();
    var htmlMenu = '';


    console.log(arrMenu);
   

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
    console.log('document ready');   
});