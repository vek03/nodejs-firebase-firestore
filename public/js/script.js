var CAMPOS = [
    'nome',
    'telefone',
    'origem',
    'data_contato',
    'observacao'
];

var CAMPOS_TAMANHO = [
    1,
    9,
    1,
    1,
    1
]


window.onload = function() {
    verificarAlerts();
    $('#telefone').inputmask('(99) 9 9999-9999');
};



function validateForm(){
    validarCampos(CAMPOS);

    var validate = [];
    
    validate.push(validateCamposVazios(CAMPOS));
    //validate.push(validateTamanhoCampos(CAMPOS, CAMPOS_TAMANHO));

    console.log(validate.length)

    if(validate.length > 0){
        Swal.fire({
            title: 'Erro de Validação!',
            text: 'Confira os erros de Validação: \n' + invalidarCampos(validate),
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#FF0000',
            confirmButtonText: 'Ok!',
        })
    }

    return false
}


function invalidarCampos(validate){
    var erros;

    for(var i=0; i < validate.length; i++){
        for(var j=0; i < validate[i].length; j++){
            $('#' + validate[i]['id']).addClass('is-invalid');
            erros += '\n' + validate[i]['message'];
        }
    }

    return erros;
}


function validarCampos(campos){
    for(var i=0; i < campos.length; i++){
        $('#' + campos[i]).removeClass('is-invalid');
    }
}

function validateCamposVazios(campos){
    var validate = [];

    for(var i=0; i < campos.length; i++){
        //console.log($('#data_contato').val().length === 0)
        if($('#' + campos[i]).val().length === 0){
            validate.push({id: campos[i], message: 'O ' + capitalizarFirst(campos[i]) + ' deve ser preenchido!'});
        }
    }

    return validate;
}

function capitalizarFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


function validateTamanhoCampos(campos, campos_tamanho){
    var attr = $('#' + telefone).val().replace(' ', '').replace('_', '').replace('-', '');
    var validate;

    for(var i=0; i < campos.length; i++){
        var attr = $('#' + campos[i]).val().replace(' ', '').replace('_', '').replace('-', '');

        if(attr != campos_tamanho[i]){
            validate.push({id: campos[i], message: 'O ' + capitalizarFirst(campos[i]) + ' deve ter ' + campos_tamanho[i] + '!'});
        }
    }

    return validate;
}



function confirmDelete(key){
    Swal.fire({
        title: 'Tem certeza?',
        text: 'Você realmente deseja deletar este registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FF0000',
        cancelButtonColor: '#808080',
        confirmButtonText: 'Deletar!',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
            await fetch('/deletar/' + key, {
                method: 'POST'
            })
            .then(response => console.log('Success!'))
            .catch(error => console.error('Error: ', error));
            
            window.location.reload();
        }
      });
}


function verificarAlerts(){
    checkError();
    checkSuccess();
}



function checkError() {
    fetch('/getError')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error,
                });
            }
        })
        .catch(error => console.error('Error:', error));
}

function checkSuccess() {
    fetch('/getSuccess')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: data.success,
                });
            }
        })
        .catch(error => console.error('Error:', error));
}