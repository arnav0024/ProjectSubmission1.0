var express = require('express')

var app = express()
var expressMongoDb = require('express-mongo-db');

Car = require('./models/Car')

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(expressMongoDb('mongodb://localhost/carRentalAgency'));

app.post('/add',require('./controllers/add'))

app.post('/book',require('./controllers/book'))

app.get('/details',require('./controllers/details.js'))

app.patch('/update',require('./controllers/update.js'))

app.delete('/delete',require('./controllers/delete.js'))


port = 83


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))