// '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
$(window).on("load resize ", function() {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();

function display3(data){

	let html = "";
	let page = 1;

	for (let i = 0; i < data.entr.length; i ++){
		html = `   <td id = "${data.entr.id}">${data.entr.fecha}</td>
                            <td>${data.entr.emp}</td>
                            <td>${arreglo[data.entr.name]}</td>
                            <td>${arreglo[data.entr.user]}</td>
						`;
						
                $("#EntradasRow" + page.toString()).html(html);
                page = page + 1;
		}
}

LoadEntradas();

function LoadEntradas(){
	
	let url = `../../limpieza/api/list-entrada/`;

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

$('#empleadosContent > tr').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit
	console.log("AUCH");
    console.log($(this).children().attr("id"));
});

