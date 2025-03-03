const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    first_name:{
        type:String,
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
    },
    birth_date:{
        type:Date,
    },
    Age:{
        type:Number,
    },
    phone:{
        type:String,
    },
    gender:{
        type:String,
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    password:{
        type:String,
        required:true
    },
    profilePhoto:{
        public_id: String,
        url: String
    }

}, { timestamps: true})

module.exports = model("User", userSchema);