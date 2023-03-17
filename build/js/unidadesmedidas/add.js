
$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var unidadpeso =$('#unidadpeso').is(':checked') ? 1 : 0;
    
    var codigo = $('#codigo').val();
    var descripcion = $('#descripcion').val();
    var factorgramos = $('#factorgramos').val();
    var codigodian = $('#codigodian').val();
    
    formData.append("codigo", codigo);
    formData.append("descripcion", descripcion);
    formData.append("codigodian", codigodian);
    formData.append("factorgramos", factorgramos);
    formData.append("unidadpeso", unidadpeso);
    formData.append("creador_id", localStorage.id);
    
    
    $.ajax({
        method: "POST",
        url: url_back + "unidadesmedidas",
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
            var mensaje = 'Unidades Medida creado de forma correcta.: '+ respuesta.data.descripcion;
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
    
    $('#unidadpeso').change(function(){    
        if($('input[id=unidadpeso]').is(':checked')){
            $("#divFactorgramos").show();
        }else{
            $("#divFactorgramos").hide();
            $('#factorgramos').val('');
        }
    });
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
        validarLogin();
    
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
    });
    