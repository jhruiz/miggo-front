$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var fecha = new Date();
    var anio = fecha.getFullYear();
    
    var metodoprovision = $('#select-metodoprovision').val();
    
    formData.append("metodoprovision", metodoprovision);
    formData.append("anio", anio);
    formData.append("creador_id", localStorage.id);
    formData.append("empresa_id", localStorage.empresa_id);
    
    $.ajax({
        method: "POST",
        url: url_back + "provisioncarteras",
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,
        processData: false,
        success: function(respuesta) {
    
            if(respuesta){
                $('.modal-backdrop').remove();
    
                var mensaje = 'Provision Cartera creado de forma correcta.: ';
                sweetMessage('success', mensaje); 
                $('#main_content').load(url_front + 'provisioncarteras/index.html');
            } else {
                    sweetMessage('warning', respuesta);                
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
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
        validarLogin();
    
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
    });
    