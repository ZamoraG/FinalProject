
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let userSchema = mongoose.Schema({
	id : {type : Number, required : true, unique : true},
	usern : {type : String, required : true},
	name : {type : String, required : true},
	pass : {type: String, required : true},
	admin : {type: Boolean, required : false}
});

let Users = mongoose.model('Users', userSchema);

const ListUsers = {
	get : function(){
		return Users.find()
			.then(user => {
				return user;
			})
			.catch(err => {
				 throw new Error(err);
			});
	},
	post : function(newUser){
		return Users.create(newUser)
			.then(user => {
				return user;
			})
			.catch(err => {
				 throw new Error(err);
			});
	},
	getByName : function(userId, userpass){
		return Users.findOne({usern : userId})
			.then(user => {
				if (user){
					if(user.pass == userpass){
							return user;
						}
						throw new Err("Incorrect Password");
				}
				throw new Err("User not found");
			})
			.catch(err =>{
				throw new Error(err);
			});
	},
	getemploy : function(){
		return Users.find({admin: false}).then(user => {
			if(user){
				return user;
			}
			console.log("No existen empleados");
			}).catch(err =>{
				throw new Error(err);
			});
		},
	put : function(userId, newData){
		return Users.findOneAndUpdate({id : userId}, { $set: newData }, { new: true })
			.then(user => {
				if (user){
					return user;
				}
				throw new Err("User not found");
			})
			.catch(err =>{
				throw new Error(err);
			});
	},
	delete : function(userId){
		return Users.findOneAndRemove({id : userId})
			.then(user => {
				if (user){
					return user;
				}
				throw new Err("User not found");
			})
			.catch(err => {
				throw new Error(err);
			})
	}
}

module.exports = {ListUsers};





