const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    _id: Schema.ObjectId,
    username: String,
    email: String,
    deviceId: String,
    isVerified: Boolean,
    points: {type: Number, default: 0}
});

module.exports = mongoose.model("users", userSchema);