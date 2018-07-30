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
                console.log(addedUser)
                req.session.loggedinUser = addedUser
                res.json(addedUser)})
            .catch(err => {
                console.log(err)
                res.status(500).send('Could not add USER')
            })
    }),
    app.post('/checkLogin', (req, res) => {
        const credentials = req.body
        console.log(credentials,'user')
        userService.checkLogin(credentials)
            .then(user => {
                var user = {...user}
                delete user.password;
                req.session.loggedinUser = user
                console.log('user loggin',req.session.loggedinUser)
                res.json(user)
            })
            .catch(err => res.status(401).send('Wrong user/pass'))
    });

    app.post(`/logout`, (req, res) => {
        req.session.loggedinUser = null;
        console.log('Loggedout',req.session.loggedinUser)

        res.end('Loggedout!');
    });


}


module.exports = addUserRoutes;