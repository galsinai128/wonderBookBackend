const mongoService = require('./mongo-service.js')
const ObjectId = require('mongodb').ObjectId;

function query(filter) {
    return mongoService.connect()
        // return connectToMongo()
        .then(db => {
            const collection = db.collection('book');
            console.log('filter in back', filter)
            if (filter) {
                if (filter.txt) {
                    let regex = new RegExp(`.*${filter.txt}.*`, "i");
                    return collection.find({
                        $or: [{ "title": { $regex: regex } },
                        { "author": { $regex: regex } }]
                    }).toArray()
                }
                else if (filter.categorie) {
                    let regexCat = new RegExp(`.*${filter.categorie}.*`, "i");
                    return collection.find({ "categories": { $regex: regexCat } }).toArray()
                }
            } else return collection.find({}).toArray()

        })
}

function getById(bookId) {
    bookId = new ObjectId(bookId)

    // return connectToMongo()
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('book');
            return collection.findOne({ _id: bookId })
        })
}

function remove(bookId) {
    bookId = new ObjectId(bookId)
    // return connectToMongo()
    return mongoService.connect()

        .then(db => {
            const collection = db.collection('book');
            return collection.remove({ _id: bookId })
        })
}

function add(book) {
    // return connectToMongo()
    return mongoService.connect()

        .then(db => {
            const collection = db.collection('book');
            return collection.insertOne(book)
                .then(result => {
                    book._id = result.insertedId;
                    return book;
                })
        })
}

function update(book) {
    book._id = new ObjectId(book._id)
    // return connectToMongo()
    return mongoService.connect()

        .then(db => {
            const collection = db.collection('book');
            return collection.updateOne({ _id: book._id }, { $set: book })
                .then(result => {
                    return book;
                })
        })
}


module.exports = {
    query,
    remove,
    getById,
    add,
    update
}