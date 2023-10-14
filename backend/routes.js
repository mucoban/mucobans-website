const { Login, CheckAuthOperator} = require('./controllers/AuthController')
const { OperatorDetail} = require('./controllers/OperatorController')
const ElementController = require('./controllers/ElementController')
const LanguageController = require('./controllers/LanguageController')

module.exports = (app) => {
    app.post('/admin/login', Login)
    app.get('/admin/detail', CheckAuthOperator, OperatorDetail)
    app.get('/admin/elements', CheckAuthOperator, ElementController.list)
    app.get('/admin/elements/:id', CheckAuthOperator, ElementController.getOne)
    app.get('/admin/languages', CheckAuthOperator, LanguageController.list)
}
