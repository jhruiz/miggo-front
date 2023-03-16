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
    formData.append("creador_id", localStorage.id);
    formData.append("empresa_id", localStorage.empresa_id);
    
    $.ajax({
        method: "POST",
        url: url_back + "bodegas",
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,
        processData: false,
        success: function(respuesta) {
    
                $('#ModalLong3').modal('hide');
                $('ModalLong3').removeClass('show');
                $('.modal-backdrop').remove();
                var mensaje = 'Bodega creado de forma correcta.: '+ respuesta.data.descripcion;
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
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
        validarLogin();
        obtenerSelects('tipobodegas', '#select-tipobodegas');
    
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
    });
    
    