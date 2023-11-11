const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const Cookies = require('js-cookie');
const cookieParser = require('cookie-parser');
require('dotenv').config();
app.use(cookieParser());

async function authorize(req, res, next){
    try{
        const token = req.cookies.accessToken;
        // const token = req.headers['authorization'];
        console.log(token);
        if (!token){
            res.status(401).json("you need to login first");
        }else {
            const user = jwt.verify(token, process.env.SECRET_KEY);
            if (!user.user_id){
                res.status(401).json("unauthorized");
                console.log("not");
            }
            req.user = user;
            next();
        }
    }catch(error){
        res.status(400).json(error);
    }
};

module.exports = {
    authorize
};