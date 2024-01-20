const jwt = require('jsonwebtoken')
const USER = require('../Model/auth.model')

exports.isAuthenticated = async (req,res,next) =>{
    try {
        const {token} = req.headers
    
        if(!token || token === undefined) throw new Error('please enter token')

        let isValidToken = jwt.verify(token, process.env.SECRET_KEY)

        if(!isValidToken) throw new Error('Not Valid Token')

        console.log("----",isValidToken,"-----")
        let user = await USER.findById(isValidToken.id)

        if(!user) throw new Error('Not Valid User')

        req.user = user

        next()

    } catch (error) {']['
        res.status(400).json({
            status : "fail",
            message : error.message
        })
    }


}