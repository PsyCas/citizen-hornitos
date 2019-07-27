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
            let number = parseInt(Math.random() * Math.floor(45));
            console.log(number);

            Questions.findOne({questionIndex: number}, (err, match) => {
                if(err){
                    res.status(404).send(false);
                }
                else{
                    res.status(200).send(match);
                }
            })
        }
    })
})

module.exports = router;