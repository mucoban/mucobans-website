const mongoose = require('mongoose')
const languageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
    },
    abb: {
        type: String,
        required: [true, "abb is required"],
    },
    active: {
        type: Boolean,
        required: [true],
    },
})

module.exports = mongoose.model("Language", languageSchema)
