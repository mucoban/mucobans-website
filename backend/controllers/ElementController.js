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

module.exports.create = async (req, res, next) => {
    try {

        await Element.create({...req.body, typeId: 2})
            .then((createdElement) => {
                const elementData= req.body.elementData.map((ed, index) => {
                    ed.elementId = createdElement._id
                    ed.main = index === 0
                    return ed
                })
                ElementData.create(elementData)
                    .then( ed => {
                        console.log('created', ed)
                    })
                    .catch(error => { console.log(error) })


                Element.findById(createdElement._id)
                    .populate('elementData')
                    .then(element => {
                        return res.json({
                            message: 'successfully created',
                            data: element
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

module.exports.save = async (req, res, next) => {
    try {

        const elementId = req.params.id
        const elementData = req.body.elementData
        if (elementData) {
            elementData.map(eData => {
                console.log('eData', eData)
                ElementData.findOneAndUpdate({ elementId: elementId, languageAbb: eData.languageAbb }, eData)
                    .catch(error => { console.log(error) })
            })
        }

        await Element.findOneAndUpdate({ _id: elementId }, req.body)
            .then(() => {
                Element.findById(elementId)
                    .populate('elementData')
                    .then(element => {
                        return res.json({
                            message: 'successfully saved',
                            data: element
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

module.exports.delete = async (req, res, next) => {
    try {
        await Element.deleteOne({ _id: req.params.id })
            .then(result => {

                ElementData.deleteMany({ elementId: req.params.id })
                    .then(resultED => {
                        return res.json({
                            message: 'successfully deleted',
                            data: result
                        })
                    })
                    .catch(() => console.log)

            })
            .catch(() => console.log)
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            error: true,
            message: error.message || 'Internal Error'
        })
    }
}
