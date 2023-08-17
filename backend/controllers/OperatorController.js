const Operator = require("../models/OperatorModel");
const jwt = require('jsonwebtoken')

module.exports.OperatorDetail = async (req, res, next) => {
    const token = req.header('authorization').replace("Bearer ", "")
    const payload = jwt.decode(token, process.env.TOKEN_KEY)

    try {
        const operator = await Operator.findOne({ _id: payload.id })

        if (!operator) {
            return res.json({ message: 'operator not found' })
        } else {
            return res.json({
                status: true,
                data: operator
            })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json('error')
    }

}
