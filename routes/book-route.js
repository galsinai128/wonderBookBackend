

const BOOK_URL = '/book';
const bookService = require('../services/book-service')

function addBookRoutes(app) {
    app.get(BOOK_URL, (req, res) => {
        bookService.query(req.query.q)
            .then(books => res.json(books))
    })

    // SINGLE
    app.get(`${BOOK_URL}/:bookId`, (req, res) => {
        const bookId = req.params.bookId;
        bookService.getById(bookId)
            .then(book => res.json(book))
    })

    // DELETE
    app.delete(`${BOOK_URL}/:bookId`, (req, res) => {
        const bookId = req.params.bookId;
        bookService.remove(bookId)
            .then(() => res.end(`Book ${bookId} Deleted `))
    })
    // CREATE
    app.post(BOOK_URL, (req, res) => {
        const book = req.body;
        bookService.add(book)
            .then(book => {
                res.json(book)
            })
    })

    // UPDATE
    app.put(`${BOOK_URL}/:bookId`, (req, res) => {
        const book = req.body;
        bookService.update(book)
            .then(book => res.json(book))
    })
}

 
module.exports = addBookRoutes;