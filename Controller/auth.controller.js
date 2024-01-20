const AUTH = require('../Model/auth.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { findByIdAndUpdate } = require('../Model/contact.model')

exports.Signup = async (req, res) => {
    try {
        
        if (req.body.password) req.body.password = await bcrypt.hash(req.body.password, 9)

        const { username, email, password } = req.body

        if (!username || !email || !password) throw new Error('please enter valid fields')

        const user = await AUTH.create(req.body)

        // console.log(typeof(req.body),typeof(user))

        const token = jwt.sign({id : user._id}, process.env.SECRET_KEY)


        res.status(200).json({
            status: "success",
            message: "signup successfull",
            token
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.Login = async (req, res) => {
    try {

        const { username, email, password } = req.body

        if ((!username && !email) || !password) throw new Error('please enter valid fields')

        const user = await AUTH.findOne({
            $or : [{username},{email}]
        })

        if(!user) throw new Error('please enter valid username or password')

        const checkUser = await bcrypt.compare(password,user.password)

        if(!checkUser) throw new Error('please enter valid password')

        const token = jwt.sign({id : user._id}, process.env.SECRET_KEY)

        res.status(200).json({
            status: "success",
            message: "login successfull",
            token
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.Update = async (req, res) => {
    try {
        const {password } = req.body
        
        if(!password) throw new Error('please enter password')
        
        const user = await AUTH.findById(req.user.id)
        
        if(!user) throw new Error('please enter valid id')
        
        const checkUser = await bcrypt.compare(password,user.password)

        if(password){
            req.body.password = await bcrypt.hash(req.body.password,9)
        }
        
        if(!checkUser) throw new Error('please enter valid password')
        
        let data = await AUTH.findByIdAndUpdate(req.user.id , req.body ,{new : true})
        console.log(req.user.id)

        res.status(200).json({
            status: "success",
            message: "updated data",
            data
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.delete = async (req, res) => {
    try {
        
        const user = await AUTH.findByIdAndDelete(req.user.id)
        
        if(!user) throw new Error('please enter valid id')
        
        res.status(200).json({
            status: "success",
            message: "delet user",
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}