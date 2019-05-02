
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let negoSchema = mongoose.Schema({
	idneg : {type : Number, required : true, unique : true},
	negname : {type : String, required : true},
	dirneg : {type : String, required : true},
	numemp : {type: Number, required : true}
});


let Negocios = mongoose.model('Negocios', negoSchema);


const ListNego = {
	get : function(){
		return Negocios.find()
			.then(negocio => {
				return negocio;
			})
			.catch(err => {
				 throw new Error(err);
			});
	},
	post : function(newNego){
		return Negocios.create(newNego)
			.then(negocio => {
				return negocio;
			})
			.catch(err => {
				 throw new Error(err);
			});
	},
	getByName : function(negocioId){
		return Negocios.findOne({negname : negocioId})
			.then(negocio => {
				if (negocio){
					return negocio;
				}
				throw new Err("Negocio no encontrado");
			})
			.catch(err =>{
				throw new Error(err);
			});
	},
	put : function(negocioId, name, dir, num){
        return Negocios.findOneAndUpdate({idneg: negocioId}, {$set:{negname: name, dirneg: dir, numemp: num}})
            .then(negocio => {
                return negocio;
            })
            .catch(err => {
                throw new Error(err);
            }); 
    },
	delete : function(negocioId){
		return Negocios.findOneAndRemove({idneg: negocioId})
			.then(negocio => {
				if (negocio){
					return negocio;
				}
				throw new Err("Negocio no encontrado");
			})
			.catch(err => {
				throw new Error(err);
			})
	}
}

module.exports = {ListNego};