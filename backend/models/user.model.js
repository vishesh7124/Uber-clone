const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"First name must be at least 3 characters"],
        },
        lastname:{
            type:String,
            minlength:[3,"First name must be at least 3 characters"],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
        minlength:[6,"Password must be at least 6 characters"],
        select:false // Do not return password by default
    },
    socketId:{
        type:String
    }
})

// to generate a token for the user that will be sent to the client
userSchema.methods.generateAuthToken = ()=>{
    const token = jwt.sign({_id:this.id},process.env.JWT_SECRET);
    return token;
}

// to check if the password is correct
userSchema.methods.comparePassword = async (password)=>{
    return bcrypt.compare(password,this.password);
}

// Hash the password before saving it to the database
userSchema.statics.hashPassword = async (password)=>{
    return await bcrypt.hash(password,10)
}

const userModel = mongoose.model('user',userSchema)

module.exports = userModel