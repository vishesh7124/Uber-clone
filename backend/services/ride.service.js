const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');


async function getFare(pickup,destination){

    if(!pickup || !destination){
        throw new Error('Pickup and destination are required');
    }

    console.log(pickup)

    const distanceTime = await mapService.getDistanceTime(pickup,destination);

    //calculate fare for auto ,car and motorcycle

    const baseFare = {
        auto:30,
        car:50,
        motorcycle: 20
    }

    const perKmRate={
        auto: 10,
        car: 15,
        motorcycle: 8
    }

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    }

    const fare ={
        auto: (baseFare.auto + distanceTime.distance.value/1000 * perKmRate.auto + distanceTime.duration.value/60 *perMinuteRate.auto).toFixed(2),
        car: (baseFare.car + distanceTime.distance.value/1000 * perKmRate.car + distanceTime.duration.value/60*perMinuteRate.car).toFixed(2),
        motorcycle: (baseFare.motorcycle + distanceTime.distance.value/1000 * perKmRate.motorcycle + distanceTime.duration.value/60*perMinuteRate.motorcycle).toFixed(2),
    };

    return fare;



}

function getOtp(num) {

    function generateOtp(num){
        const otp = crypto.randomInt(Math.pow(10, num-1),Math.pow(10,num)).toString();
        return otp;
    }

    return generateOtp(num);
}

module.exports.createRide = async({user,pickup,destination,vehicleType})=>{
    if(!user || !pickup || !destination || !vehicleType){
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup,destination);
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp:getOtp(6),
        fare: fare[vehicleType]
    })

    return ride;
}

module.exports.getFare = getFare;