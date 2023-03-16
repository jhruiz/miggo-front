function obtenerBodega(id){
    var url = 'bodegas/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
    
            $('#codigo').val(respuesta.data.codigo);
            $('#descripcion').val(respuesta.data.descripcion);
    
            if(respuesta.data.tipobodega_id){
                obtenerSelect('tipobodegas', '#select-tipobodegas', respuesta.data.tipobodega_id);
            }
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
          obtenerBodega(localStorage.ver);
          localStorage.ver = '';
    });
    