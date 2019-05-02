// '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
$(window).on("load resize ", function() {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();

function displayNeg(data){

	let html = "";
	let page = 1;

	for (let i = 0; i < data.negocio.length; i ++){
		html =	 `<td id = "${data.negocio[i].negname}">${data.negocio[i].negname}</td>
                    			   <td>${data.negocio[i].numemp}</td>`;
		$("#negociosRow" + page.toString()).html(html);
                page = page + 1;
	}
}

function display2(data){
	let html = "";
			let page = 1;

			for (let i = 0; i < data.negocio.length; i ++){
			html =	 `<td id = "${data.negocio[i].negname}">${data.negocio[i].negname}</td>
                    			   <td>${data.negocio[i].numemp}</td>`;
			$("#negociosRow" + page.toString()).html(html);
                	page = page + 1;
			}
			if(EmpresaClick == nombreEmp)
			    {
			        $("#EmpresaNombre").val(nombreEmp);
    			    $("#EmpresaNombre").data( "idneg", idEmp);
                	$("#EmpresaDireccion").val(direccion);
                	$("#EmpresaEmpleados").val(empleados);
                	$("#nombreNegocio").html(nombreEmp);
                	
                	nombreEmp = nombreEmp.replace(" ", "_");
                	
                	$("#text").val("medicalendar.net/Limpieza/data/Mirror.php?local=" + idEmp + "&Emp=" + nombreEmp);
                    makeCode ();
			    }
}

LoadCompanies();

function LoadCompanies(){
    let url = '../../limpieza/api/list-negocio';
	let settings = {
		method : 'GET',
		headers : {
			'Content-Type' : 'application/json'
		}
	};

	fetch(url, settings)
		.then(response => {
			if (response.ok){
				return response.json();
			}
			throw new Error(response.statusText);
		})
		.then(responseJSON => {
			displayNeg(responseJSON);
		})
		.catch(err => {
			console.log(err);
		});
    /*let jsonToSend ={   "pagina"    : "1",
					    "action"    : "GETCOMPANIES"
	};

	$.ajax({
		url : "../data/applicationLayer.php",
		type : "GET",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success : function(data){
			console.log(data);
			let html = "";
			let page = 1;
			
			jQuery.each( data, function( nombre, empresa ) {
			    let pos = empresa.indexOf("|");
			    let empleados = empresa.substring(0, pos);
			    pos = nombre.indexOf("|");
			    let nombreEmp = nombre.substring(0, pos);
			    
			    html = `    <td id = "${nombreEmp}">${nombreEmp}</td>
                            <td>${empleados}</td>
						`;
						
                $("#negociosRow" + page.toString()).html(html);
                page = page + 1;
            });
		},
		error : function(error){
			console.log("ERROR");
			console.log(error);
			$("#errorPHP").text(error.responseText);
			$("#exitoPHP").text("");
		}
	});*/
}

$('#negociosContent > tr').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit
    console.log($(this).children().attr("id"));
    
    let EmpresaClick = $(this).children().attr("id") ;
    
    $("#ListaEmpresas").addClass("hiddenElement");
    $("#EmpresaData").removeClass("hiddenElement");
    
    let url = '../../limpieza/api/list-negocio';
	let settings = {
		method : 'GET',
		headers : {
			'Content-Type' : 'application/json'
		}
	};

	fetch(url, settings)
		.then(response => {
			if (response.ok){
				return response.json();
			}
			throw new Error(response.statusText);
		})
		.then(responseJSON => {
			display2(responseJSON);
		})
		.catch(err => {
			console.log(err);
		});
    
    /*let jsonToSend ={   "pagina"    : "1",
					    "action"    : "GETCOMPANIES"
	};

	$.ajax({
		url : "../data/applicationLayer.php",
		type : "GET",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success : function(data){
			console.log(data);
			let html = "";
			let page = 1;
			
			jQuery.each( data, function( nombre, empresa ) {
			    let pos = empresa.indexOf("|");
			    let empleados = empresa.substring(0, pos);
			    let direccion = empresa.substring(pos + 1);
			    pos = nombre.indexOf("|");
			    let nombreEmp = nombre.substring(0, pos);
			    let idEmp = nombre.substring(pos + 1);
			    
			    if(EmpresaClick == nombreEmp)
			    {
			        $("#EmpresaNombre").val(nombreEmp);
    			    $("#EmpresaNombre").data( "id", idEmp);
                	$("#EmpresaDireccion").val(direccion);
                	$("#EmpresaEmpleados").val(empleados);
                	$("#nombreNegocio").html(nombreEmp);
                	
                	nombreEmp = nombreEmp.replace(" ", "_");
                	
                	$("#text").val("medicalendar.net/Limpieza/data/Mirror.php?local=" + idEmp + "&Emp=" + nombreEmp);
                    makeCode ();
			    }
            });
		},
		error : function(error){
			console.log("ERROR");
			console.log(error);
			$("#errorPHP").text(error.responseText);
			$("#exitoPHP").text("");
		}
	});*/ 
});

$('#RegisterNegocio').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit
	
	let name = $("#EmpresaNombre").val();
	let dir = $("#EmpresaDireccion").val();
	let num = $("#EmpresaEmpleados").val();
	let error = $("#errorRegEmp");

	let errorFlag = false;
	
	if(name === ""){ error.text("Falta Nombre");errorFlag = true;}
	else if(dir === ""){ error.text("Falta Direccion");errorFlag = true;}
	else if(num === ""){ error.text("Falta Empleados");errorFlag = true;}
	else{error.text(""); }
	
	if(!errorFlag)
	{
		let data = {
		negname: name,
		dirneg : dir,
		numemp : num,
	};

	let url = '../../limpieza/api/post-negocio';
	let settings = {
						method : 'POST',
						headers : {
							'Content-Type' : 'application/json'
						},
						body : JSON.stringify(data)
					};

	fetch(url, settings)
		.then(response => {
			if (response.ok){
				return response.json();
			}
			else{
				return new Promise(function(resolve, reject){
					resolve(response.json());
				})
				.then(data =>{
					throw new Error(data.message);
				})
			}
		})
		.then(responseJSON => {
			alert("Exito Registrando " + name);
		})
		.catch(err => {
			console.log(err);
		});
	    /*let jsonToSend ={
						"name" : name,
						"address" : dir,
						"employees" : num,
						"action"   : "REGISTEREMPRESA"
					};
        
		$.ajax({
			url : "../data/applicationLayer.php",
			type : "POST",
			data : jsonToSend,
			ContentType : "application/json",
			dataType : "json",
			success : function(data){
				console.log(data);
				$("#error").text("EXITO REGISTRANDO EMPRESA");
				alert("Exito Registrando " + name);
			},
			error : function(error){
				console.log("ERROR");
				console.log(error);
				$("#error").text(error.responseText);
			}
		});*/
	}
});

$('#UpdateNegocio').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit
	
	let name = $("#EmpresaNombre").val();
	let dir = $("#EmpresaDireccion").val();
	let num = $("#EmpresaEmpleados").val();
	let id = $("#EmpresaNombre").data( "idneg");
	let error = $("#errorRegEmp");

	let errorFlag = false;
	
	if(name === ""){ error.text("Falta Nombre");errorFlag = true;}
	else if(dir === ""){ error.text("Falta Direccion");errorFlag = true;}
	else if(num === ""){ error.text("Falta Empleados");errorFlag = true;}
	else if(id === null){ error.text("Data Error");errorFlag = true;}
	else{error.text(""); }
	
	if(!errorFlag)
	{
		let url = `../../limpieza/api/update-negocio/${id}`;
    let data = {
		negname : name,
		dirneg : dir,
		numemp : num
	};
    let settings = {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    }

    fetch(url, settings)
		.then(response => {
			if (response.ok){
				return response.json();
			}
			else{
				return new Promise(function(resolve, reject){
					resolve(response.json());
				})
				.then(data =>{
					throw new Error(data.message);
				});
			}
		})
		.then(responseJSON => {
			alert("Exito Actualizando " + name);
		})
		.catch(err => {
            alert(err.message);
			console.log(err);
		});
	    /*let jsonToSend ={
	                    "id" : id,
						"name" : name,
						"address" : dir,
						"employees" : num,
						"action"   : "UPDATEEMPRESA"
					};
        
		$.ajax({
			url : "../data/applicationLayer.php",
			type : "PUT",
			data : jsonToSend,
			ContentType : "application/json",
			dataType : "json",
			success : function(data){
				console.log(data);
				alert("Exito Actualizando " + name);
			},
			error : function(error){
				console.log("ERROR");
				console.log(error);
				$("#error").text(error.responseText);
			}
		});*/
	}
});

$('#DeleteNegocio').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit

	let id = $("#EmpresaNombre").data( "idneg");
	let error = $("#errorRegEmp");

	let errorFlag = false;
	
	if(id === null){ error.text("Data Error");errorFlag = true;}
	else{error.text(""); }
	
		if(!errorFlag)
		{
			let data = {
			id : id
		};
		let url = `../../limpieza/api/delete-negocio/${id}`;
		let settings = {
							method : 'DELETE',
							headers : {
								'Content-Type' : 'application/json'
							},
							body : JSON.stringify(data)
						};

		fetch(url, settings)
			.then(response => {
				if (response.ok){
					return response.json();
				}
				else{
					return new Promise(function(resolve, reject){
						resolve(response.json());
					})
					.then(data =>{
						throw new Error(data.message);
					})
				}
			})
			.then(responseJSON => {
				window.location.href = "./index.html";
			})
			.catch(err => {
				console.log(err);
			});
	    /*let jsonToSend ={
	                    "id" : id,
						"action"   : "DELETEEMPRESA"
					};
        
		$.ajax({
			url : "../data/applicationLayer.php",
			type : "PUT",
			data : jsonToSend,
			ContentType : "application/json",
			dataType : "json",
			success : function(data){
				console.log(data);
				window.location.href = "./index.html";
			},
			error : function(error){
				console.log("ERROR");
				console.log(error);
				$("#error").text(error.responseText);
			}
		});*/
	}
});


function makeCode () {		
	var elText = document.getElementById("text");
	
	if (!elText.value) {
		alert("Input a text");
		elText.focus();
		return;
	}
	
	qrcode.makeCode(elText.value);
}

/*function LoadEntradasNegocio($Empresa){
    let jsonToSend ={   "idPag"     : $Empresa,
                        "pagina"    : "1",
					    "action"    : "GETENTREESEMPRESA"
	};

    console.log(jsonToSend);
    
	$.ajax({
		url : "../data/applicationLayer.php",
		type : "GET",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success : function(data){
			console.log(data);
			let html = "";
			let page = 1;
			
			jQuery.each( data, function( indice, arreglo ) {
			    html = `   <td id = "${arreglo["ID"]}">${arreglo["Fecha"]}</td>
                            <td>${arreglo["Empresa"]}</td>
                            <td>${arreglo["Nombre"]}</td>
                            <td>${arreglo["User"]}</td>
						`;
						
                $("#EntradasRow" + page.toString()).html(html);
                page = page + 1;
            });
		},
		error : function(error){
			console.log("ERROR");
			console.log(error);
			$("#errorPHP").text(error.responseText);
			$("#exitoPHP").text("");
		}
	});
}*/