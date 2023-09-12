const Operator = require("../models/OperatorModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

module.exports.CheckAuthOperator = async (req, res, next) => {

    const errs = []
    const token = (req.header('authorization') || '').replace("Bearer ", "")
    let payload

    if (!token) { errs.push("TOKEN_MISSING") }
    else { payload = jwt.decode(token, process.env.TOKEN_KEY); }

    if (!payload) { errs.push("TOKEN_INVALID") }

    const oneDay = 1000 * 60 * 60 * 24
    const customDateTimestamp = new Date().getTime() - oneDay * 3
    if (payload && payload.exp * 1000 - oneDay < customDateTimestamp) { errs.push("TOKEN_EXPIRED") }

    if (errs.length > 0) {
        let result = {
            message: errs[0]
        }
        res.status(401).json(result);
    } else {

        const operator = await Operator.findOne({ token: token })
        if (!operator) {
            return res.json({ message: 'TOKEN_INVALID 2' })
        } else {
            next()
        }
    }

}

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!email || !password ){
            return res.json({message:'All fields are required'})
        }

        const operator = await Operator.findOne({ email })
        if(!operator){
            return res.json({message:'Incorrect password or email' })
        }
        const auth = await bcrypt.compare(password, operator.password)
        if (!auth) {
            return res.json({message:'Incorrect password or email' })
        }

        const token = createSecretToken(operator._id)
        await Operator.updateOne({ _id: operator._id }, { token: token })

        res.status(201).json({
            success: true,
            token: token,
            message: "Operator logged in successfully",
        });
        next()
    } catch (error) {
        console.error(error);
    }
}
