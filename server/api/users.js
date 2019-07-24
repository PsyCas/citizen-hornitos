const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Users = require("../models/users");
const generator = require("generate-password");


router.get("/verify/:deviceId", (req,res) => {

    Users.findOne({deviceId: req.params.deviceId}, (err, match) => {
        if(err){
            res.status(404).send(false);
        }
        res.status(200).send(match);
    })  
})


router.post("/validate", (req, res) => {

    var code = generator.generate({
        length: 5,
        numbers: true
    })


    Users.findOne({username: req.body.username, email: req.body.email}, (err, match) => {
        if(match){
            res.status(400).send({message: "Username already taken.", val: false})
        }

        const User = new Users({
            _id : new mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            deviceId: code,
            isVerified: false
        })
        User.save()
        .catch(err => {
            console.log(err);
            res.status(500).send(false);
        })

        res.status(200).send({selected: true, confirmationCode: code});
        console.log("user created")

    })
})

module.exports = router;