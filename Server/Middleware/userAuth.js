const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const Cookies = require('js-cookie');
const cookieParser = require('cookie-parser');
require('dotenv').config();
app.use(cookieParser());

async function authorize(req, res, next){
    try{
        if (!req.user){
        const tokenCookie = req.headers.cookie;
        // const token = req.headers['authorization'];
        if (tokenCookie) {
            const cookiesArray = tokenCookie.split(';');
            const accessTokenCookie = cookiesArray.find(cookie => cookie.trim().startsWith('accessToken='));
            if (accessTokenCookie) {
                const accessToken = accessTokenCookie.split('=')[1].trim();
                // console.log(accessToken);
                const user = jwt.verify(accessToken, process.env.SECRET_KEY);
                console.log(user);
                if(user.email){
                    req.user = user;
                    next();
                }else{
                    res.status(401).json("unauthorized");
                }
                console.log(user);
            }
        }else {
            res.status(401).json("you need to login first");
        }
    }else{
        console.log(req.user.user_id);
        next();
    }
    }catch(error){
        res.status(400).json(error);
    }
};

module.exports = {
    authorize
};

// const express = require('express');
// const app = express();
// const jwt = require('jsonwebtoken');
// const Cookies = require('js-cookie');
// const cookieParser = require('cookie-parser');
// require('dotenv').config();
// app.use(cookieParser());

// async function authorize(req, res, next){
//     try{
//         if (!req.user.user_id){
//             const tokenCookie = req.headers.cookie;
//             // const token = req.headers['authorization'];
//             console.log(token);
//             if (!token){
//                 res.status(401).json("you need to login first");
//             }else {
//                 const user = jwt.verify(token, process.env.SECRET_KEY);
//                 if (!user.user_id){
//                     res.status(401).json("unauthorized");
//                 }
//                 req.user = user;
//                 next();
//             }
//         }else {
//             next();
//         }
//     }catch(error){
//         res.status(400).json(error);
//     }
// };

// module.exports = {
//     authorize
// };