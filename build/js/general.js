toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }


var sweetMessage = function(icono, mensaje){
    this.toastr[icono](mensaje)
    // Toast.fire({
    //     icon: icono,
    //     title: mensaje
    // })

}

// Constante para formatear numeros
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

/**
 * Formatea un numero
 * @param {*} number 
 * @returns 
 */
var numberFormater = function(number) {
    return formatter.format(number).toString();
}

var validarLogin = function() {
    //Valida el estado de login de un usuario
}