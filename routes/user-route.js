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
}


module.exports = addUserRoutes;