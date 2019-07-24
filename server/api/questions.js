const express = require("express");
const router = express.Router();
const Questions = require("../models/questions");


router.get("/", (req, res) => {
    
    let number = parseInt(Math.random() * Math.floor(12));
    console.log(number);

    Questions.findOne({questionIndex: number}, (err, match) => {
        if(err){
            res.status(404).send(false);
        }
        else{
            res.status(200).send(match);
        }
    })
})

module.exports = router;