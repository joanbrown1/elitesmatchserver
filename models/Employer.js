const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");

const employerSchema = new mongoose.Schema({
    title: {type:String,  required:true },
    name: {type:String,  required:true },
    companyname: {type:String,  required:true },
    companyaddress: {type:String,  required:true },
    sector: {type:String,  required:true },
    jobdescription: {type:String,  required:true },
    email: {type:String,  required:true },
    phonenumber: {type:String,  required:true },
    password: {type:String,  required:true }
});

employerSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this._id}, LGNKingsMatch, {
        expiresIn: "1d"
    });
    return token
};

const Employer = mongoose.model("employer", employerSchema);

const validate = (data) => {
    const schema = Joi.object({
        title: Joi.string().required().label("Title"),
        name: Joi.string().required().label("Name"),
        companyname: Joi.string().required().label("CompanyName"),
        companyaddress: Joi.string().required().label("CompanyAddress"),
        sector: Joi.string().required().label("Sector"),
        jobdescription: Joi.string().required().label("JobDescription"),
        email: Joi.string().email().required().label("Email"),
        phonenumber: Joi.string().required().label("PhoneNumber"),
        password: passwordComplexity().required().label("Password"),
    });
    
    return schema.validate(data)
}

module.exports = {Employer, validate};