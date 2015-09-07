// Routes for books
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var Book     = require('../models/book');

var router = express.Router();              // get an instance of the express Router

// create a book
router.post('/', function(req, res) {
    console.log(req.body);
    var book = new Book();      // create a new instance of the Book model
    book.name = req.body.name;  // set the books name (comes from the request)

    // save the bear and check for errors
    book.save(function(err) {
        if (err)
            res.send(err);

        console.log('created ' + book.id);
        res.json({ message: 'Book created!', id: book.id });
    });
    
});

// get all the books
router.get('/', function(req, res) {
    Book.find(function(err, books) {
        if (err)
            res.send(err);

        res.json(books);
    });
})

// on routes that end in /books/:book_id
// ----------------------------------------------------
    // get the book with that id
router.get('/:book_id', function(req, res) {
    Book.findById(req.params.book_id, function(err, book) {
        if (err)
            res.send(err);
        res.json(book);
    })
});

// update the book with this id
router.put('/:book_id', function(req, res) {

    // use our book model to find the book we want
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
});

// delete the book with this id
router.delete('/:book_id', function(req, res) {
    Book.remove({
        _id: req.params.book_id
    }, function(err, book) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});

module.exports = router;