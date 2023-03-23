var obtenerTercero = function(id){
  url_ter= 'terceros/' + id;
  $.ajax({
  method: "GET",
  url: url_back + url_ter,
  headers: { 
      Authorization: 'Bearer ' + localStorage.access_token
  },
  dataType: "json",
  success: function(respuesta) {
          $('#responsable').val(respuesta.data.nombres);
          $('#tercero_id').val(respuesta.data.id);
  },
  error: function() {
      var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
      sweetMessage('error', mensaje);
  }
})  
}


var obtenerCiudad = function(id){
  url_ciu= 'ciudades/' + id;
  $.ajax({
  method: "GET",
  url: url_back + url_ciu,
  headers: { 
      Authorization: 'Bearer ' + localStorage.access_token
  },
  dataType: "json",
  success: function(respuesta) {
          var htmlCiudades = '';
          if (respuesta.data.id) {
              htmlCiudades += '<option value="'+ respuesta.data.id+'">';
              htmlCiudades += respuesta.data.descripcion;
              htmlCiudades += '</option>';
          }
          $('#select-ciudad').html(htmlCiudades);
  },
  error: function() {
      var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
      sweetMessage('error', mensaje);
  }
})  
}

var obtenerGrupo = function(id){
  url_gru= 'gruposactivosfijos/'+id;
  $.ajax({
  method: "GET",
  url: url_back + url_gru,
  headers: { 
      Authorization: 'Bearer ' + localStorage.access_token
  },
  dataType: "json",
  success: function(respuesta) {
          var htmlGrupo = '';
          htmlGrupo += '<option value="'+ respuesta.data.id+'">';
          htmlGrupo += respuesta.data.descripcion;
          htmlGrupo += '</option>';
          $('#select-gruposactivosfijo').html(htmlGrupo);

  },
  error: function() {
      var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
      sweetMessage('error', mensaje);
  }
})  
}

var obtenerSelect = function(url, select, id){
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
          html += respuesta.data.descripcion;
          html += '</option>';
          $(select).html(html);
  },
  error: function() {
      var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
      sweetMessage('error', mensaje);
  }
})  
}




var nivelCentrocosto = function (select, nivel, id){

  if(localStorage.nivelgasto == 1 && nivel == 'divisiones'){

$.ajax({
  method: "GET",
  url: url_back + 'divisiones/'+ id,
  headers: { 
      Authorization: 'Bearer ' + localStorage.access_token
  },
  dataType: "json",
  success: function(respuesta) {
      
      var htmlCentro = '';
          htmlCentro += '<option value="'+ respuesta.data.id+'">';
          htmlCentro += respuesta.data.codigo+'-'+respuesta.data.nombre;
          htmlCentro += '</option>';
      $(select).html(htmlCentro);

  },
  error: function() {
      var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
      sweetMessage('error', mensaje);
  }
}) 

}else if(localStorage.nivelgasto == 2 && nivel == 'secciones'){

$.ajax({
  method: "GET",
  url: url_back + 'secciones/'+ id,
  headers: { 
      Authorization: 'Bearer ' + localStorage.access_token
  },
  dataType: "json",
  success: function(respuesta) {
      
      var htmlCentro = '';
          htmlCentro += '<option value="'+ respuesta.data.id+'">';
          htmlCentro += respuesta.data.codigo+'-'+respuesta.data.nombre;
          htmlCentro += '</option>';
      $(select).html(htmlCentro);

  },
  error: function() {
      var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
      sweetMessage('error', mensaje);
  }
}) 

}else if(localStorage.nivelgasto == 3 && nivel == 'dependencias'){

$.ajax({
  method: "GET",
  url: url_back + 'dependencias/'+ id,
  headers: { 
      Authorization: 'Bearer ' + localStorage.access_token
  },
  dataType: "json",
  success: function(respuesta) {
      
      var htmlCentro = '';
          htmlCentro += '<option value="'+ respuesta.data.id+'">';
          htmlCentro += respuesta.data.codigo+'-'+respuesta.data.nombre;
          htmlCentro += '</option>';
      $(select).html(htmlCentro);
  },
  error: function() {
      var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
      sweetMessage('error', mensaje);
  }
})  
}

}

var obtenerPuc = function(id){
  url_p= 'pucs/' + id;
  $.ajax({
  method: "GET",
  url: url_back + url_p,
  headers: { 
      Authorization: 'Bearer ' + localStorage.access_token
  },
  dataType: "json",
  success: function(respuesta) {
          $('#puc').val(respuesta.data.id+'-'+respuesta.data.descripcion);
          $('#puc_id').val(respuesta.data.id);
  },
  error: function() {
      var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
      sweetMessage('error', mensaje);
  }
})  
}


//*************************************************************************************************************************

function obtenerActivosfijos(id){

var url = 'activosfijos/'+ id;

$.ajax({
  method: "GET",
  url: url_back + url,
  headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
            },
  dataType: "json",
  success: function(respuesta) {

    localStorage.ver = '';
    respuesta.data.alquilable == 1 ? $('#alquilable').prop( "checked", true ) : $('#alquilable').prop( "checked", false );

      $('#codigo').val(respuesta.data.codigo);
      $('#nombre').val(respuesta.data.nombre);
      $('#direccion').val(respuesta.data.direccion);
      $('#adquisicionfechas').val(respuesta.data.adquisicionfecha);
      $('#depreciarmesescompra').val(respuesta.data.depreciaraniocompra);
      $('#depreciaraniocompra').val(respuesta.data.depreciarmesescompra);
      $('#salvamento').val(respuesta.data.salvamento);
      $('#depreciaranio').val(respuesta.data.depreciaranio);
      $('#depreciarmeses').val(respuesta.data.depreciarmeses);
      $('#residuo').val(respuesta.data.residuo);
      $('#observaciones').val(respuesta.data.observaciones);
      $('#costohora').val(respuesta.data.costohora);

      if(respuesta.data.imagen){
          const ul = document.getElementById("mostrarImagen");
          const imagen = document.createElement("img");
          imagen.width = 200;
          imagen.src = url_img + 'activosfijos/'+ respuesta.data.imagen;
          ul.appendChild(imagen);
        }else{
          const ul = document.getElementById("mostrarImagen");
          const imagen = document.createElement("img");
          imagen.width = 200;
          imagen.src = url_front + 'activosfijos/defecto.jpg';
          ul.appendChild(imagen);
        }

      if(respuesta.data.ciudade_id){
          obtenerCiudad(respuesta.data.ciudade_id);
      }
      if(respuesta.data.responsable_id){
          obtenerTercero(respuesta.data.responsable_id);
      }

      if(respuesta.data.gruposactivosfijo_id){
          obtenerGrupo(respuesta.data.gruposactivosfijo_id);
      }

      if(respuesta.data.estadoactivo_id){
          obtenerSelect('estadoactivos', '#select-estadoactivos', respuesta.data.estadoactivo_id);
      }

      if(respuesta.data.centrocosto_id){
          nivelCentrocosto('#select-nivelcentrocostos',respuesta.data.nivelcentrocosto, respuesta.data.centrocosto_id);
      }

      if(respuesta.data.puc_id){
          obtenerPuc(respuesta.data.puc_id);
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

  obtenerActivosfijos(localStorage.ver);
});