
function obtenerServicio(id){
  var url = 'servicios/'+ id;
  
  $.ajax({
      method: "GET",
      url: url_back + url,
      headers: { 
                    Authorization: 'Bearer ' + localStorage.access_token
                },
      dataType: "json",
      success: function(respuesta) {

        respuesta.data.activo == 1 ? $('#activo').prop( "checked", true ) : $('#activo').prop( "checked", false );
        respuesta.data.estatusdescuento == 1 ? $('#estatusdescuento').prop( "checked", true ) : $('#estatusdescuento').prop( "checked", false );

        $('#codigo').val(respuesta.data.codigo);
        $('#nombre').val(respuesta.data.nombre);
        $('#posnombre').val(respuesta.data.posnombre);
        $('#descripcion').val(respuesta.data.descripcion);
        $('#descuento').val(respuesta.data.descuento * 100);
        $('#descuentovlr').val(respuesta.data.descuentovlr);
        $('#descuentoafectavlr').val(respuesta.data.descuentoafectavlr);
        $('#costospromediobodegas').val(respuesta.data.costospromediobodegas);
        $('#ultimocosto').val(respuesta.data.ultimocosto);
        $('#fechaultimacompra').val(respuesta.data.fechaultimacompra);
        
        if(respuesta.data.imagen){
            const ul = document.getElementById("mostrarImagen");
            const imagen = document.createElement("img");
            imagen.width = 200;
            imagen.src = url_img + 'servicios/'+ respuesta.data.imagen;
            ul.appendChild(imagen);
          }else{
            const ul = document.getElementById("mostrarImagen");
            const imagen = document.createElement("img");
            imagen.width = 200;
            imagen.src = url_front + 'servicios/defecto.jpg';
            ul.appendChild(imagen);
          }

        if(respuesta.data.grupoinventario_id){
                $('#id').val(respuesta.data.grupoinventario_id);
                obtenerGrupoinventario(respuesta.data.grupoinventario_id);
        }else{
              obtenerGrupoinventarios(); 
        }

        $('#costounitario').val(decimalLatinoShow(respuesta.data.costounitario));
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

$( document ).ready(function() {
  $('.preloader').hide("slow");
  validarLogin();
  actualizarmoneda();
  obtenerServicio(localStorage.ver);

  $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
});
