$("#form").change(function(e) {
    // $("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var codigo = $('#codigo').val();
    var nombre = $('#nombre').val();
    var costounitario = $('#costounitario').val();
    var posnombre = $('#posnombre').val();
    var descripcion = $('#descripcion').val();
    var fechainvima = $('#fechainvimas').val();
    var costobarras = $('#costobarras').val();
    var referencia = $('#referencia').val();
    var plu = $('#plu').val();
    var pesovolumen = $('#pesovolumen').val();
    var reginvima = $('#reginvima').val();
    var existenciaminima = $('#existenciaminima').val();
    var cantidadordenar = $('#cantidadordenar').val();
    var descuento = $('#descuento').val() / 100;
    var descuentoafechavlr = $('#descuentoafechavlr').val() / 100;
    var imagen = $('#imagen')[0].files[0] ? $('#imagen')[0].files[0] : ''; //
    
    var activo =$('#activo').is(':checked') ? 1 : 0; //
    var lote =$('#lote').is(':checked') ? 1 : 0; //
    var serial =$('#serial').is(':checked') ? 1 : 0;// 
    var talla =$('#talla').is(':checked') ? 1 : 0; //
    var color =$('#color').is(':checked') ? 1 : 0; //
    
    var marca_id = $('#select-marcas').val()? $('#select-marcas').val() : '';
    var grupoinventario_id = $('#id').val()? $('#id').val() : ''; 
    
    formData.append("codigo", codigo);
    formData.append("nombre", nombre);
    formData.append("costounitario", costounitario);
    formData.append("posnombre", posnombre);
    formData.append("descripcion", descripcion);
    formData.append("costobarras", costobarras);
    formData.append("referencia", referencia);
    formData.append("plu", plu);
    formData.append("activo", activo);
    formData.append("lote", lote);
    formData.append("serial", serial);
    formData.append("talla", talla);
    formData.append("color", color);
    formData.append("pesovolumen", pesovolumen);
    formData.append("reginvima", reginvima);
    formData.append("fechainvima", fechainvima);
    formData.append("existenciaminima", existenciaminima);
    formData.append("cantidadordenar", cantidadordenar);
    formData.append("descuento", descuento);
    formData.append("descuentoafechavlr", descuentoafechavlr);
    formData.append("imagen", imagen);
    formData.append("marca_id", marca_id);
    formData.append("grupoinventario_id", grupoinventario_id);
    formData.append('_method', 'PUT');
    
    
    $.ajax({
        method: "POST",
        url: url_back + "articulos/"+localStorage.editar,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,
        processData: false,
        success: function(respuesta) {
    
                var mensaje = 'Articulo creado de forma correcta.: '+ respuesta.data.nombre;
                sweetMessage('success', mensaje); 
                // $('#main_content').load(url_front + 'articulos/index.html');
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
    
    
    function obtenerArticulo(id){
        var url = 'articulos/'+ id;

        $.ajax({
            method: "GET",
            url: url_back + url,
            headers: { 
                          Authorization: 'Bearer ' + localStorage.access_token
                      },
            dataType: "json",
            success: function(respuesta) {
    
                respuesta.data.activo == 1 ? $('#activo').prop( "checked", true ) : $('#activo').prop( "checked", false );
                respuesta.data.lote == 1 ? $('#lote').prop( "checked", true ) : $('#lote').prop( "checked", false );
                respuesta.data.serial == 1 ? $('#serial').prop( "checked", true ) : $('#serial').prop( "checked", false );
                respuesta.data.talla == 1 ? $('#talla').prop( "checked", true ) : $('#talla').prop( "checked", false );
                respuesta.data.color == 1 ? $('#color').prop( "checked", true ) : $('#color').prop( "checked", false );
    
                $('#codigo').val(respuesta.data.codigo);
                $('#nombre').val(respuesta.data.nombre);
                $('#costounitario').val(respuesta.data.costounitario);
                $('#posnombre').val(respuesta.data.posnombre);
                $('#descripcion').val(respuesta.data.descripcion);
                $('#fechainvimas').val(respuesta.data.fechainvima);
                $('#costobarras').val(respuesta.data.costobarras);
                $('#referencia').val(respuesta.data.referencia);
                $('#plu').val(respuesta.data.plu);
                $('#pesovolumen').val(respuesta.data.pesovolumen);
                $('#reginvima').val(respuesta.data.reginvima);
                $('#existenciaminima').val(respuesta.data.existenciaminima);
                $('#cantidadordenar').val(respuesta.data.cantidadordenar);
                $('#descuento').val(respuesta.data.descuento * 100);
                $('#descuentoafechavlr').val(respuesta.data.descuentoafechavlr * 100);
                $('#costospromediobodegas').val(respuesta.data.costospromediobodegas);
                $('#ultimocosto').val(respuesta.data.ultimocosto);
                $('#fechaultimacompra').val(respuesta.data.fechaultimacompra);
    
                if(respuesta.data.imagen){
                    const ul = document.getElementById("mostrarImagen");
                    const imagen = document.createElement("img");
                    imagen.width = 200;
                    imagen.src = url_img + 'articulos/'+ respuesta.data.imagen;
                    ul.appendChild(imagen);
                  }else{
                    const ul = document.getElementById("mostrarImagen");
                    const imagen = document.createElement("img");
                    imagen.width = 200;
                    imagen.src = url_front + 'articulos/defecto.jpg';
                    ul.appendChild(imagen);
                  }
    
                if(respuesta.data.marca_id){
                        obtenerSelect('marcas','#select-marcas',respuesta.data.marca_id);
                }else{
                        obtenerSelects('marcas','#select-marcas');
                }
    
                if(respuesta.data.grupoinventario_id){
                        $('#id').val(respuesta.data.grupoinventario_id);//TODO: metodo para recargar todo los grupos 
                        obtenerGrupoinventario(respuesta.data.grupoinventario_id);
                }else{
                     obtenerGrupoinventarios(); 
                }

            },
            error: function() {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
          })  
        }
    
    function obtenerGrupoinventario(id) { 
    var url = 'grupoinventarios/'+id;
    var grupopadre= '';
    
      $.ajax({
          method: "GET",
          url: url_back + url,    headers: { 
              Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: "json",
          success: function(respuesta) {
    
                    if(respuesta.data.posicion == 3){
                        $('#select-subgrupoinventario3').html('<option value="'+ respuesta.data.id+'" >'+respuesta.data.codigo+'-'+respuesta.data.descripcion+'</option>');
                        $('#select-subgrupoinventario2').html('<option value="'+ respuesta.data.grupoinventario.id+'" >'+respuesta.data.grupoinventario.codigo+'-'+respuesta.data.grupoinventario.descripcion+'</option>');
                        $('#select-subgrupoinventario1').html('<option value="'+ respuesta.data.grupoinventario.grupoinventario.id+'" >'+respuesta.data.grupoinventario.grupoinventario.codigo+'-'+respuesta.data.grupoinventario.grupoinventario.descripcion+'</option>');
    
                        grupopadre = '<option value="'+ respuesta.data.grupoinventario.grupoinventario.grupoinventario.id+'" >'+respuesta.data.grupoinventario.grupoinventario.grupoinventario.codigo+'-'+respuesta.data.grupoinventario.grupoinventario.grupoinventario.descripcion+'</option>';
    
                        obtenerGrupoinventarios(respuesta.data.grupoinventario.grupoinventario.grupoinventario.id, grupopadre);
                    }else if(respuesta.data.posicion == 2){
                        $('#select-subgrupoinventario2').html('<option value="'+ respuesta.data.id+'" >'+respuesta.data.codigo+'-'+respuesta.data.descripcion+'</option>');
                        $('#select-subgrupoinventario1').html('<option value="'+ respuesta.data.grupoinventario.id+'" >'+respuesta.data.grupoinventario.codigo+'-'+respuesta.data.grupoinventario.descripcion+'</option>');
    
                        grupopadre = '<option value="'+ respuesta.data.grupoinventario.grupoinventario.id+'" >'+respuesta.data.grupoinventario.grupoinventario.codigo+'-'+respuesta.data.grupoinventario.grupoinventario.descripcion+'</option>';
    
                        obtenerGrupoinventarios(respuesta.data.grupoinventario.grupoinventario.id, grupopadre);
                    }else if(respuesta.data.posicion == 1){
                        $('#select-subgrupoinventario1').html('<option value="'+ respuesta.data.id+'" >'+respuesta.data.codigo+'-'+respuesta.data.descripcion+'</option>');
    
                        grupopadre = '<option value="'+ respuesta.data.grupoinventario.id+'" >'+respuesta.data.grupoinventario.codigo+'-'+respuesta.data.grupoinventario.descripcion+'</option>';
    
                        obtenerGrupoinventarios(respuesta.data.grupoinventario.id, grupopadre);
                    }
          },
          error: function() {
              var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
              sweetMessage('error', mensaje);
          }
        })     
      }
    
    
    function obtenerGrupoinventarios(id = null, grupopadre = null) { 
    var url = 'grupoinventarios';
    
    $.ajax({
          method: "GET",
          url: url_back + url,    headers: { 
              Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: "json",
          success: function(respuesta) {
    
              $('#select-grupoinventario').html(crearHtmlGrupo(respuesta, id, grupopadre));
          },
          error: function() {
              var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
              sweetMessage('error', mensaje);
          }
        })     
      }
      
      var crearHtmlGrupo = function(data, id = null, grupopadre = null) {
            if(grupopadre != null){
                var html = grupopadre;
            }else{
                var html = '<option value="" selected="true" disabled="disabled">Selecione...</option>';
            }
              $.each(data, function (key, item) {
                if(localStorage.empresa_id == item.empresa_id && item.id != id){
                  html += '<option value="'+ item.id+'">';
                  html += item.codigo+'-'+item.descripcion;
                  html += '</option>';
                }
    
              });
          return html;
      }
    
     
    var recargarGrupoinventario = function(){ 
      var grupoinventario_id = $(this).val();
      var url_d ='grupoinventariosdependientes/'+grupoinventario_id;
      if(grupoinventario_id){
          $.ajax({
              type:"GET",
              url: url_back + url_d,
              headers: { 
                    Authorization: 'Bearer ' + localStorage.access_token
              },
              dataType: "json",
              success:function(respuesta){
    
                  $('#id').val(grupoinventario_id);
                  //$('#posicion').val('grupoinventario');
                  if(respuesta.length != 0){
                      $('#select-subgrupoinventario3').html('');
                      $('#select-subgrupoinventario2').html('');
                      $('#select-subgrupoinventario1').html(crearHtmlGrupo(respuesta));
                  }else{
                      $('#select-subgrupoinventario3').html('');
                      $('#select-subgrupoinventario2').html('');
                      $('#select-subgrupoinventario1').html('');
                  }
              }
          }); 
      }else if($(this).val() == ''){
                 $('#select-subgrupoinventario3').html('');
                 $('#select-subgrupoinventario2').html('');
                 $('#select-subgrupoinventario1').html('');
      }
    }
    
    var recargarSubgrupoinventario1 = function(){ 
      var grupoinventario_id = $(this).val();
      var url_d ='grupoinventariosdependientes/'+grupoinventario_id;
    
      if(grupoinventario_id){
          $.ajax({
              type:"GET",
              url: url_back + url_d,
              headers: { 
                    Authorization: 'Bearer ' + localStorage.access_token
              },
              dataType: "json",
              success:function(respuesta){
    
                $('#id').val(grupoinventario_id);
                //$('#posicion').val('subgrupoinventario1');
                if(respuesta.length != 0){
                      $('#select-subgrupoinventario3').html('');
                      $('#select-subgrupoinventario2').html(crearHtmlGrupo(respuesta));
                  }else{
                      $('#select-subgrupoinventario3').html('');
                      $('#select-subgrupoinventario2').html('');
                  }
              }
          }); 
      }else if($(this).val() == ''){
        $('#select-subgrupoinventario3').html('');
        $('#select-subgrupoinventario2').html('');
      }
    };
    
    
    var recargarSubgrupoinventario2 = function(){ 
      var grupoinventario_id = $(this).val();
      var url_d ='grupoinventariosdependientes/'+grupoinventario_id;
      if(grupoinventario_id){
          $.ajax({
              type:"GET",
              url: url_back + url_d,
              headers: { 
                    Authorization: 'Bearer ' + localStorage.access_token
              },
              dataType: "json",
              success:function(respuesta){
    
                  $('#id').val(grupoinventario_id);
                  //$('#posicion').val('subgrupoinventario2');
                  if(respuesta.length != 0){
                      $('#select-subgrupoinventario3').html(crearHtmlGrupo(respuesta));
                  }else{
                    $('#select-subgrupoinventario3').html('');
                  }
              }
          }); 
      }else if($(this).val() == ''){
          $('#select-subgrupoinventario3').html('');
      }
    };
    
    
    var recargarSubgrupoinventario3 = function(){ 
      var grupoinventario_id = $(this).val();
      if(grupoinventario_id){
        $('#id').val(grupoinventario_id);
        //$('#posicion').val('subgrupoinventario3');
      }
    };
    
    
    
    $('.form-check-input').change(function(){    
        if(!$('input[id=color]').is(':checked')){
            $('#talla').prop( "checked", false);
        }
    });
    
    $('#talla').change(function(){    
        if(!$('input[id=color]').is(':checked')){
            $('.form-check-input').prop( "checked", false);
        }
    });
    
    $("#nombre").blur(function() {
             $("#posnombre").val($(this).val()); 
            //  $(this).after( "<span> Introduce formato xxx-xxx-xxx </span>" );	
        });
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
        validarLogin();
        obtenerArticulo(localStorage.editar);
    
        $("#select-grupoinventario").on("click",recargarGrupoinventario);
        $("#select-subgrupoinventario1").on("click",recargarSubgrupoinventario1);
        $("#select-subgrupoinventario2").on("click",recargarSubgrupoinventario2);
        $("#select-subgrupoinventario3").on("click",recargarSubgrupoinventario3);
    
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
    });
    
    document.getElementById("imagen").onchange = function(e){
            if(validarImagen(e)){
                const ul = document.getElementById("mostrarImagen");
                ul.innerHTML = '';
                const imagen = document.createElement("img");
                const read = new FileReader();
                const file = this.files;
                
                read.onload = function(){
                    const result = this.result;
                    const url = result;
                    imagen.width = 200;
                    imagen.src = url;
                    ul.appendChild(imagen);
                }
                read.readAsDataURL(file[0]);
            }
        }
    
        $(function() {
     $("#fechainvima").datetimepicker({
            locale: "es",
            format: "YYYY-MM-DD",  
            maxDate: moment(),
            minDate: moment().subtract(99, 'year'),
            timepicker:false,
            autoclose: true,
            showButtonPanel: true
     });
    });
    
    