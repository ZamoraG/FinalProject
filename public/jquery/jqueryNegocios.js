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

function display2(data, EmpresaClick){
	let html = "";
			let page = 1;

			for (let i = 0; i < data.negocio.length; i ++){
			html =	 `<td id = "${data.negocio[i].negname}">${data.negocio[i].negname}</td>
                    			   <td>${data.negocio[i].numemp}</td>`;
			$("#negociosRow" + page.toString()).html(html);
                	page = page + 1;
           	if(EmpresaClick == data.negocio[i].negname)
			    {
			        $("#EmpresaNombre").val(data.negocio[i].negname);
    			    $("#EmpresaNombre").data( "idneg", data.negocio[i].idneg);
                	$("#EmpresaDireccion").val(data.negocio[i].dirneg);
                	$("#EmpresaEmpleados").val(data.negocio[i].numemp);
                	$("#nombreNegocio").html(data.negocio[i].negname);
                	var nombreEmp = data.negocio[i].negname;
                	var idEmp = data.negocio[i].idneg;
                	nombreEmp = nombreEmp.replace(" ", "_");
                	
                	$("#text").val("https://damp-coast-14503.herokuapp.com/home/Entrada.html?id="+ idEmp +"&Emp=" + nombreEmp);
                    makeCode ();

                    LoadEntradasNegocio(nombreEmp);
			    }
			}
			
}

function display3(data){

	let html = "";
	let page = 1;

	for (let i = 0; i < data.entr.length; i ++){
		html = `   <td id = "${data.entr[i].id}">${data.entr[i].fecha}</td>
                            <td>${data.entr[i].emp}</td>
                            <td>${data.entr[i].name}</td>
                            <td>${data.entr[i].user}</td>
						`;
						
                $("#EntradasRow" + page.toString()).html(html);
                page = page + 1;
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
			display2(responseJSON, EmpresaClick);
		})
		.catch(err => {
			console.log(err);
		});
    
    
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
			idneg : id
		};
		let url = `../../limpieza/api/remove-negocio/${id}`;
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

function LoadEntradasNegocio(emp){

	let url = `../../limpieza/api/list-entrada/${emp}`;
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
			display3(responseJSON);
		})
		.catch(err => {
			console.log(err);
		});
}