// Add some requirements to the file
const express = require( 'express' )
const pg = require( 'pg' )
const bodyParser = require( 'body-parser' )
const app = express()
const encodeMoreURI = require( __dirname + '/includes/created_modules/create-string')

// include variable to parse input data
let urlencodedParser = bodyParser.urlencoded({ extended: false })
// include string path for connection to database
let connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard'

app.set( 'view engine', 'pug' )
app.set( 'views', __dirname + '/views' )

//added to use static files, like css
app.use( '/src', express.static( __dirname + '/includes' ) )
// app.use( express.static( __dirname + 'includes' ) )

app.get('/', (req, res) => {
	// render index page
	res.render('index')
})

app.get('/index', (req, res) => {
	// render index page
	res.render('index')
})

app.post('/messages', urlencodedParser, (req, res) => {
	// The post adds the entry of the user to the database
	let newMessage = {
		// encode the text so that all characters can be passed to database
		title: encodeMoreURI(req.body.title),
		message: encodeMoreURI(req.body.message)
	}
	pg.connect( connectionString, (err, client, done) => {
		if (err) throw err
		let queryText = "insert into messages (title, body) values ('" + newMessage.title + "', '" + newMessage.message + "');"
		if (err) throw err
		client.query(queryText, (err) =>{
			if (err) throw err
			done()
			pg.end()
			res.redirect('messages')
		})	
	})
})

app.get('/messages', (req, res) => {
	// queries to get all the contents from the database
	pg.connect( connectionString, (err, client, done) => {
		if (err) throw err
		let queryText = "select * from messages"
		client.query( queryText, (err, result) => {
			if (err) throw err
			done()
			pg.end()
			res.render('messages', {data: result.rows} )
		})
	})
})

app.listen( 8000, () => {
	console.log( " I'm running" )
})