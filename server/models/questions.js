const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let questionSchema = new Schema({
    _id: Schema.ObjectId,
    answers: {type: Array, default: []},
    question: String,
    questionTopic: String,
    questionIndex: Number
});

module.exports = mongoose.model("questions", questionSchema);