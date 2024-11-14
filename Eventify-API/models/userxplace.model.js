const mongoose = require('mongoose');

const userxplaceSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("UserxPlace", userxplaceSchema);