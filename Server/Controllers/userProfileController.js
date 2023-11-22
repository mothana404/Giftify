const { Users, Role, Products , ContactUs , Reaction, Order, Wishlist, } = require('../Models');

async function getUserData(req, res){
    try{
        const userID = req.user.id;
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
        res.status.json('error in updating user data');
    }
};

async function getWishlist(req, res){
    try{
        const userID = req.user.id;
        const wishlist = await Wishlist.findAll({
            where : {
                user_wishlist_id : userID,
            }
        });
        res.status(200).json(wishlist);
    }catch(error){
        res.status(500).json('error in get wishlist')
    }
};

async function gitOrderHistory(req, res){
    try{
        const userID = req.user.id;
        const ordersHistory = await Order.findAll({
            where : {
                user_order_id : userID,
            }
        });
        res.status(200).json(ordersHistory);
    }catch(error){
        res.status(500).json('error in git order hiatory');
    }
}

module.exports = {
    getUserData,
    getWishlist,
    updateUserData,
    gitOrderHistory,
};