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
    formData.append('_method', 'PUT');
    
    $.ajax({
        method: "POST",
        url: url_back + "cuentabancarias/"+localStorage.editar,
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
                var mensaje = ' Cuenta Bancaria actualizado de forma correcta.: '+ respuesta.data.titularcuenta;
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
    
    
    function obtenerCuentabancaria(id){
    var url = 'cuentabancarias/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
    
            $('#numerocuenta').val(respuesta.data.numerocuenta);
            $('#entidadfinanciera').val(respuesta.data.entidadfinanciera);
            $('#oficinanumero').val(respuesta.data.oficinanumero);
            $('#titularcuenta').val(respuesta.data.titularcuenta);
            $('#franquicia').val(respuesta.data.franquicia);
            $('#aperturas').val(respuesta.data.apertura);
            $('#vencimientos').val(respuesta.data.vencimiento);
            $('#cupo').val(respuesta.data.cupo);
    
            if(respuesta.data.tipocuenta_id){
                obtenerSelectCuenta('tipocuentas', '#select-tipocuentas', respuesta.data.tipocuenta_id);
    
                if(respuesta.data.tipocuenta_id == 5){
                    $('#divF').show();
                }
            }
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    var obtenerSelectCuenta = function(url, select, id){
      url_tipo= url+ '/' +id;
      $.ajax({
      method: "GET",
      url: url_back + url_tipo,
      headers: { 
          Authorization: 'Bearer ' + localStorage.access_token
      },
      dataType: "json",
      success: function(respuesta) {
              var html = '';
              html += '<option value="'+ respuesta.data.id+'">';
              html += respuesta.data.puc_id+'-'+respuesta.data.descripcion;
              html += '</option>';
              obtenerSelectsCuenta(url, select, id, html);
      },
      error: function() {
          var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
          sweetMessage('error', mensaje);
      }
    })  
    }
    
    
    function obtenerSelectsCuenta(url, select, id = null,  base = null) {
    
    $.ajax({
      method: "GET",
      url: url_back + url,
      headers: { 
          Authorization: 'Bearer ' + localStorage.access_token
      },
      dataType: "json",
      success: function(respuesta) {
    
          $(select).html(crearHtmlCuenta(respuesta.data, base, id));
      },
      error: function() {
          var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
          sweetMessage('error', mensaje);
      }
    })     
    }
    
    var crearHtmlCuenta = function(data, base = null, id = null) {
      if (base) {
              var html = base;
              $.each(data, function (key, item) {
                  if(id != item.id){
                      html += '<option value="'+ item.id+'">';
                      html += item.puc_id+'-'+item.descripcion;
                      html += '</option>';
                  }
              });
          return html;
      } 
    }

    var obtenerMastercardyvisa = function(search, select, id){
          url_ent= 'mastercardyvisas/'+ id ;
          $.ajax({
          method: "GET",
          url: url_back + url_ent,
          headers: { 
              Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: "json",
          success: function(respuesta) {
      
                  var html = '';
                  html += '<option value="'+ respuesta.data.id+'">';
                  html += respuesta.data.tercero.identificacion +'-'+ respuesta.data.tercero.nombres;
                  html += '</option>';
      
                  obtenerMastercardyvisas(search, select, html,  id);
                
          },
          error: function() {
              var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
              sweetMessage('error', mensaje);
          }
        })  
      }

    var obtenerMastercardyvisas = function(search, select, base=null, id = null){
        url_ent= 'empresas/' + localStorage.empresa_id + '/mastercardyvisas?search='+search;
        $.ajax({
        method: "GET",
        url: url_back + url_ent,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {

            console.log(respuesta);
    
            if (base) {
                var html = base;
                $.each(respuesta, function (key, item) {
                    if(id != item.id){
                        html += '<option value="'+ item.id+'">';
                        html += item.codigo +'-'+ item.descripcion;
                        html += '</option>';
                       }
                     });
            } else {
                var html = '<option value="">Seleccione..</option>';
                $.each(respuesta, function (key, item) {
                    html += '<option value="'+ item.id+'">';
                    html += item.codigo +'-'+ item.descripcion;
                    html += '</option>';
                });
            }
    
              $(select).html(html);
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
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
          obtenerCuentabancaria(localStorage.editar);
    
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