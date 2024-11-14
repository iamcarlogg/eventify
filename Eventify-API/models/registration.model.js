const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
    },
    registration_date: {
        type: String, 
        required: true,
    },
    state: {
        type: Boolean, 
        required: true, 
    },
});

module.exports = mongoose.model("Registration", registrationSchema);