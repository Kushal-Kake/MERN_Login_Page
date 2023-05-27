const express = require('express')
const mongoose = require('mongoose')
const RegisterSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true 
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true
    },
    confirmpassword: {
        type: String,
        required : true
    }
})

module.exports = mongoose.model('UserDetails', RegisterSchema)