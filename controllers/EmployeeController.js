const Employee = require('../models/Employee')
const upload = require('../middleware/upload')
const { response } = require('express')

const index = (req,res,next) => {
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An Error Occured!'
        })
    })
}

const imageupload = (req, res)=> {
    upload.single('uploadImages')(req, res, function(error) {
        let imag = new Employee({
            uploadImage:req.file.path
        })
        let result =  imag.save()
        console.log("sucess")
        
        if (error) {
            return res.json({ error: "Error uploading file" })
        }
        res.status(200).json({ message: "Image Uploaded Successfully", ImageUrl: `http://localhost:8000/${imag}` })
    })
}

const show = (req,res,next) => {
    let employeeID = req.params.employeeID
    Employee.findByid(employeeID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message:'An error Occurred'
        })
    })
}

const store = (req, res, next) => {
    let employee = new Employee({
        name:req.body.name,
        designation:req.body.designation,
        email:req.body.email,
        phone:req.body.phone,
        age:req.body.age       
    })
    if(req.file){
        employee.photo = req.file.path
    }
    employee.save()
    .then(response => {
        res.json({
            message: "Employee Added Successfully"
        })
    })
    .catch(error => {
        res.json({
            message: "An error Occurred "
        })
    })
}

const update = (req,res,next) => {
    let employeeID = req.body.employeeID
    
    let updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age    
    }
    Employee.findByIdAndUpdate(employeeID, {$set:updatedData})
    .then(() => {
        res.json({
            message: 'Employee updated successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!!!!!'
        })
    })
}

// const destroy = (req,res,next) => {
//     let employeeID = req.body.employeeID
//     Employee.findByIdAndRemove(employeeID)
//     .then(() => {
//         res.json({
//             message: "Employee Deleted Successfully"    
//         })
//     })
//     .catch(error => {
//         res.json({
//             message: "An error Occurred "
//         })
//     })
// }

const destroy = async(req,res) => {
    try{
        let id = req.params.id
        await Employee.findByIdAndRemove({_id: id})
        return res.status(200).json({
            message: "Employee deleted successfully"
        })
        
    } catch{error} {res.status(400).json({message:
        error.message
    })}
}

module.exports = { 
    index, show, store, update, destroy,imageupload
}