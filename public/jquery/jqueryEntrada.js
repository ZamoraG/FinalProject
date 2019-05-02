// '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
$(window).on("load resize ", function() {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();

LoadCompanies();


function LoadCompanies()
	{
		var parameters = location.search.substring(1).split("&");

		var temp = parameters[0].split("=");
		//l = unescape(temp[1]);

		temp = parameters[1].split("=");
		//c = unescape(temp[1]);

		//$("#EmpresaEntrada").html(c);
	}
addComment();



$('#RegisterEmpleado').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit
	
	let user = $("#usuarioReg").val();
	let name = $("#nameReg").val();
	let name = $("#empReg").val();
	let error = $("#errorRegEnt");
	
	let errorFlag = false;
	
	if(user === ""){ error.text("Falta Usuario");errorFlag = true;}
	else if(name === ""){ error.text("falta Nombre del usuario");errorFlag = true;}
	else if(emp === ""){ error.text("falta Nombre de la empresa");errorFlag = true;}
	else{error.text(""); }
	
	if(!errorFlag)
	{

		let data = {
		user: user,
		name: name
	};

	let url = '../../limpieza/api/post-entrada';
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
			alert("EXITO REGISTRANDO ENTRADA");
		})
		.catch(err => {
			console.log(err);
		});
	}
})

