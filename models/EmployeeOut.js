const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");

const employeeOutSchema = new mongoose.Schema({
    customid: {
        type: String,
        required: false,
        unique: true,
      },
    firstname: {type:String,  required:true },
    lastname: {type:String,  required:true },
    age: {type:String,  required:true },
    gender: {type:String,  required:true },
    residence: {type:String,  required:true },
    department: {type:String,  required:true },
    skills: {type:String,  required:true },
    jobdescription: {type:String,  required:true },
    sector: {type:String,  required:true },
    email: {type:String,  required:true },
    phonenumber: {type:String,  required:true },
    relocation: {type:String,  required:true },
    password: {type:String,  required:true }
});
  

employeeOutSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this._id}, LGNKingsMatch, {
        expiresIn: "1d"
    });
    return token
};

const EmployeeOut = mongoose.model("employeeOut", employeeOutSchema);

const validate = (data) => {
    const schema = Joi.object({
        customid: Joi.string().required().label("Custom id"),
        firstname: Joi.string().required().label("FirstName"),
        lastname: Joi.string().required().label("LastName"),
        age: Joi.string().required().label("Age"),
        gender: Joi.string().required().label("Gender"),
        residence: Joi.string().required().label("Residence"),
        department: Joi.string().required().label("Department"),
        skills: Joi.string().required().label("Skills"),
        jobdescription: Joi.string().required().label("JobDescription"),
        sector: Joi.string().required().label("Sector"),
        email: Joi.string().email().required().label("Email"),
        phonenumber: Joi.string().required().label("PhoneNumber"),
        relocation: Joi.string().required().label("Relocation"),
        password: passwordComplexity().required().label("Password"),
    });
    
    return schema.validate(data)
}

module.exports = {EmployeeOut, validate};