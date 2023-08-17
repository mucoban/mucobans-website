const { Login, CheckAuthOperator} = require('./controllers/AuthController')
const { OperatorDetail} = require('./controllers/OperatorController')

module.exports = (app) => {
    app.post('/admin/login', Login)
    app.post('/admin/detail', CheckAuthOperator, OperatorDetail)
}
