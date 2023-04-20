var obtenerListadescuento = function(){
    url_tipo= 'listadescuentos/' + localStorage.editar;
    $.ajax({
    method: "GET",
    url: url_back + url_tipo,
    headers: { 
        Authorization: 'Bearer ' + localStorage.access_token
    },
    dataType: "json",
    success: function(respuesta) {
      $('#listadescuento').text("Lista descuento "+respuesta.data.descripcion +" Grupo Inventario :");
    },
    error: function() {
        var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
        sweetMessage('error', mensaje);
    }
  })  
}

function obtenerGrupoinventario() {
url = 'allgrupoinventarios';

$.ajax({
    method: "GET",
    url: url_back + url,  
     headers: { 
        Authorization: 'Bearer ' + localStorage.access_token
    },
    dataType: "json",
    success: function(respuesta) {
        $('#select-grupoinventario').html(crearHtml(respuesta));
    },
    error: function() {
        var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
        sweetMessage('error', mensaje);
    }
  })     
}

var crearHtml = function(data) {
      var html = '<option value="" selected="true" disabled="disabled">Selecione...</option>';
        $.each(data, function (key, item) {
            html += '<option value="'+ item.id+'">';
            html += item.codigo+'-'+item.descripcion;
            html += '</option>';
        });
    return html;
}

  var organizarDatos = function( data ) {  
      var arrListadescuentos = [];
      var i = 0;
      data.forEach(element => {
          arrListadescuento = [
              element.codigo,
              element.descripcion,
          ];
  
          i++;
          arrListadescuento.push('<div class="col text-center">  <button class="btn btn-danger btn-sm" type="submit" onclick="eliminarListadescuentoG('+ element.id +')"><i class="nav-icon fa fa-times" aria-hidden="true"></i></button> </div>'); 
  
          arrListadescuentos.push(arrListadescuento);
      });
  
      return arrListadescuentos;
  }
  
  
  var generarDataTable = function( dataSet ) {
  
    $("#example1").DataTable({
      data: dataSet,
      columns: [
              { title: "Codigo" },
              { title: "Descripcion" },
              { title: "Acciones" },
              ],
      "responsive": true, "lengthChange": true, "autoWidth": false,
      "paging": true, "ordering": true, "info": true,
        lengthMenu: [
              [10, 25, 50, 100, -1],
              [10, 25, 50, 100, 'All'],
          ],
          "language": {
                  url:"../../build/config/languagedatatable.json"
            },
          dom: 'Bfrtip',
          "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
  
  }
  
  
  
  var infoTable = function(){
  
  var url = 'empresas/'+ localStorage.editar +'/listadescuentos';
  
      $.ajax({
              method: "GET",
              url: url_back + url,
              headers: { 
                  Authorization: 'Bearer ' + localStorage.access_token
              },
              dataType: 'json',
              success: function(respuesta) {
                  generarDataTable(organizarDatos(respuesta.data));
              },
              error: function() {
                  var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde o la tabla esta vacia';
                  sweetMessage('error', mensaje);
              }
          }) 
  
  }
  
  
  
  
  function eliminarListadescuentoG(id){
  var url_eliminar = 'listadescuentos/' + localStorage.editar +'/grupoinventarios/'+id;
  var url_edit = 'listadescuentoGrupoinventario/edit.html';
  

  if(localStorage.nivelperfil == 2){

    if (confirm('¿Está seguro de Borrar?')){
  
                $.ajax({
              method: "DELETE",
              url: url_back + url_eliminar,
              headers: { 
                            Authorization: 'Bearer ' + localStorage.access_token
                        },
              dataType: "json",
              success: function(respuesta) {

                  var mensaje = 'se borro exitosamente la parte: ' + respuesta.data.descripcion;
                  sweetMessage('success', mensaje);
                  
                  $('#main_content').load(url_front + url_edit);
              },
              error: function() {
                  var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                  sweetMessage('error', mensaje);
              }
            })  
    } else{
      return false;
    }

  }else{
    var mensaje = 'Para eliminar debe tener el nivel necesario.';
    sweetMessage('info', mensaje);
  }


  }

  $("#vincular").on('click',function(e){

    var grupo = $('#select-grupoinventario').val();
    var url = 'listadescuentos/'+ localStorage.editar +'/grupoinventarios/'+grupo;
    var url_edit = 'listadescuentoGrupoinventario/edit.html';
  
  $.ajax({
          method: "PUT",
          url: url_back + url,
          headers: { 
              Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: 'json',
          success: function(respuesta) {
            var mensaje = 'se agrego exitosamente el grupo: ' + respuesta.data.descripcion;
            sweetMessage('success', mensaje);
            $('#main_content').load(url_front + url_edit);    
          },
          error: function() {
              var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde o la tabla esta vacia';
              sweetMessage('error', mensaje);
          }
      })
});
  
  
  $( document ).ready(function() {
    $('.preloader').hide("slow");
    validarLogin();
  
    infoTable(); 
    obtenerGrupoinventario();
    obtenerListadescuento();

    var saludos = 'Hola '+ localStorage.nombres;
    $('#saludos').text(saludos);

  
  });
  