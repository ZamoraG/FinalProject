
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let entSchema = mongoose.Schema({
	id : {type : Number, required : true, unique : true},
	name : {type : String, required : true},
	user : {type : String, required : true},
	emp : {type : String, required : true},
	idemp : {type: Number, required : false},
	fecha : {type: String, required : true}
});


let Entradas = mongoose.model('Entradas', entSchema);


const ListEnt = {
	get : function(){
		return Entradas.find()
			.then(entr => {
				return entr;
			})
			.catch(err => {
				 throw new Error(err);
			});
	},
	post : function(newNego){
		return Entradas.create(newNego)
			.then(entr => {
				return entr;
			})
			.catch(err => {
				 throw new Error(err);
			});
	},
	getByEmp : function(entrId){
		return Entradas.find({idemp : entrId})
			.then(entr => {
				if (entr){
					return entr;
				}
				throw new Err("entr no encontrado");
			})
			.catch(err =>{
				throw new Error(err);
			});
	}
}

module.exports = {ListEnt};