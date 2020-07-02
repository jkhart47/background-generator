const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');


const app = express();

app.use(bodyParser.json());


// Load hash from your password DB.
//bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
// });

const database = {
	users: [
	{
		id: '123',
		name: 'john',
		email: 'john@gmail.com',
		password: 'cookies',
		entries: '0',
		joined: new Date()
	},
	{
		id: '124',
		name: 'sally',
		email: 'sally@gmail.com',
		password: 'bananas',
		entries: 0,
		joined: new Date()
	}
	],
	login: [
		{
			id: '987',
			hash: '',
			email: 'john@gmail.com'
		}
	]

}

/*const server = http.createServer((request, response) => {
	console.log('headers', request.headers);
	console.log('method', request.method);
	console.log('url', request.url);

	response.setHeader('Content-Type', 'text/html');
	response.end('<h1>Helllooo</h1>');

})
*/
app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	bcrypt.compare("apples", '$2a$10$VqZCx6xItcOTRdIfq8H6teUPNO1LkQGj/N2daNuCo/gHgH/eQP4V.', function(err, res) {
    console.log('first guess', res);
 	});
 	bcrypt.compare("veggies", '$2a$10$VqZCx6xItcOTRdIfq8H6teUPNO1LkQGj/N2daNuCo/gHgH/eQP4V.', function(err, res) {
 		console.log('second guess', res);
 	});	
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.json('success');
	} else {
		res.status(400).json('error logging in');
	}
})

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
   	console.log(hash);
	});
		database.users.push({
			id: '125',
			name: name,
			email: email,
			password: password,
			entries: '0',
			joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
		
	})
	if (!found) {
			res.status(404).json('not found');
	}
})

app.post('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries ++
			return res.json(user.entries);
		}
	})
	if (!found) {
		res.status(404).json('not found');
	}	
	
})

app.listen(3000, () => {
	console.log('app is running on port 3000');
});

