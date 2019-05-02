// '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
$(window).on("load resize ", function() {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();

function displayList(data){

	let html = "";
	let page = 1;

	for (let i = 0; i < data.users.length; i ++){
		html =	 `<td id = "${data.users[i].name}">${nombre}</td>
                    			   <td>${data.users[i].id}</td>`;
		$("#empleadosRow" + page.toString()).html(html);
        page = page + 1;
	}
}

LoadCompanies();

function LoadCompanies(){

	let url = '../../limpieza/api/list-negocio/employees';
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
    /*let jsonToSend ={   "pagina"    : "1"
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
			
			jQuery.each( data, function( nombre, id ) {
			    html = `    <td id = "${nombre}">${nombre}</td>
                            <td>${id}</td>
						`;
						
                $("#empleadosRow" + page.toString()).html(html);
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

$('#empleadosContent > tr').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit
    console.log($(this).children().attr("id"));
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
