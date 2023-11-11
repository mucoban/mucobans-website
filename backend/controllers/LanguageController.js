const Language = require("../models/LanguagesModel");

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
            .then(() => {
                Language.findById(req.params.id)
                    .then(language => {
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
        await Language.deleteOne({ _id: req.params.id })
            .then(result => {
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
