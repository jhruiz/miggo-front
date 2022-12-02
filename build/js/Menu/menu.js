var infoMenu = function() {

    $.ajax({
        method: "GET",
        url: '',//URL del menu
        success: function(respuesta) {
            console.log(respuesta.message);
           // $('#content-data').html(respuesta.message);         
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
    }) 

    let arrMenu = [
        {
            'load' : '../usuarios/index.html',
            'icon' : 'nav-icon fas fa-users',
            'tittle' : 'Usuarios'
        },
        {
            'load' : '../items/index.html',
            'icon' : 'nav-icon fas fa-boxes',
            'tittle' : 'PXXXXXXXX'
        },
        {
            'load' : '../categorias/index.html',
            'icon' : 'nav-icon fas fa-object-group',
            'tittle' : 'Categorias'
        },
        {
            'load' : '../pedidos/index.html',
            'icon' : 'nav-icon fas fa-people-carry',
            'tittle' : 'Pedidos 23'
        },
        {
            'load' : 'logout',
            'icon' : 'fas fa-power-off',
            'tittle': 'Cerrar sesión'
        }
    ];

    return arrMenu;
};

/**
 * Carga el contenido de la ruta seleccinada en el div dispuesto en la pagina main
 */
var clicMenu = function() {

    console.log('HERE clic menu');


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
    let menu = infoMenu();
    var htmlMenu = '';

    menu.forEach(element => {
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
    
};

$( document ).ready(function() {
    loadPrincipalMenu(); 
    console.log('document ready');   
});