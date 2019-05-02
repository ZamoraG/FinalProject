// '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
$(window).on("load resize ", function() {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();

function displayList(data){

	let html = "";
	let page = 1;

	for (let i = 0; i < data.user.length; i ++){
		html =	 `<td id = "${data.user[i].name}">${data.user[i].name}</td>
                    			   <td>${data.user[i].id}</td>`;
		$("#empleadosRow" + page.toString()).html(html);
        page = page + 1;
	}
}

function displayListemp(data, usuarioClick){

	let html = "";
	let page = 1;

	for (let i = 0; i < data.user.length; i ++){
		html =	 `<td id = "${data.user[i].name}">${data.user[i].usern}</td>`;
			$("#negociosRow" + page.toString()).html(html);
                	page = page + 1;
		if(usuarioClick == data.user[i].name)
			    {
			        $("#nombreReg").val(data.user[i].name);
			        $("#usuarioReg").val(data.user[i].usern);
    			    $("#usuarioReg").data( "id", data.user[i].id);
                	$("#passReg").val("");
                	$("#passConfReg").val("");
                
			    }
	}
}

LoadCompanies();

function LoadCompanies(){

	let url = '../../limpieza/api/list-users/employees';
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
			displayList(responseJSON);
		})
		.catch(err => {
			console.log(err);
		});
}

$('#empleadosContent > tr').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit
    console.log($(this).children().attr("id"));
     let usuarioClick = $(this).children().attr("id") ;
    
    $("#listaAmigos").addClass("hiddenElement");
    $("#informacionEmpleado").removeClass("hiddenElement");
    
    let url = '../../limpieza/api/list-users/employees';
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
			displayListemp(responseJSON, usuarioClick);
		})
		.catch(err => {
			console.log(err);
		});
    
});


$('#UpdateEmpleado').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit
	
	let name = $("#nombreReg").val();
	let user = $("#usuarioReg").val();
	let pswd = $("#passReg").val();
	let pswdR = $("#passConfReg").val();
	let id = $("#usuarioReg").data( "id");
	console.log("Idgot " + id);
	let error = $("#errorRegEmp");
	
	let errorFlag = false;
	
	if(name === ""){ error.text("Falta Nombre");errorFlag = true;}
	else if(user === ""){ error.text("Falta Usuario");errorFlag = true;}
	else if(pswd === ""){ error.text("Contraseña");errorFlag = true;}
	else if(pswdR === ""){ error.text("Repetir Contraseña");errorFlag = true;}
	else if(pswdR !== pswd){ error.text("Contraseñas Diferentes");errorFlag = true;}
	else{error.text(""); }
	
	if(!errorFlag)
	{

		let url = `../../limpieza/api/update-user/${id}`;
    let data = {
		name : name,
		usern : user,
		pass : pswd
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
})

$('#DeleteEmpleado').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit

	let id = $("#usuarioReg").data( "id");
	let error = $("#");

	let errorFlag = false;
	
	if(id === null){ error.text("Data Error");errorFlag = true;}
	else{error.text(""); }
	
	if(!errorFlag)
	{
	    let data = {
			id : id
		};
		let url = `../../limpieza/api/delete-user/${id}`;
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



$('#RegisterEmpleado').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit
	
	let name = $("#nombreReg").val();
	let user = $("#usuarioReg").val();
	let pswd = $("#passReg").val();
	let pswdR = $("#passConfReg").val();
	let error = $("#errorReg");
	
	let errorFlag = false;
	
	if(name === ""){ error.text("Falta Nombre");errorFlag = true;}
	else if(user === ""){ error.text("Falta Usuario");errorFlag = true;}
	else if(pswd === ""){ error.text("Contraseña");errorFlag = true;}
	else if(pswdR === ""){ error.text("Repetir Contraseña");errorFlag = true;}
	else if(pswdR !== pswd){ error.text("Contraseñas Diferentes");errorFlag = true;}
	else{error.text(""); }
	
	if(!errorFlag)
	{
	   let data = {
		usern : user,
		pass : pswd,
		name : name,
		admin : false
	};

	let url = '../../limpieza/api/post-user';
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
		})
		.catch(err => {
			console.log(err);
		});
	}
});
