const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    _id: Schema.ObjectId,
    username: String,
    email: String,
    deviceId: String,
    isVerified: Boolean
});

module.exports = mongoose.model("users", userSchema);