const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


function checkLogin({ name , password }) {
    return mongoService.connect()
        .then(db => db.collection('user').findOne({
            $and: [{"name" : name} , {"password" : password}] }))
            .catch(err => {
               
            })
}


function getById(id) {
    const _id = new ObjectId(id)
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ _id }))
}

function query() {
    return mongoService.connect()
        .then(db => db.collection('user').find({}).toArray())
}

// todo  - add user only if nickname is not taken
function addUser({ name , password , book_id , isAdmin }) {
    var user = { name , password , book_id , isAdmin}
    return mongoService.connect()
        .then(db => db.collection('user').insertOne(user))
        .then(res => {
            user._id = res.insertedId
            return user
        })
}







module.exports = {
    query,
    getById,
    addUser,
    checkLogin
}