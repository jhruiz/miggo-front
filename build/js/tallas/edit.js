$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var descripcion = $('#descripcion').val();
    
    formData.append("descripcion", descripcion);
    formData.append('_method', 'PUT');
    
    $.ajax({
        method: "POST",
        url: url_back + "tallas/"+localStorage.editar,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,//formData
        processData: false,//formData
        success: function(respuesta) {
    
            localStorage.editar = '';
            if(respuesta){
                $('.modal-backdrop').remove();
                var mensaje = ' Talla actualizado de forma correcta.: '+ respuesta.data.descripcion;
                sweetMessage('success', mensaje); 
                $('#main_content').load(url_front + 'tallas/index.html');
            } else {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
        },
        error: function(respuesta) {
    
            if(respuesta.responseJSON.error){
                $.each(respuesta.responseJSON.error.message, function (key, item) {
                    var mensaje = item[0];
                    sweetMessage('error', mensaje);
                });
    
            }else{
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
        }
    });
    });
    
    
    function obtenerTalla(id){
    var url = 'tallas/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
    
            $('#descripcion').val(respuesta.data.descripcion);
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
          obtenerTalla(localStorage.editar);
    
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
    });