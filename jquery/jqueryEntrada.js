// '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
$(window).on("load resize ", function() {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();

LoadCompanies();

function LoadCompanies(){
    
    let jsonToSend ={   "action"    : "GETREGISTRATIONDATA"
	};

	$.ajax({
		url : "../data/applicationLayer.php",
		type : "GET",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success : function(data){
			console.log(data);
            
            jQuery.each( data, function( id, empresa ) {
                $("#EmpresaEntrada").html(empresa);
            });

		},
		error : function(error){
			console.log("ERROR");
			console.log(error);
			$("#errorRegEnt").text("ERROR");
		}
	});
}

$('#RegisterEmpleado').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit
	
	let user = $("#usuarioReg").val();
	let pswd = $("#passReg").val();
	let error = $("#errorRegEnt");
	
	let errorFlag = false;
	
	if(user === ""){ error.text("Falta Usuario");errorFlag = true;}
	else if(pswd === ""){ error.text("Contraseña");errorFlag = true;}
	else{error.text(""); }
	
	if(!errorFlag)
	{
	    let jsonToSend ={
						"username" : user,
						"password" : pswd,
						"action"   : "REGISTERENTRY"
					};
					
		console.log (jsonToSend);
        
		$.ajax({
			url : "../data/applicationLayer.php",
			type : "POST",
			data : jsonToSend,
			ContentType : "application/json",
			dataType : "json",
			success : function(data){
				console.log(data);
				alert("EXITO REGISTRANDO ENTRADA");
			},
			error : function(error){
				console.log("ERROR");
				console.log(error);
				$("#errorRegEnt").text(error.responseText);
			}
		});
	}
})

