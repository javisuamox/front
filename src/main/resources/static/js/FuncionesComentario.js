$(document).ready(function(){
    traerInformacionMensaje();
    $("#update").hide();
    itemBike();
    itemCliente();
})

function itemBike(){
    $.ajax({
        url:"http://localhost:8080/api/Bike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let mySelect="<select id='bike' class='form-control mb-3'>";
            mySelect += "<option value='null' id='select-bike'>Seleccionar Bike</option>"
            for( i=0 ; i<respuesta.length ; i++ ){
                mySelect += "<option value="+respuesta[i].id+" id="+respuesta[i].id+">"+respuesta[i].name+"</option>";
            }
            mySelect += "</select>"
            $("#resultado_Bike").html(mySelect);
        }
    });
}

function itemCliente(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let mySelect="<select id='client' class='form-control mb-3'>";
            mySelect += "<option value='null' id='select-client'>Seleccionar Cliente</option>"
            for( i=0 ; i<respuesta.length ; i++ ){
                mySelect += "<option value="+respuesta[i].idClient+" id="+respuesta[i].ididClient+">"+respuesta[i].name+"</option>";
            }
            mySelect += "</select>"
            $("#resultado_Cliente").html(mySelect);
        }
    });
}

function traerInformacionMensaje(){
    $.ajax({
        url:"http://localhost:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMensaje(respuesta);
        }
    });
}

function pintarRespuestaMensaje(respuesta){
    let myTable="<table><thead><tr><th>Nombre</th><th>Bike</th><th>Comentario</th><th>Acciones</th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].bike.name+"</td>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+='<td><a id="btn-tabla" class="btn btn-danger" onclick="borrarInformacionMensaje('+respuesta[i].idMessage+')" style="margin: 5px"><i class="las la-trash-alt"></i></a>'+'<a id="btn-tabla" class="btn btn-success" onclick="InformacionMensaje('+respuesta[i].idMessage+')" style="margin: 5px"><i class="las la-edit"></i></a></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMensaje").html(myTable);
}

function validarcampos(){
    let client = document.getElementById("client").value;
    let bike = document.getElementById("bike").value;
    let null1 = "null";

    if( client === null1|| bike === null1 || $('#messageText').val().length == 0){
        console.log("campos vacios");
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Hay campos vacíos.',
            showConfirmButton: false,
            timer: 1500
        })
    }

    else{
        console.log("campos llenos");
        guardarInformacionMensaje();
            setTimeout(refrescar, 3000);
        }
}

//refrescar la pagina
function refrescar(){
    location.reload();
}

function guardarInformacionMensaje(){
    let var2 = {
        client:{"idClient":$("#client").val()},
        bike:{"id":$("#bike").val()},
        messageText:$("#messageText").val()
    };

        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            url:"http://localhost:8080/api/Message/save",
        
            success:function(response) {
                console.log(response);
                console.log("Se guardo correctamente");
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                
                Toast.fire({
                    icon: 'success',
                    title: 'Se guardo correctamente'
                    
                })
            },
        
            error: function(jqXHR, textStatus, errorThrown) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                
                Toast.fire({
                    icon: 'error',
                    title: 'No se guardo correctamente, intentalo de nuevo.'
                    
                })
                console.log("No se guardo correctamente");
            }
        })    
}


function borrarInformacionMensaje (idElemnto){
    var elemento={
        id:idElemnto
    };
    Swal.fire({
        title: 'Estas seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type:'DELETE',
                contentType: "application/json; charset=utf-8",
                dataType: 'JSON',
                data:JSON.stringify(elemento),
                url:"http://localhost:8080/api/Message/"+idElemnto,
                success:function(response){
                    console.log(response);
                    console.log("Se borro correctamente");
                    window.location.reload();
                },
            
                error: function(jqXHR, textStatus, errorThrown) {
                    setTimeout(refrescar, 3000);
                        console.log("No se borro correctamente");
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                        
                        Toast.fire({
                            icon: 'error',
                            title: 'No se borro correctamente, intentalo de nuevo.'
                            
                        })
                }
            })
        }
    })
}



function InformacionMensaje(idElemento){
    $.ajax({
        url:"http://localhost:8080/api/Message/"+idElemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#id").val(respuesta.idMessage),
            $("#"+respuesta.client.idclient).attr("selected",true),
            $("#"+respuesta.bike.id).attr("selected",true),
            $("#messageText").val(respuesta.messageText)
            $("#save").hide()
            $("#update").show()
        }
    });
}

function editarInformacionMensaje(){
    let var2 = {
        idMessage:$("#id").val(),
        client:{"idClient":$("#client").val()},
        bike:{"id":$("#bike").val()},
        messageText:$("#messageText").val()
    }
        console.log(var2);
        $.ajax({
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            url:"http://localhost:8080/api/Message/update",
        
            success:function(response) {
                console.log(response);
                console.log("Se edito correctamente");
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                    
                Toast.fire({
                    icon: 'success',
                    title: 'Se actualizo correctamente'
                        
                })
            },
        
            error: function(jqXHR, textStatus, errorThrown) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                
                Toast.fire({
                    icon: 'error',
                    title: 'No se actualizo correctamente, intentalo de nuevo.'
                        
                })
                console.log("No se actualizo correctamente");
            }
        })   
        setTimeout(refrescar, 3000);
    }