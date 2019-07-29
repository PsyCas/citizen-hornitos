const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Users = require("../models/users");
const generator = require("generate-password");


router.get("/leaderboard", (req, res) => {

    Users.find({}).limit(20).sort({points:-1}).then((result)=>{

        let finalOp = result.map((resultVal) => {
            return({username: resultVal.username, score: resultVal.points});
        })

        res.send(finalOp);
    })
})

router.get("/points/:deviceId", (req , res) => {

    Users.findOne({deviceId: req.params.deviceId}, (err, match) => {
        if(err){
            res.status(404).send(false);
        }
        else{
            res.status(200).send({points: match.points});
        }
    })  
})


router.get("/update/points/:deviceId", (req, res) => {
    
    let currentMultiplier = 0;
    let currentPoints = 0;

    Users.findOne({deviceId: req.params.deviceId}, (err,match) => {
        if(err){
            res.status(404).send(false);            
        }

        currentMultiplier = match.multiplier;
        currentPoints = match.points;

        let newPoints = (currentPoints + 1 * currentMultiplier).toFixed(2);
        let newMultiplier = currentMultiplier * 0.85;

        Users.updateOne({deviceId: req.params.deviceId}, { $set: { points: newPoints, multiplier: newMultiplier }})
            .then((result) => {
                res.status(200).send(true);
            })
            .catch((err) => {
                console.log(err);
            })
    })
})

router.get("/verify/:deviceId", (req,res) => {

    Users.findOne({deviceId: req.params.deviceId}, (err, match) => {
        if(err){
            res.status(404).send(false);
        }
        res.status(200).send(true);
    })  
})

router.get("/reset/multiplier/:deviceId", (req, res) => {

    Users.updateOne({deviceId: req.params.deviceId}, {$set: {multiplier: 1}})
        .then(result => {
            res.status(200).send(true);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).send(false);
        })
})


router.post("/validate", (req, res) => {

    var code = generator.generate({
        length: 5,
        numbers: true
    })


    // Users.findOne({username: req.body.username}, (err, match) => {
    //     if(match){
    //         res.send({message: "Username already taken.", selected: false})
    //     }

        const User = new Users({
            _id : new mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            deviceId: code,
            isVerified: false,
            points: 0,
            multiplier: 1,
        })
        User.save()
        .catch(err => {
            console.log(err);
            res.send(false);
        })

        console.log("user created");
        res.send({selected: true, confirmationCode: code});

    // })
})



module.exports = router;