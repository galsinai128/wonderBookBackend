const userService = require('../services/user-service')
// const reviewService = require('../services/review-service')
const BASE = '/user'
//todo login singup
function addUserRoutes(app) {
    app.get(BASE, (req, res) => {
        userService.query()
            .then(users => res.json(users))
    })
    app.get(`${BASE}/:id`, (req, res) => {
        const userId = req.params.id
        userService.getById(userId)
            // reviewService.query({ userId })
            .then((user) => {
                // console.log({user})
                res.json(user)
            })
    })

    app.post(`/signup`, (req, res) => {
        const user = req.body;
        userService.addUser(user)
            .then(addedUser => {
                req.session.loggedinUser = addedUser
                res.json(addedUser)})
            .catch(err => {
                console.log(err)
                res.status(500).send('Could not add USER')
            })
    }),
    app.post('/checkLogin', (req, res) => {
        const credentials = req.body
        userService.checkLogin(credentials)
            .then(user => {
                console.log('user cechk',user)
                if(user) {
                    var user = {...user}
                    console.log('user cechk a',user)
                    delete user.password;
                    req.session.loggedinUser = user
                    res.json(user)
                } else throw 'User not found!' 
             
            })
            .catch(err => res.status(401).send('Wrong user/pass'))
    });

    app.post(`/logout`, (req, res) => {
        req.session.loggedinUser = null;
        console.log('Loggedout',req.session.loggedinUser)

        res.end('Loggedout!');
    });

    app.get(`/getLogin`, (req, res) => {
        console.log('req.session.loggedinUser check login',req.session.loggedinUser)
        // return req.session.loggedinUser;
            return new Promise ((resolve,reject)=>{
                if (req.session.loggedinUser) {
                    resolve(res.json(req.session.loggedinUser))}
                else reject('couldent get user form user server route!')
            })

        // else {
            // return new Promise.reject('couldnt get user from server')
        // }
        // req.session.loggedinUser = null;
        // console.log('Loggedout',req.session.loggedinUser)

        // res.end('Loggedout!');
    });


}


module.exports = addUserRoutes;