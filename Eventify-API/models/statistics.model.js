const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
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
    generation_date: {
        type: String, 
        required: true,
    },
    document: {
        type: String, 
        required: true, 
    },
});

module.exports = mongoose.model("Statistics", statisticsSchema);