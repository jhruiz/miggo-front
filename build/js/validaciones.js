//******************************************************validaciones */


  $('.input-numero').on('input', function () { 
      $('.input-numero').numeric();
  });

  $('.input-numero-punto').on('input', function () { 
    $('.input-numero-punto').numeric(".");
});

$('.input-numero-coma').on('input', function () { 
    $('.input-numero-coma').numeric(",");
});

$('.input-numero-negativo').on('input', function () { 
    $('.input-numero-negativo').numeric({ negative : true });
});

$('.input-numero-decimal2').on('input', function () { 
    $('.input-numero-decimal2').numeric({ decimal: ",", decimalPlaces : 2, negative : false });
});

$('.input-numero-decimal3').on('input', function () { 
    $('.input-numero-decimal3').numeric({ decimal: ",", decimalPlaces : 3, negative : false });
});

$('.input-numero-altDecimal').on('input', function () { 
    $('.input-numero-altDecimal').numeric({ altDecimal : "," });
});

$('.input-numero-msg').on('input', function () { 
    $('.input-numero-msg').numeric(null, console.log('valor correcto ejecuta funcion'));
});

$('.input-texto-espacio').bind('keypress', function(event) {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
  });

  $('.input-texto-alfanumerico').bind('keypress', function(event) {
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
   }
  });


// $('#email').validCampo('abcdefghijklmnopqrstuvwxyziou@0123456789._-');
  (function (a) {
    a.fn.validCampo=function(b){
    a(this).on({keypress:function(a){
    var c=a.which,
    d=a.keyCode,
    e=String.fromCharCode(c).toLowerCase(),
    f=b;
(-1!=f.indexOf(e)||9==d||37!=c&&37==d||39==d&&39!=c||8==d||46==d&&46!=c)&&161!=c||a.preventDefault()
}})}}( jQuery ));


// var emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$";

// $('.input-email').on('input', function () { 
//     return $('.input-email').val().match(emailPattern) ? true : false;
// });


//***************************************************validaciones imagen******************************************************************************************

function validarImagen(datos) {
    
    var dataFI = $('#imagen').prop('files')[0];

    // valida el tamaño del archivo
    if(dataFI.size > 1000000) {
        var mensaje = 'El tamaño máximo del archivo es 1MB.';
        sweetMessage('warning', mensaje);
        $('#imagen').val('');
        return false;
    }

    // valida el formato del archivo
    if((dataFI.name.split('.')['1'].toLowerCase() != 'jpg') && (dataFI.name.split('.')['1'].toLowerCase() != 'jpeg')) {
        console.log(dataFI.name.split('.')['1'].toLowerCase());
        var mensaje = 'Solo se permiten archivos en formato jpg o jpeg';
        sweetMessage('warning', mensaje);
        $('#imagen').val('');
        return false;
    }

return true;

}