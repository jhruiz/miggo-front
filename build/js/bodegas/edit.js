
$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var codigo = $('#codigo').val();
    var descripcion = $('#descripcion').val();
    var tipobodega_id = $('#select-tipobodegas').val();
    
    formData.append("codigo", codigo);
    formData.append("descripcion", descripcion);
    formData.append("tipobodega_id", tipobodega_id);
    formData.append('_method', 'PUT');
    
    $.ajax({
        method: "POST",
        url: url_back + "bodegas/"+localStorage.editar,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,//formData
        processData: false,//formData
        success: function(respuesta) {
    
                localStorage.editar = '';
                $('#ModalLong2').modal('hide');
                $('ModalLong2').removeClass('show');
                $('.modal-backdrop').remove();
                var mensaje = ' Bodega actualizado de forma correcta.: '+ respuesta.data.descripcion;
                sweetMessage('success', mensaje); 
                infoTable(); 
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
            }else{
                obtenerSelects('tipobodegas', '#select-tipobodegas');
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
          obtenerBodega(localStorage.editar);
    
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
    });