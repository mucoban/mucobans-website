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
