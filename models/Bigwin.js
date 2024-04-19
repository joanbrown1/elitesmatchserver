const mongoose = require("mongoose");

const bigwinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    zone: {
        type: String,
        required: true
    }
});

const Bigwin = mongoose.model("Bigwin", bigwinSchema);

module.exports = { Bigwin };



