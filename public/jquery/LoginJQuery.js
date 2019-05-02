

$('#RegisterPrincipal').on('click', function(event){
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
	
	if(!errorFlag){
	let data = {
		usern : user,
		pass : pswd,
		name : name,
		admin : true
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
				console.log(data);
				$("#errorReg").text("EXITO CREANDO USUARIO");
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
			console.log("ERROR");
				console.log(err);
				$("#errorReg").text(err.responseText);
		});
	}

	    /*let jsonToSend ={
						"username" : user,
						"password" : pswd,
						"name" : name,
						"action"   : "REGISTER"
					};
					
		console.log (jsonToSend);
        
		$.ajax({
			url : "./data/applicationLayer.php",
			type : "POST",
			data : jsonToSend,
			ContentType : "application/json",
			dataType : "json",
			success : function(data){
				console.log(data);
				$("#errorReg").text("EXITO CREANDO USUARIO");
			},
			error : function(error){
				console.log("ERROR");
				console.log(error);
				$("#errorReg").text(error.responseText);
			}
		});*/
	});


$('#LoginPrincipal').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit
	
	let user = $("#usuarioLog").val();
	let psw = $("#passLog").val();
	let error = $("#errorLog");
	let errorFlag = true;
	
	let checkbox = $('input[name="Remember"]:checked');
	if (checkbox.val())
	{
		checked = "TRUE";
	}
	else
	{
		checked = "FALSE";
	}
	
	
	if(user === ""){error.text("Usuario!");}
	else if(psw === ""){ error.text("Contraseña!"); }
	else { error.text("");  errorFlag = false;}
	
	if(!errorFlag)
	{

		let data ={
						usern : user,
						pass : psw
					};

		let url = `../../limpieza/api/list-users/${user}/${psw}`;
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
			window.location.href = "./home";
		})
		.catch(err => {
				console.log(err);
				$("#errorLog").text("LOGIN FALLIDO");
				$("#errorLog").text(err.responseText);
		});

	    /*let jsonToSend ={
						"username" : user,
						"password" : psw,
						"remember" : checked,
						"action"   : "LOGIN"
					};

		$.ajax({
			url : "./data/applicationLayer.php",
			type : "GET",
			data : jsonToSend,
			ContentType : "application/json",
			dataType : "json",
			success : function(data){
				console.log(data);
				
			},
			error : function(error){
				console.log(error);
				$("#errorLog").text("LOGIN FALLIDO");
				$("#errorLog").text(error.responseText);
			}
		});*/
	}
	else
	{
	    console.log("Unknown Error");
	}
})