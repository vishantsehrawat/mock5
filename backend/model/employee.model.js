const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    department: {
        type: String,
        enum: ['Tech', 'Marketing','Operations']
    },
    salary: String,

})

const EmployeeModel = mongoose.model("employee", employeeSchema)

module.exports = {
    EmployeeModel
}