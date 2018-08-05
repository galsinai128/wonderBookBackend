

const BOOK_URL = '/book';
const IMG_SEARCH_URL = '/getImg';

const bookService = require('../services/book-service')

function addBookRoutes(app) {
    app.get(BOOK_URL, (req, res) => {
        if (req.query.txt) var filterBy = req.query
        else if (req.query.categorie) var filterBy = req.query
        else filterBy = null
        bookService.query(filterBy)
            .then(books => res.json(books))
            .catch(err => res.status(500).send(err.message))

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
            .catch(err => res.status(500).send(err.message))
    })
    // CREATE
    app.post(BOOK_URL, (req, res) => {
        const book = req.body;
        bookService.add(book)
            .then(book => {
                res.json(book)
            })
            .catch(err => res.status(500).send('Could not add book'))

    })

    // UPDATE
    app.put(`${BOOK_URL}/:bookId`, (req, res) => {
        const book = req.body;
        bookService.update(book)
            .then(book => res.json(book))
            .catch(err => res.status(500).send('Could not update book'))

    })

    app.get(`${IMG_SEARCH_URL}/:seatchImgInput`, (req, res) => {
        const strSeacrh = req.params.seatchImgInput;
        bookService.getImgFromApi(strSeacrh)
            .then(imgUrl => res.json(imgUrl))
    })
}


module.exports = addBookRoutes;