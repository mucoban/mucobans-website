const Language = require("../models/LanguagesModel");
const Element = require("../models/ElementModel");
const ElementData = require("../models/ElementDataModel");

module.exports.list = async (req, res, next) => {
    try {
        const languages = await Language.find()

        return res.json({
            data: languages
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            error: true,
            message: error.message || 'Internal Error'
        })
    }

}


module.exports.getOne = async (req, res) => {
    try {
        const language = await Language.findById(req.params.id)
            .catch(() => console.log)

        return res.json({
            data: language
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            error: true,
            message: error.message || 'Internal Error'
        })
    }
}

module.exports.create = async (req, res) => {
    try {
        await Language.create(req.body)
            .then(createdLanguage => {
                Language.findById(createdLanguage._id)
                    .then(language => {

                        Element.find().then(elements => {
                            elements.forEach(element => {
                                ElementData.create({
                                    elementId: element._id,
                                    languageAbb: createdLanguage.abb,
                                    main: false,
                                    value: ''
                                }).then().catch(error => { console.log(error) })
                            })
                        })

                        return res.json({
                            message: 'successfully created',
                            data: language
                        })
                    })
                    .catch(error => { console.log(error) })
            })
            .catch(error => { console.log(error) })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            error: true,
            message: error.message || 'Internal Error'
        })
    }
}

module.exports.save = async (req, res) => {
    try {
        await Language.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(languagePrevious => {
                Language.findById(req.params.id)
                    .then(language => {

                        Element.find().then(elements => {
                            elements.forEach(element => {
                                ElementData.findOneAndUpdate({ elementId: element._id, languageAbb: languagePrevious.abb }, {
                                    languageAbb: language.abb,
                                }).then().catch(error => { console.log(error) })
                            })
                        })

                        return res.json({
                            message: 'successfully saved',
                            data: language
                        })
                    })
                    .catch(error => { console.log(error) })
            })
            .catch(error => { console.log(error) })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            error: true,
            message: error.message || 'Internal Error'
        })
    }
}

module.exports.delete = async (req, res) => {
    try {
        await Language.findOneAndDelete({ _id: req.params.id })
            .then(result => {
                Element.find().then(elements => {
                    elements.forEach(element => {
                        ElementData.findOneAndDelete({ elementId: element._id, languageAbb: result.abb })
                            .then().catch(error => { console.log(error) })
                    })
                })

                return res.json({
                    message: 'successfully deleted',
                    data: result
                })
            })
            .catch(error => { console.log(error) })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            error: true,
            message: error.message || 'Internal Error'
        })
    }
}
