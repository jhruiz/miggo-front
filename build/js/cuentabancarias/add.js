$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var numerocuenta = $('#numerocuenta').val();
    var entidadfinanciera = $('#entidadfinanciera').val();
    var oficinanumero = $('#oficinanumero').val();
    var titularcuenta = $('#titularcuenta').val();
    var franquicia = $('#franquicia').val();
    var apertura = $('#aperturas').val();
    var vencimiento = $('#vencimientos').val();
    var cupo = $('#cupo').val();
    var tipocuenta_id = $('#select-tipocuentas').val();
    
    formData.append("numerocuenta", numerocuenta);
    formData.append("entidadfinanciera", entidadfinanciera);
    formData.append("oficinanumero", oficinanumero);
    formData.append("titularcuenta", titularcuenta);
    formData.append("franquicia", franquicia);
    formData.append("apertura", apertura);
    formData.append("vencimiento", vencimiento);
    formData.append("cupo", cupo);
    formData.append("tipocuenta_id", tipocuenta_id);
    formData.append("creador_id", localStorage.id);
    formData.append("empresa_id", localStorage.empresa_id);
    
    
    $.ajax({
        method: "POST",
        url: url_back + "cuentabancarias",
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
                var mensaje = 'Cuenta Bancaria creado de forma correcta.: '+ respuesta.data.titularcuenta;
                sweetMessage('success', mensaje); 
                infoTable(); 
        },
        error: function(respuesta) {
    
            console.log(respuesta);
    
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
    
    
    
    function obtenerSelectsCuenta(url, select, id = null,  base = null) {
    
    $.ajax({
      method: "GET",
      url: url_back + url,
      headers: { 
          Authorization: 'Bearer ' + localStorage.access_token
      },
      dataType: "json",
      success: function(respuesta) {
    
          $(select).html(crearHtmlCuenta(respuesta.data));
      },
      error: function() {
          var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
          sweetMessage('error', mensaje);
      }
    })     
    }
    
    var crearHtmlCuenta = function(data) {
    
              var html = '<option value="" selected="true" disabled="disabled">Selecione...</option>';
              $.each(data, function (key, item) {
                  html += '<option value="'+ item.id+'">';
                  html += item.puc_id+'-'+item.descripcion;
                  html += '</option>';
              });
          return html;
    }
    
    var evaluarFranquicia = function() {
        var tipocuenta_id = $(this).val();
        if(tipocuenta_id == 5){
            $('#divF').show();
        }else{
            $('#divF').hide();
            $('#franquicia').val('');
        }
    }
    
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
        validarLogin();
        obtenerSelectsCuenta('tipocuentas', '#select-tipocuentas');
    
        $('#select-tipocuentas').on('change',evaluarFranquicia);
    
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
    });
    
    $(function() {
         $("#apertura").datetimepicker({
                locale: "es",
                format: "YYYY-MM-DD",  
                minDate: moment().subtract(50, 'year'),
                timepicker:false,
                autoclose: true,
                showButtonPanel: true,
         });
        
         $("#vencimiento").datetimepicker({
                locale: "es",
                format: "YYYY-MM-DD",  
                minDate: moment(),
                timepicker:false,
                autoclose: true,
                showButtonPanel: true,
         });
        });