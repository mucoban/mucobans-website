const mongoose = require('mongoose')

const elementSchema = new mongoose.Schema({
    typeId: {
        type: String,
        required: [true],
        unique: true,
    },
    multiLanguage: {
        type: String,
        required: [true],
    },
    active: {
        type: Boolean,
        required: [true],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
}, { toJSON: { virtuals: true } })

elementSchema.virtual('elementData', {
    ref: 'ElementData',
    localField: '_id',
    foreignField: 'elementId',
    justOne: false,
})

module.exports = mongoose.model("Elements", elementSchema)
