
function obtenerUnidadesmedida(id){

  var url = 'unidadesmedidas/'+ id;
  
  $.ajax({
      method: "GET",
      url: url_back + url,
      headers: { 
                    Authorization: 'Bearer ' + localStorage.access_token
                },
      dataType: "json",
      success: function(respuesta) {
  
        respuesta.data.unidadpeso == 1 ? $('#unidadpeso').prop( "checked", true ) : $('#unidadpeso').prop( "checked", false );
                         
        if(respuesta.data.unidadpeso){
          $('#divFactorgramos').show();
        }
  
        $('#codigo').val(respuesta.data.codigo);
        $('#descripcion').val(respuesta.data.descripcion);
        $('#factorgramos').val(respuesta.data.factorgramos);
        $('#codigodian').val(respuesta.data.codigodian);//TODO deberia ser un select pero no tengo los codigos de la DIAN
  
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
        obtenerUnidadesmedida(localStorage.ver);
        localStorage.ver = '';
  });