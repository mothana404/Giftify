const { Users, Role, Products , ContactUs , Reaction, Order, Wishlist, } = require('../Models');
const { sequelize, DataTypes } = require('sequelize');

async function getUserData(req, res){
    try{
        const userID = 45;
        const userData = await Users.findByPk(userID);
        res.status(200).json(userData);
    }catch(error){
        res.status(500).json('error in get user data');
    }
};

async function updateUserData(req, res){
    try{
        const userID = req.user.id;
        const {f_name, l_name, user_email, user_password, phone_number, user_location} = req.body;
        const theUser = await Products.update(
            {f_name, l_name, user_email, user_password, phone_number, user_location}, 
            {
                where: { user_id: userID },
                returning: true,
            });
            res.status(201).json("updated successfully", theUser);
    }catch(error){
        res.status(500).json('error in updating user data');
    }
};

async function getWishlist(req, res){
    try{
        const userID = 45;
        const wishlist = await Wishlist.findAll({
            where: {
                user_wishlist_id: userID,
            },
            include: [
                {
                    model: Products,
                    attributes: ['product_id', 'product_name', 'description', 'price', 'product_rating', 'img_url'],
                    // where: sequelize.literal('`Wishlist`.`wishlist_product_id` = `Products`.`product_id`'),
                },
            ],
        });
        res.status(200).json(wishlist);
    }catch(error){
        console.log(error)
        res.status(500).json('error in get wishlist');
    }
};

async function gitOrderHistory(req, res){
    try{
        const userID = 45;
        const ordersHistory = await Order.findAll({
            where : {
                user_order_id : userID,
                is_payed : true,
            }
        });
        res.status(200).json(ordersHistory);
    }catch(error){
        console.log(error)
        res.status(500).json('error in git order hiatory');
    }
}

module.exports = {
    getUserData,
    getWishlist,
    updateUserData,
    gitOrderHistory,
};