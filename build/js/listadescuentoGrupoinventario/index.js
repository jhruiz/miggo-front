
var organizarDatos = function( data ) {  
  var arrListadescuentos = [];
var i = 0;
  // se recorre la respuesta y se genera un array de arrays.
  data.data.forEach(element => {
      arrListadescuento = [
          element.descripcion,
          data.count[i],

      ];


      if(localStorage.nivelperfil >= 1){
        arrListadescuento.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verListadecuentoGrupo('+ element.id+ ','+ data.count[i] +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarListadecuentoGrupo('+ element.id + ')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> </div>'); 

      }else if(localStorage.nivelperfil == 0){
        arrListadescuento.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verListadecuentoGrupo('+ element.id+ ','+ data.count[i] +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; </div>'); 

      }

      arrListadescuentos.push(arrListadescuento);
      i++;
  });

  return arrListadescuentos;
}


var generarDataTable = function( dataSet ) {

$("#example1").DataTable({
  data: dataSet,
  columns: [
          { title: "Lista Descuentos" },
          { title: "Cantidad Grupo de Inventario" },
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

var url = 'todaslistadescuentos';

  $.ajax({
          method: "GET",
          url: url_back + url,
          headers: { 
              Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: 'json',
          success: function(respuesta) {
              generarDataTable(organizarDatos(respuesta));
          },
          error: function() {
              var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde o la tabla esta vacia';
              sweetMessage('error', mensaje);
          }
      }) 

}

function editarListadecuentoGrupo(id){//render al editar
var url_edit = 'listadescuentoGrupoinventario/edit.html';

$('#main_content').load(url_front + url_edit);
  localStorage.setItem('editar', id);
}

function verListadecuentoGrupo(id, count){
if(count){
    $('#mymodal').html('');
    localStorage.setItem('ver', id);
    $('#mymodal').load('../listadescuentoGrupoinventario/show.html',function(){
          $('#exampleModalLong').modal({show:true});
      });
}else{
    var mensaje = 'No tiene partes asignadas, inténtelo mas tarde.';
    sweetMessage('info', mensaje);
}

}


$( document ).ready(function() {
$('.preloader').hide("slow");
validarLogin();

infoTable(); 

var saludos = 'Hola '+ localStorage.nombres;
$('#saludos').text(saludos);

});
