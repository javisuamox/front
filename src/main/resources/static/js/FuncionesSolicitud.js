//arreglar validacion de fecha y que solos e vea la fecha sin horario
$(document).ready(function(){
    traerInformacionReservas();
    itemBike();
    itemClient();
    $("#update").hide();
    console.log(traerInformacionReservas());
})

function itemBike(){
    $.ajax({
        url:"http://localhost:8080/api/Bike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let mySelect="<select id='bike' class='form-control mb-3'>";
            mySelect+="<option value='null' id='select-bike'>Seleccione</option>"
            for(i=0;i<respuesta.length;i++){
                mySelect+="<option value="+respuesta[i].id+" id='bike-"+respuesta[i].id+"'>"+ respuesta[i].name+"</option>";
            }
            mySelect+="</select>"
            $("#resultado_Bike").html(mySelect); 
        }
    });
}

function itemClient(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let mySelect="<select id='client' class='form-control mb-3'>";
            mySelect+="<option value='null' id='select-client'>Seleccione</option>"
            for(i=0;i<respuesta.length;i++){
                mySelect+="<option value="+respuesta[i].idClient+" id='client-"+respuesta[i].idClient+"'>"+ respuesta[i].name+"</option>";
                
            }
            mySelect+="</select>"
            $("#resultado_Cliente").html(mySelect);
        }
    });
}

function traerInformacionReservas(){
    var objFecha = new Date;
    var dia  = objFecha.getDate();
    var mes  = objFecha.getMonth()+1;
    var ano = objFecha.getFullYear();
    $("#startDate").attr("min",ano+"-"+mes+"-"+dia)
    $("#devolutionDate").attr("min",ano+"-"+mes+"-"+dia)
    
    $.ajax({
        url:"http://localhost:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservas(respuesta);
        }
    });
}

function pintarRespuestaReservas(respuesta){
    let myTable="<table><thead><tr><th>Cliente</th><th>bike</th><th>Fecha Inicial</th><th>Fecha Entrega</th><th>Estado Reserva</th><th>Acciones</th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].bike.name+"</td>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+='<td><a id="btn-tabla" class="btn btn-danger" onclick="borrarInformacionReservas('+respuesta[i].idReservation+')" style="margin: 5px"><i class="las la-trash-alt"></i></a>'+'<a id="btn-tabla" class="btn btn-success" onclick="InformacionReservas('+respuesta[i].idReservation+')" style="margin: 5px"><i class="las la-edit"></i></a></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoReservaciones").html(myTable);
}

function fechaactual(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; 
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

//validacion de los campos
function validarcampos(){
    let estado = document.getElementById("status").value;
    let bike = document.getElementById("bike").value;
    let cliente = document.getElementById("client").value;
    let startDate = document.getElementById("startDate").value;
    let devolutionDate = document.getElementById("devolutionDate").value;
    let null1 = "null";
    let fecha = fechaactual();


    if(estado === null1 || bike === null1 || cliente === null1){
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
        if(startDate < fecha){
            console.log("error la fecha ya caduco");
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'La fecha ya paso, intenta con una fecha más reciente.',
                showConfirmButton: false,
                timer: 2000
            })
        }
        else{
            if(startDate > devolutionDate){
                console.log("error la fecha ya caduco");
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'La fecha de entrega ya paso, intenta con una fecha más reciente.',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
            else{
                console.log("campos correctos y llenos");
                guardarInformacionReservas();
                setTimeout(refrescar, 3000);
            }
        }    
    }
}

//refrescar la pagina
function refrescar(){
    location.reload();
}

function guardarInformacionReservas(){
    let var2 = {
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        bike:{"id":$("#bike").val()},
        client:{"idClient":$("#client").val()},
        status:$("#status").val()
    }

    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://localhost:8080/api/Reservation/save",
    
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
    });
}

function InformacionReservas(idElemento){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/"+idElemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            var fechaStartDate = "";
            var fechaDevolutionDate = "";
            for(i = 0; i < respuesta.startDate.length; i++){
                if(respuesta.startDate[i]=="T"){
                    break;
                }else{
                    fechaStartDate += respuesta.startDate[i];
                }
            }

            for(i = 0; i < respuesta.devolutionDate.length; i++){
                if(respuesta.devolutionDate[i]=="T"){
                    break;
                }else{
                    fechaDevolutionDate += respuesta.devolutionDate[i];
                }
            }

            $("#id").val(respuesta.idReservation),
            $("#client-"+respuesta.client.idClient).attr("selected",true),
            $("#startDate").val(fechaStartDate),
            $("#devolutionDate").val(fechaDevolutionDate),
            $("#bike-"+respuesta.bike.id).attr("selected",true),
            $("#"+respuesta.status).attr("selected",true)
            $("#save").hide()
            $("#update").show()
        }
    });
}

function editarInformacionReservas(){
    let var2 = {
        idReservation:$("#id").val(),
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        bike:{"id":$("#bike").val()},
        client:{"idClient":$("#client").val()},
        status:$("#status").val()
    }
    console.log(var2);
    $.ajax({
        type:'PUT',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://localhost:8080/api/Reservation/update",
    
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
            alert("No se edito correctamente");
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
        }
    })
    setTimeout(refrescar, 3000);
}

function borrarInformacionReservas (idElemnto){
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
                url:"http://localhost:8080/api/Reservation/"+idElemnto,
                success:function(response){
                    console.log(response);
                    console.log("Se borro correctamente");
                    window.location.reload()
                },
        
                error: function(jqXHR, textStatus, errorThrown) {
                    setTimeout(refrescar, 3000);
                    alert("No se borro correctamente");
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