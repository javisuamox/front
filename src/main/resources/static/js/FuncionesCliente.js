$(document).ready(function(){
    traerInformacionClientes();
    $("#update").hide()
    $("#id").hide()
})

//traer la informacion de la base de datos 
function traerInformacionClientes(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}

//muestra de la tabla completa
function pintarRespuestaClientes(respuesta){
    let myTable="<table><thead><tr><th>Nombre</th><th>Email</th><th>Edad</th><th>Genero</th><th>WhatsApp</th><th>Facebook</th><th>Twitter</th><th>Acciones</th></th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td>"+respuesta[i].generate+"</td>";
        myTable+="<td>"+respuesta[i].socialNetWh+"</td>";
        myTable+="<td>"+respuesta[i].socialNetFb+"</td>";
        myTable+="<td>"+respuesta[i].socialNetTw+"</td>";
        myTable+='<td><a id="btn-tabla" class="btn btn-danger" onclick="borrarInformacionClientes('+respuesta[i].idClient+')" style="margin: 5px"><i class="las la-trash-alt"></i></a>'+'<a id="btn-tabla" class="btn btn-success" onclick="InformacionCliente('+respuesta[i].idClient+')" style="margin: 5px"><i class="las la-edit"></i></a></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadocliente").html(myTable);
}

//validacion del correo
function validar_email( email ) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

//validacion de que los campos este lleno
function validarcampos(){
    let indice = document.getElementById("generate").value;
    let valor = document.getElementById("email").value;
    let null1 = "null";

    if($('#name').val().length == 0 || $('#email').val().length == 0 || $('#password').val().length == 0 || $('#age').val().length == 0 || indice === null1 || $('#socialNetWh').val().length == 0 || $('#socialNetFb').val().length == 0 || $('#socialNetTw').val().length == 0){
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
        if( validar_email( valor ) ){
            console.log("La dirección de email " + valor + " es correcta.");
            guardarInformacionClientes();
            setTimeout(refrescar, 3000);
        }
        else{
            console.log("La dirección de email es incorrecta.");
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'La dirección de email es incorrecta. ',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    
}

//refrescar la pagina
function refrescar(){
    location.reload();
}

//guardar informacion
function guardarInformacionClientes(){
    let var2 = {
        name:$("#name").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        socialNetWh:$("#socialNetWh").val(),
        age:$("#age").val(),
        generate:$("#generate").val(),
        socialNetFb:$("#socialNetFb").val(),
        socialNetTw:$("#socialNetTw").val()
        
    };
        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            url:"http://localhost:8080/api/Client/save",
        
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

//borrar informacion por id
function borrarInformacionClientes (idElemnto){
    let elemento={
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
                    url:"http://localhost:8080/api/Client/"+idElemnto,
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

function InformacionCliente(idElemento){
    $.ajax({
        url:"http://localhost:8080/api/Client/"+idElemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#id").val(respuesta.idClient),
            $("#email").val(respuesta.email),
            $("#password").val(respuesta.password),
            $("#name").val(respuesta.name),
            $("#age").val(respuesta.age),
            $("#"+respuesta.generate).attr("selected",true),
            $("#socialNetWh").val(respuesta.socialNetWh),
            $("#socialNetFb").val(respuesta.socialNetFb),
            $("#socialNetTw").val(respuesta.socialNetTw)
            $("#save").hide()
            $("#id").show()
            $("#update").show()
        }
    });
}

//edita la informacion 
function editarInformacionCliente(){
    let var2 = {
        idClient:$("#id").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        socialNetWh:$("#socialNetWh").val(),
        age:$("#age").val(),
        generate:$("#generate").val(),
        socialNetFb:$("#socialNetFb").val(),
        socialNetTw:$("#socialNetTw").val()
    };

    $.ajax({
        type:'PUT',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://localhost:8080/api/Client/update",
        
        success:function(response) {
            console.log(response);
            console.log("Se actualizo correctamente");
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


