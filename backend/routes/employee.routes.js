const express = require("express")
// const bcrypt = require('bcrypt');
// var jwt = require('jsonwebtoken');
// var store = require('store');
const { EmployeeModel } = require("../model/employee.model");
const employeeRouter = express.Router();

employeeRouter.use(express.json())


// storing employee data


employeeRouter.post("/employees", async (req, res) => {

    const employeeData = req.body
    try {
        const newEmployee = await EmployeeModel(employeeData)
        newEmployee.save();

        res.status(200).send({ msg: "employee data saved " })
    } catch (error) {
        console.log(error.message)
    }
})

// get all the employee data 

employeeRouter.get("/get", async (req, res) => {

    try {
        const employeeData = await EmployeeModel.find()
        console.log("🚀 ~ file: employee.routes.js:33 ~ employeeRouter.get ~ employeeData:", employeeData)
        res.status(200).send({ msg: "employee data ", data: employeeData })
    } catch (error) {
        console.log(error.message)
    }
})

// filtering user based on department api 
employeeRouter.get("/:department", async (req, res) => {

    const { department } = req.params
    console.log("🚀 ~ file: employee.routes.js:17 ~ employeeRouter.post ~ department:", department)
    try {
        const employeeData = await EmployeeModel.find({ department: department })

        res.status(200).send({ msg: "employee based on department ", data: employeeData })
    } catch (error) {
        console.log(error.message)
    }
})

// sorting bases on salary 
employeeRouter.get("/salary/:order", async (req, res) => {

    const { order } = req.params;
    console.log("🚀 ~ file: employee.routes.js:58 ~ employeeRouter.get ~ order:", order)
    try {

        const sortOrder = order == "desc" ? -1 : 1
        console.log("🚀 ~ file: employee.routes.js:62 ~ employeeRouter.get ~ sortOrder:", sortOrder)
        const employeeData = await EmployeeModel.find({}).sort({ salary: sortOrder })
        res.status(200).send({ msg: "data in salary order  ", data: employeeData })
    } catch (error) {
        console.log(error.message)
    }
})

//search employee based on first name 

employeeRouter.get("/search/:firstname", async (req, res) => {

    const { firstname } = req.params;
    console.log("🚀 ~ file: employee.routes.js:75 ~ employeeRouter.get ~ firstname:", firstname)
    try {
        if (firstname != "") {
            const employeeData = await EmployeeModel.find({ firstname: firstname })
            res.status(200).send({ msg: "data in salary order  ", data: employeeData })
        }
        else {
            const employeeData = await EmployeeModel.find({})
            res.status(200).send({ msg: "data in salary order  ", data: employeeData })

        }
    } catch (error) {
        console.log(error.message)
    }
})

// pagination


module.exports = {
    employeeRouter
}