var dbConn = null;

function connectToMongo() {
    // Reuse existing connection if exist
    if (dbConn) return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;
    
    const url = (!process.env.PORT)? 
                    'mongodb://localhost:27017/wonder_book_db' : 'mongodb://goi:963852ogi@ds245661.mlab.com:45661/wonder_book_db'
    
    // const url = 'mongodb://localhost:27017/wonder_book_db'
    return MongoClient.connect(url)
        .then(client => {
            console.log('Connected to MongoDB');
            // If we get disconnected (e.g. db is down)
            client.on('close', ()=>{
                console.log('MongoDB Diconnected!');
                dbConn = null;
            })
            dbConn = client.db()
            return dbConn;
        })
}

module.exports = {
    connect : connectToMongo
}
