const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");

const employeeSchema = new mongoose.Schema({
    customid: {
        type: String,
        required: false,
        unique: true,
      },
    title: {type:String,  required:true },
    firstname: {type:String,  required:true },
    lastname: {type:String,  required:true },
    age: {type:String,  required:true },
    gender: {type:String,  required:true },
    residence: {type:String,  required:true },
    zone: {type:String,  required:true },
    church: {type:String,  required:true },
    department: {type:String,  required:true },
    yearofgrad: {type:String,  required:true },
    skills: {type:String,  required:true },
    jobdescription: {type:String,  required:true },
    sector: {type:String,  required:true },
    email: {type:String,  required:true },
    phonenumber: {type:String,  required:true },
    ministryyear: {type:String,  required:true },
    responsibility: {type:String,  required:true },
    pastor: {type:String,  required:true },
    pastornumber: {type:String,  required:true },
    kcusername: {type:String,  required:true },
    relocation: {type:String,  required:true },
    employabilitySkills: {type:String,  required:true },
    password: {type:String,  required:true }
});
  

employeeSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this._id}, 'LGNKingsMatch', {
        expiresIn: "1d"
    });
    return token
};

const Employee = mongoose.model("employee", employeeSchema);

const validate = (data) => {
    const schema = Joi.object({
        customid: Joi.string().required().label("Custom id"),
        title: Joi.string().required().label("Title"),
        firstname: Joi.string().required().label("FirstName"),
        lastname: Joi.string().required().label("LastName"),
        age: Joi.string().required().label("Age"),
        gender: Joi.string().required().label("Gender"),
        residence: Joi.string().required().label("Residence"),
        zone: Joi.string().required().label("Zone"),
        church: Joi.string().required().label("Church"),
        department: Joi.string().required().label("Department"),
        yearofgrad: Joi.string().required().label("YearOfGrad"),
        skills: Joi.string().required().label("Skills"),
        jobdescription: Joi.string().required().label("JobDescription"),
        sector: Joi.string().required().label("Sector"),
        email: Joi.string().email().required().label("Email"),
        phonenumber: Joi.string().required().label("PhoneNumber"),
        ministryyear: Joi.string().required().label("MinistryYear"),
        responsibility: Joi.string().required().label("Responsibility"),
        pastor: Joi.string().required().label("Pastor"),
        pastornumber: Joi.string().required().label("PastorNumber"),
        kcusername: Joi.string().required().label("kcusername"),
        relocation: Joi.string().required().label("Relocation"),
        employabilitySkills: Joi.string().required().label("EmployabilitySkills"),
        password: passwordComplexity().required().label("Password"),
    });
    
    return schema.validate(data)
}

module.exports = {Employee, validate};