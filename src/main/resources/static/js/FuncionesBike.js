$(document).ready(function(){
    traerInformacionBike();
    $("#update").hide()
    $("#id").hide()
})

//traer la info de la tabla
function traerInformacionBike(){
    $.ajax({
        url:"http://localhost:8080/api/Bike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaBike(respuesta);
        }
    });
}

//mostrar la tabla
function pintarRespuestaBike(respuesta){
    let myTable="<table><thead><tr><th>Nombre</th><th>Marca</th><th>Año</th><th>Descripción</th><th>Acciones</th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+='<td><a id="btn-tabla" class="btn btn-danger" onclick="borrarInformacionBike('+respuesta[i].id+')" style="margin: 5px"><i class="las la-trash-alt"></i></a>'+'<a id="btn-tabla" class="btn btn-success" onclick="InformacionBike('+respuesta[i].id+')" style="margin: 5px"><i class="las la-edit"></i></a></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoBike").html(myTable);
}

//validacion de que los campos este lleno
function validarcampos(){
    if($('#name').val().length == 0 || $('#brand').val().length == 0 || $('#year').val().length == 0 || $('#description').val().length == 0){
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
            guardarInformacionBike()
            setTimeout(refrescar, 3000);
    }

    
}

//refrescar la pagina
function refrescar(){
    location.reload();
}

function guardarInformacionBike(){
    let var2 = {
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val()
    };

        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            url:"http://localhost:8080/api/Bike/save",
        
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
                console.log("No se guardo correctamente")
            }
        });
}

function borrarInformacionBike (idElemnto){
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
                url:"http://localhost:8080/api/Bike/"+idElemnto,
                success:function(response){
                    console.log(response);
                    console.log("Se borro correctamente");
                    window.location.reload()
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

function InformacionBike(idElemento){
    $.ajax({
        url:"http://localhost:8080/api/Bike/"+idElemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#id").val(respuesta.id),
            $("#name").val(respuesta.name),
            $("#brand").val(respuesta.brand),
            $("#year").val(respuesta.year),
            $("#description").val(respuesta.description)
            $("#save").hide()
            $("#update").show()
            
        }
    });
}

function editarInformacionBike(){
    let var2 = {
        id:$("#id").val(),
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val()
    }

        $.ajax({
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            url:"http://localhost:8080/api/Bike/update",
        
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
                alert("No se edito correctamente");
            }
        });
        setTimeout(refrescar, 3000);
}