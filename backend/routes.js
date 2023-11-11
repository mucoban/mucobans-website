const { Login, CheckAuthOperator} = require('./controllers/AuthController')
const { OperatorDetail} = require('./controllers/OperatorController')
const ElementController = require('./controllers/ElementController')
const LanguageController = require('./controllers/LanguageController')

module.exports = (app) => {
    app.post('/admin/login', Login)
    app.get('/admin/detail', CheckAuthOperator, OperatorDetail)
    app.get('/admin/elements', CheckAuthOperator, ElementController.list)
    app.post('/admin/elements', CheckAuthOperator, ElementController.create)
    app.get('/admin/elements/:id', CheckAuthOperator, ElementController.getOne)
    app.put('/admin/elements/:id', CheckAuthOperator, ElementController.save)
    app.delete('/admin/elements/:id', CheckAuthOperator, ElementController.delete)
    app.get('/admin/languages', CheckAuthOperator, LanguageController.list)
    app.post('/admin/languages', CheckAuthOperator, LanguageController.create)
    app.get('/admin/languages/:id', CheckAuthOperator, LanguageController.getOne)
    app.put('/admin/languages/:id', CheckAuthOperator, LanguageController.save)
    app.delete('/admin/languages/:id', CheckAuthOperator, LanguageController.delete)
}
