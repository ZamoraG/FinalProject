const express = require('express');
const router = express.Router();
const {ListUsers} = require('./model');
const {ListNego} = require('./model2');


router.get('/list-users', (req, res, next) => {

	ListUsers.get()
	.then( user => {
		res.status(200).json({
			message : 'Successfully sending the list of users',
			status : 200,
			user : user
		});
	}).catch( err => {
		res.status(500).json({
			message : `Internal server error.`,
			status : 500
		});
		return next();

	});
});

router.get('/list-users/employees', (req, res, next) => {

	ListUsers.getemploy()
	.then( user => {
		res.status(200).json({
			message : 'Successfully sending the list of users',
			status : 200,
			user : user
		});
	}).catch( err => {
		res.status(500).json({
			message : `Internal server error.`,
			status : 500
		});
		return next();

	});
});

router.post('/post-user', (req, res, next) => {
	
	let requiredFields = ['usern', 'name', 'pass'];

	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			});
			return next();
		}
	}

	var val = Math.floor(1000 + Math.random() * 9000);
	console.log(val);

	let objectToAdd = {
		id: val,
		usern: req.body.usern,
		name: req.body.name,
		pass: req.body.pass,
		admin: req.body.admin
	};

	console.log(objectToAdd);
	ListUsers.post(objectToAdd)
		.then(sport => {
			res.status(201).json({
				message : "Successfully added the user",
				status : 201,
			});
		})
		.catch( err => {
			res.status(400).json({
				message : `${err}`,
				status : 400
			});
			return next();
		});
});

router.get('/list-users/:usern/:pass', (req, res) => {
	let userId = req.params.usern;
	let userpass = req.params.pass;

	ListUsers.getByName(userId, userpass)
		.then(user => {
			res.status(200).json({
				message : "Successfully sent the user",
				status : 200,
				sport : user
			});
		})
		.catch(err => {
			res.status(404).json({
				message : "User not found in the list " + userId + " " + userpass,
				status : 404
			});
		});
});

router.delete('/remove-user/:usern', (req, res) => {
	let negoId = req.params.idneg;
   
    ListNego.delete(negoId)
		.then(negocio => {
			res.status(200).json({
				message : "Successfully deleted the business.",
				status : 200,
				negocio: negocio
			});
		})
		.catch(err => {
			res.status(404).json({
				message : "Business not found in the list.",
				status : 404
			});
			return next();
		});
});

router.get('/list-negocio', (req, res, next) => {

	ListNego.get()
	.then( negocio => {
		res.status(200).json({
			message : 'Successfully sending the list of bussiness',
			status : 200,
			negocio : negocio
		});
	}).catch( err => {
		res.status(500).json({
			message : `Internal server error.`,
			status : 500
		});
		return next();

	});
});


router.post('/post-negocio', (req, res, next) => {
	
	let requiredFields = ['negname', 'dirneg', 'numemp'];

	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			});
			return next();
		}
	}

	var val = Math.floor(1000 + Math.random() * 9000);
	console.log(val);

	let objectToAdd = {
		idneg : val,
		negname: req.body.negname,
		dirneg: req.body.dirneg,
		numemp : req.body.numemp
	};

	console.log(objectToAdd);
	ListNego.post(objectToAdd)
		.then(sport => {
			res.status(201).json({
				message : "Successfully added the bussiness",
				status : 201,
			});
		})
		.catch( err => {
			res.status(400).json({
				message : `${err}`,
				status : 400
			});
			return next();
		});
});

router.get('/list-negocio/:name', (req, res) => {
	let negoId = req.params.name;

	ListNego.getByName(negoId)
		.then(user => {
			res.status(200).json({
				message : "Successfully sent the bussiness",
				status : 200
			});
		})
		.catch(err => {
			res.status(404).json({
				message : "Business not found in the list",
				status : 404
			});
		});
});

router.delete('/remove-negocio/:idneg', (req, res) => {
	let negoId = req.params.idneg;
   
    ListNego.delete(negoId)
		.then(negocio => {
			res.status(200).json({
				message : "Successfully deleted the business.",
				status : 200,
				negocio: negocio
			});
		})
		.catch(err => {
			res.status(404).json({
				message : "Business not found in the list.",
				status : 404
			});
			return next();
		});
});

router.put('/update-negocio/:idneg', (req, res) => {
    let negocioId = req.params.idneg;
    let updatedNeg = req.body;
    
    if(!negocioId){
        res.status(406).json({
            message: "Missing id field in params.",
            status: 406
        });
    }

    if(!updatedNeg.negname && !updatedNeg.dirneg && !updatedNeg.numemp){
        res.status(404).json({
            message: "No data in body.",
            status: 404
        });
    }
    
    ListNego.put(negocioId, updatedNeg.negname, updatedNeg.dirneg, updatedNeg.numemp)
        .then(negocio => {
            res.status(200).json({
                message : "Successfully updated the bussiness.",
                status : 200,
                negocio: negocio
            });
        })
        .catch(err => {
            res.status(404).json({
                message : "Bussiness not found in the list.",
                status : 404
            });
        });

});


module.exports = router;

