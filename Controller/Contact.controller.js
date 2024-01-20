let CONTACT = require("../Model/contact.model")

exports.add = async (req, res) => {
    try {
        const {fname ,lname, phone} = req.body

        if (!fname || !lname || !phone) {
            throw new Error("please enter valid data")
        }

        let Contact = {
            fname,
            lname,
            phone,
            user : req.user.id
        }
        console.log(Contact)
        let data = await CONTACT.create(Contact)

        res.status(200).json({
            status: "success",
            data
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.show = async (req, res) => {
    try {
        let data;

        if (req.query.id) {

            data = await CONTACT.findById(req.query.id)
            if(!data) throw new Error('please enter valid id')
            console.log('single',data)

        } else {

            data = await CONTACT.find({user : req.user.id})
            console.log('all')
            if (!data.length) throw new Error('data not found')
        }

        res.status(200).json({
            status: "success",
            data: data
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.update = async (req, res) => {
    try {
        if (!req.query.id) throw new Error('please enter id')

        let data = await CONTACT.findByIdAndUpdate(req.query.id, req.body, { new : true })

        res.status(200).json({
            status: "success",
            message: "updated data",
            data: data
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
        if (!req.query.id) throw new Error('please enter id')

        let data = await CONTACT.findByIdAndDelete(req.query.id)

        res.status(200).json({
            status: "success",
            message: "delete this data",
            data: data
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}
