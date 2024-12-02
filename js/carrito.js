//variable que mantiene visible el estado del carrito

let carritoVisible = false;

//Esperamos que todos los elementos de la página se carguen
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
        }else{
            ready();
        }
function ready(){
    //funcionalidad btn-eliminar
    let botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(let i=0; i<botonesEliminarItem.length; i++){
        let button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }
}
//Elimino el item seleccionado del carrito
function eliminarItemCarrito(e){
    let buttonClicked = e.target;
    buttonClicked.parentElement.remove();
}