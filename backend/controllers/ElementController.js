const Element = require("../models/ElementModel");
const ElementData = require("../models/ElementDataModel");

module.exports.list = async (req, res, next) => {
    try {
        const elements = await Element.find()
            .populate('elementData')
            .catch(error => {
                console.log(error)
            })

        return res.json({
            data: elements
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

module.exports.getOne = async (req, res, next) => {
    try {
        const element = await Element.findById(req.params.id)
            .populate('elementData')
            .catch(error => {
                console.log(error)
            })

        return res.json({
            data: element
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
