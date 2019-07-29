const express = require("express");
const router = express.Router();
const Questions = require("../models/questions");
const Users = require("../models/users");


router.get("/:deviceId", (req, res) => {
    
    Users.findOne({deviceId: req.params.deviceId}, (err, match) => {
        if(err){
            res.status(404).send(false);
        }
        else{
            let number = parseInt(Math.random() * Math.floor(10)) + 1;

            Questions.findOne({questionIndex: number}, (err, match) => {
                if(err){
                    res.status(404).send(false);
                }
                else{

                    let someVal = {
                        questionIndex: match.questionIndex,
                        questionTopic: match.questionTopic,
                        question: match.question,
                        answer: match.answers[parseInt(Math.random() * Math.floor(match.answers.length))],
                        options: match.options
                    }

                    res.status(200).send(someVal);
                }
            })
        }
    })
})

module.exports = router;