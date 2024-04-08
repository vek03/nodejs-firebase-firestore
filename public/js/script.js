function deletar(id){
    if(confirm("Deseja realmente deletar este registro?")){
        document.getElementById('form'+id).submit();
    }
}

function editar(id){
    window.location.href = "/editar/"+id;
}