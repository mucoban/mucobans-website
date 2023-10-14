const mongoose = require('mongoose')

const elementDataSchema = new mongoose.Schema({
    value: String,
    elementId: String,
    languageAbb: String,
    main: Boolean,
}, { collection: 'elementData' })

module.exports = mongoose.model("ElementData", elementDataSchema)
