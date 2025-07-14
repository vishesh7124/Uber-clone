const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');

const {validationResult} = require('express-validator');


module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {fullname, email, password, vehicle} = req.body;

    const isCaptainExists = await captainModel.findOne({email});

    if(isCaptainExists){
        return res.status(400).json({
            message: "Captain already exists"
        })
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.split(" ")[0],
        lastname: fullname.split(" ")[1],
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    })

    const token = captain.generateAuthToken();

    res.status(201).json({
        token,
        captain:{
            fullname: captain.fullname,
            email: captain.email,
            vehicle: captain.vehicle
        }
    })

}

module.exports.loginCaptain = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {email,password} = req.body;

    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({
            message:"Invalid email or password"
        })
    }


    const isMatch = await captain.comparePassword(password)
    if(!isMatch){
        return res.status(401).json({
            message:"Invalid email or password"
        })
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token)
    res.status(200).json({
        token,
        captain
    })

}

module.exports.getCaptainProfile = async(req,res)=>{
    res.status(200).json(req.captain)
}

module.exports.logoutCaptain = async(req,res)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    await blacklistTokenModel.create({
        token
    })
    res.clearCookie("token");


    res.status(200).json({
        message:"Logged out successfully"
    })
}