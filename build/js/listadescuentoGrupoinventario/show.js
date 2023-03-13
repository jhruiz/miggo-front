function obtenerListadescuentoG(id){

    var url = 'listadescuentos/'+ id +'/grupoinventarios';
  
  $.ajax({
      method: "GET",
      url: url_back + url,
      headers: { 
                    Authorization: 'Bearer ' + localStorage.access_token
                },
      dataType: "json",
      success: function(respuesta) {
                 
                        var htmlTable = "";
                        htmlTable += '<thead>';
                        htmlTable += '<tr>';
                        htmlTable += '<th> Codigo </th>';
                        htmlTable += '<th> Grupo Inventario </th>';
                        htmlTable += '</tr>';
                        htmlTable += '</thead>';
                        htmlTable += '<tbody>';
  
                        $.each(respuesta.data, function (key, item) {
                        htmlTable += '<tr>';
                        htmlTable += '<th>' + item.codigo + '</th>';
                        htmlTable += '<th>' + item.descripcion + '</th>';
                        htmlTable += '</tr>';
  
                        });
  
                        htmlTable += '</tbody>';
                        $('#partes').html(htmlTable);
  
  
  
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
        obtenerListadescuentoG(localStorage.ver);
        localStorage.ver = '';
  });
  