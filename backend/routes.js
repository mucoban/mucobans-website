const { Login, CheckAuthOperator} = require('./controllers/AuthController')
const { OperatorDetail} = require('./controllers/OperatorController')
const ElementController = require('./controllers/ElementController')

module.exports = (app) => {
    app.post('/admin/login', Login)
    app.get('/admin/detail', CheckAuthOperator, OperatorDetail)
    app.get('/admin/elements', CheckAuthOperator, ElementController.list)
}
