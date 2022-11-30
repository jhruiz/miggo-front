var urlC = 'https://cotoolsback.cotools.co/public/';
var estadoPedidoId = "";

/**
 * Crea el select con los estados configurados en cotools
 * @param {*} data 
 */
 var crearSelectEstadoPedido = function( data ) {

    var htmlSelStates = '<label for="estadosPedido">Estados</label>';
    htmlSelStates += '<select class="custom-select" id="estadosPedido" onchange="actualizarEstadoPedido()">';

    data.forEach(element => {
        selected = estadoPedidoId == element.id ? 'selected' : '';
        htmlSelStates += '<option value="' + element.id + '" ' + selected + '>' + element.descripcion + '</option>';
    });

    htmlSelStates += '</select>';

    $('#cmb-states').html(htmlSelStates);  
}

/**
 * Obtiene los estados del pedido configurados en la base de datos de cotools
 */
var obtenerEstadosPedido = function() {

    $.ajax({
        method: "GET",
        url: urlC + "get-status-order",
        success: function(respuesta) {
                        
            // Valida si la respuesta es correcta para generar el data table
            if ( respuesta.estado ) {
                crearSelectEstadoPedido(respuesta.data);                
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

/**
 * Setea la cabecera de los datos del pedido
 * @param {*} data 
 */
var setCabeceraPedido = function( data ) {
    // Obtiene la fecha actual y setea la factura
    var date = new Date();
    var dia = date.getDate();
    var mes = date.getMonth() + 1;
    var anio = date.getFullYear();
    $('#fechaActual').append(dia + '-' + mes + '-' + anio);
    $('#codigo-factura').append(data['0'].nro_pdweb);
    $('#cod-cliente').append(data['0'].cod_benf);
    $('#nombre-cliente').append(data['0'].nombre);
    $('#ident-cliente').append(data['0'].identificacion);
    $('#fecha-pedido').append(data['0'].fechaPedido);
}

/**
 * Setea los datos de los items en la tabla
 * @param {*} data 
 */
var setDatosItems = function( data ) {
    var infoDetalle = "";
    data.forEach(element => {
        infoDetalle += '<tr>';
        infoDetalle += '<td>' + element.descripcion + '</td>';
        infoDetalle += '<td class="text-center">' + element.cantidad + '</td>';
        infoDetalle += '<td class="text-right">' + numberFormater(element.precioventaunit) + '</td>';
        infoDetalle += '<td class="text-center">' + element.tasaiva + '</td>';
        infoDetalle += '<td class="text-right">' + numberFormater(element.baseTtal) + '</td>';
        infoDetalle += '</td>';
    });
    
    $('#detalle-pedido').html(infoDetalle);
}

/**
 * Setea la información del pago del pedido
 * @param {*} ttles 
 */
var setTtalesPedido = function( ttles ) {
    var htmlDetPag = "";

    htmlDetPag += '<tr>';
    htmlDetPag += '<th colspan="4" class="text-right">Subtotal neto</th>';
    htmlDetPag += '<td class="text-right">' + numberFormater(ttles['2']) + '</td>';
    htmlDetPag += '</tr>';

    htmlDetPag += '<tr>';
    htmlDetPag += '<th colspan="4" class="text-right">IVA</th>';
    htmlDetPag += '<td class="text-right">' + numberFormater(ttles['3']) + '</td>';
    htmlDetPag += '</tr>';

    htmlDetPag += '<tr>';
    htmlDetPag += '<th colspan="4" class="text-right">Total a pagar</th>';
    htmlDetPag += '<td class="text-right">' + numberFormater(ttles['4']) + '</td>';
    htmlDetPag += '</tr>';
    
    $('#detalle-ttles').html(htmlDetPag);    
}



/**
 * Setea toda la informacion del pedido a detalle
 * @param {*} data 
 */
var setDatosPedido = function(respuesta) {

    setCabeceraPedido(respuesta.data);

    setDatosItems(respuesta.data);

    setTtalesPedido(respuesta.ttles);

}

/**
 * Obtiene la informacion de un pedido registrado en la base de datos
 */
var obtenerInfoPedido = function() {
    var pedidoId = $('#pedidoId').val();

    $.ajax({
        method: "GET",
        url: urlC + "get-order-details",
        data: { pedidoId: pedidoId },
        async: false,
        success: function(respuesta) {
            estadoPedidoId = respuesta.data['0'].estadoId;
                        
            // Valida si la respuesta es correcta para generar el data table
            if ( respuesta.estado ) {
                setDatosPedido( respuesta );
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
    obtenerInfoPedido();
    obtenerEstadosPedido();
});