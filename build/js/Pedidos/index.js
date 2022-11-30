var urlC = 'https://cotoolsback.cotools.co/public/';

/**
 * Funcion para ver el detalle del pedido
 * @param {*} data 
 */
 function verPedido(data) {
    $.ajax({
        method: "GET",
        url: '../../pages/pedidos/view.html',
        success: function(respuesta) {
            $('#content-data').html(respuesta);
            $('#pedidoId').val(data);
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      }) 
}

/**
 * Genera un array de array del objeto respueta
 * @param {*} data 
 * @returns 
 */
 var organizarDatos = function( data ) {
    var arrPedidos = [];

    // se recorre la respuesta y se genera un array de arrays.
    data.forEach(element => {
        arrPedido = [
            element.nro_pdweb,     
            element.nombre,     
            element.identificacion,     
            element.email,     
            element.descripcion,
            element.created,     
            element.id,     
        ];

        arrPedidos.push(arrPedido);
    });

    return arrPedidos;
}

/**
 * Crea el datatable con la información obtenida del API
 * @param {*} data 
 */
 var generarDataTable = function( data ) {

    $('#datatable-pedidos').DataTable( {
        data: data,        
        columns: [
            { title: "Código Pedido" },
            { title: "Cliente" },
            { title: "Identificación" },
            { title: "Email" },            
            { title: "Estado" },
            { title: "Fecha Pedido" },
            {
                "render": function ( data, type, row ) {
                    return '<i class="fas fa-eye icon-selectable center" onclick="verPedido(' + data + ')"></i>';
                },
                "orderable": false,
                "searchable": false
            }
        ],
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ], 
        "responsive": true, 
        "lengthChange": true, 
        "autoWidth": true,
        "info": true,
        "language": {
            "search": "Buscar",
            "zeroRecords": "No se encontraron registros.",
            "paginate": {
                "first": "Primer Página",
                "last": "Última Página",
                "next": ">>",
                "previous": "<<",
              },
            "info": "Mostrando página _PAGE_ de _PAGES_",
          }
    });     
}

/**
 * Obtiene todos los pedidos registrados
 */
var obtenerPedidos = function() {
    $.ajax({
        method: "GET",
        url: urlC + "get-orders",
        success: function(respuesta) {
                        
            // Valida si la respuesta es correcta para generar el data table
            if ( respuesta.estado ) {
                generarDataTable(organizarDatos(respuesta.data));    
            } else {
                sweetMessage('warning', respuesta.mensaje);
            }
            
        },
        error: function() {
            var mensaje = 'Se produjo un error. Por favor, inténtelo nuevamente'.
            sweetMessage('error', mensaje);
        }
    })    
}

$( document ).ready(function() {
    obtenerPedidos();    
});