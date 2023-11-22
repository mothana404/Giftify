const { Users } = require('../Models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const Cookies = require('js-cookie');
require('dotenv').config();

const schema = Joi.object({
    f_name : Joi.string().alphanum().min(3).max(10).required(),
    l_name : Joi.string().alphanum().min(3).max(10).required(),
    user_email : Joi.string().email().required(),
    password : Joi.string().required(),
    phone_number : Joi.string().min(9).max(14).required()
});

function validation(f_name, l_name, user_email, password, phone_number){
const valid = schema.validate({f_name, l_name, user_email, password, phone_number});
    if (valid.error == undefined){
        return true;
    }else {
        return false;
    }
};

async function createUser (req, res){
  try {
    const { f_name, l_name, user_email, password, phone_number, user_location } = req.body;
    const valid = validation(f_name, l_name, user_email, password, phone_number);
    console.log(valid);
    console.log(f_name, l_name, user_email, password, phone_number, user_location)
    if (valid){
        let user_password = await bcrypt.hash(password, 10);
        const newUser = await Users.create({
            f_name : f_name,
            l_name : l_name,
            user_email : user_email,
            user_password : user_password,
            phone_number : phone_number,
            user_location : user_location,
        });
        console.log(newUser);
        const accessToken = jwt.sign({id : newUser.dataValues.user_id, email : newUser.user_email}, process.env.SECRET_KEY, {expiresIn: '4h'});
        res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 3600000 });
        res.status(201).json(accessToken);
    }else {
        res.status(400).json("Invalid input");
    }
  } catch (error) {
        res.status(500).json({ error: 'Error in user model createUser' });
  }
};

async function loginUser (req, res){
    try {
      const { user_email, password } = req.body;
      const valid = validation("fname", "lname", user_email, password, "12345678910");
      if (valid){
        const user = await Users.findOne({
            where: {
              user_email,
            },
          });
          if (user && user.user_email === user_email) {
                bcrypt.compare(password , user.user_password, (error, result) => {
                if (error) {
                    console.log(error); // test
                    res.status(400).json(error);
                } else if (result) {
                    console.log(user.dataValues.user_id);
                    const accessToken = jwt.sign({id : user.dataValues.user_id, email : user.user_email}, process.env.SECRET_KEY, {expiresIn: '4h'});
                    res.cookie('accessToken', accessToken, { httpOnly: true });
                    console.log(accessToken); // test
                    res.status(200).json(accessToken);
                } else {
                    res.status(400).json('incorrect password');
                }
                });
          }else {
            res.status(401).json({ error: 'Email not found' });
          }
      } else {
            res.status(400).json("Invalid inputs");
      }
    }catch (error) {
        console.error(error);// test
        res.status(500).json({ error: 'Email not found' });
    }
};

module.exports = {
    createUser,
    loginUser
};