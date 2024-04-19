const mongoose = require("mongoose");

const JobPostingSchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    jobtitle: {
        type: String,
        required: true
    },
    jobdescription: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

const Job = mongoose.model("Job", JobPostingSchema);

module.exports = { Job };



