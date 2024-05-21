window.onload = function() {
    verificarAlerts();
};



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