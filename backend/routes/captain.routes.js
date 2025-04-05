const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller')

const { body } = require("express-validator");

router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be at least 3 characters'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be at least 3 characters'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be car, motorcycle or auto'),

],
    captainController.registerCaptain
)

module.exports = router;