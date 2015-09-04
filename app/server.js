// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var Book     = require('./app/models/book');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/youshould'); // connect to our database

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
// on routes that end in /books
// ----------------------------------------------------
router.route('/books')

    // create a book (accessed at POST http://localhost:8080/api/books)
    .post(function(req, res) {
        console.log(req.body);
        var book = new Book();      // create a new instance of the Book model
        book.name = req.body.name;  // set the books name (comes from the request)

        // save the bear and check for errors
        book.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Book created!' });
        });
        
    })

     // get all the books (accessed at GET http://localhost:8080/api/books)
    .get(function(req, res) {
        Book.find(function(err, books) {
            if (err)
                res.send(err);

            res.json(books);
        });
    })

// on routes that end in /books/:book_id
// ----------------------------------------------------
router.route('/books/:book_id')

    // get the book with that id (accessed at GET http://localhost:8080/api/books/:book_id)
    .get(function(req, res) {
        Book.findById(req.params.book_id, function(err, book) {
            if (err)
                res.send(err);
            res.json(book);
        })
    })

    // update the book with this id (accessed at PUT http://localhost:8080/api/books/:book_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Book.findById(req.params.book_id, function(err, book) {

            if (err)
                res.send(err);

            book.name = req.body.name;  // update the books info

            // save the bear
            book.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Book updated!' });
            });

        })
	})

	// delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Book.remove({
            _id: req.params.book_id
        }, function(err, book) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);