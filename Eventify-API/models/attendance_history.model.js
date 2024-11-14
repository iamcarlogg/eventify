const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    history: {
        type: String,
        required: true,
    },
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
    attendance: {
        type: Boolean, 
        required: true,
    },
});

module.exports = mongoose.model("Attendance_History", historySchema);