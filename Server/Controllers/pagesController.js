// const { func } = require('joi');
const { Users, Role, Products , ContactUs , Reaction, Order, Wishlist } = require('../Models');
// const Category = require('../Models/categoryModel');

async function getproductsCategory(req, res){
    try{
        const categoryID = req.params.category;
        const filterProducts = await Products.findAll({
            where: {
              product_category: categoryID,
              is_deleted : false,
            },
          });
          res.status(200).json(filterProducts);
    }catch(error){
        res.status(500).json("error in get products Category");
    }
};

async function getproductsType(req, res){
    try{
        const typeID = req.params.type;
        const productsType = await Products.findAll({
            where: {
                type: typeID,
                is_deleted : false,
            },
          });
          res.status(200).json(productsType);
    }catch(error){
        res.status(500).json("error in get products Type");
    }
};

async function getProductDetails(req, res){
    try{
        const user_id =  42;
        const productID = req.params.id;
        const product = await Products.findByPk(productID);
        const reactions = await Reaction.findAll({
            where : {
                product_reaction_id : productID,
            }
        });
        res.status(200).json({product, reactions, user_id});
    }catch(error){
        console.log(error);
        res.status(500).json("error in get Details");
    }
};

async function addReaction(req, res){
    try{
        const user_reaction_id = 42;
        const { rating, comment} = req.body;
        const product_reaction_id = req.params.id
        const userInOrders = await Order.findOne({
            where : {
                user_order_id : user_reaction_id,
            }
        });
        if(userInOrders){
            const theReaction = await Reaction.create({
                product_reaction_id : product_reaction_id,
                rating : rating || 0,
                comment : comment || null,
                user_reaction_id : user_reaction_id,
            });
            const ractions = await Reaction.findAll({
                where : {
                    product_reaction_id : product_reaction_id,
                }
            });
            let product_rating = 0;
            console.log(ractions[0].dataValues);
            for(let i = 0; i < ractions.length; i++){
                product_rating += ractions[i].dataValues.rating;
            }
            product_rating = product_rating / ractions.length;
            const updatedProduct = await Products.update(
                {product_rating}, 
                {
                    where: { product_id: product_reaction_id },
                    returning: true,
                });
            res.status(201).json({theReaction, updatedProduct});
        }else {
            res.status(400).json("You need to purchase the product to leave a comment.");
        }
    }catch(error){
        console.log(error);
        res.status(500).json("error in add Reaction");
    }
};

async function addToOreders(req, res){
    try{
        const userID = req.user.id || 0;
        const { product_order_id, city, order_price, order_count } = req.body;
        const order = await Order.create({
            user_order_id : userID,
            product_order_id : product_order_id,
            city : city || null,
            order_price : order_price,
            order_count : order_count
        });
        res.status(201).json(order);
    }catch(error){
        res.status(500).json("error in add To Oreders");
    }
};

async function addToWishlist(req, res){
    try{
        const userID = req.user.id;
        const productID = req.params.id;
        const wishlist = await Wishlist.create({
            user_wishlist_id : userID,
            product_wishlist_id : productID,
        });
        res.staus(201).json(wishlist);
    }catch(error){
        res.status(500).json('error in add to wish list');
    }
};

async function sendContactus(req, res){
    try{
        const {f_contactname, l_contactname, user_contact_id,
             contact_email, phone_number, contact_message} = req.body;
        const contact = await ContactUs.create({
            f_contactname : f_contactname,
            l_contactname : l_contactname,
            contact_email : contact_email,
            phone_number : phone_number,
            contact_message : contact_message,
        });
    }catch(error){
        res.status(500).json('error in send contactus message')
    }
}

module.exports = {
    getproductsCategory,
    getproductsType,
    getProductDetails,
    addReaction,
    addToOreders,
    addToWishlist,
    sendContactus,
};
        // if (ractions.length > 1){

        // }
        // else {
        //     const userInOrders = await Order.findOne({
        //         where : {
        //             user_order_id : user_reaction_id,
        //         }
        //     });
        //     if (userInOrders){
        //         const updatedProduct = await Products.update(
        //             {product_rating}, 
        //             {
        //                 where: { product_id: product_reaction_id },
        //                 returning: true,
        //             });
        //         res.status(201).json({theReaction, updatedProduct});
        //     }else {
        //         res.status().json("You need to purchase the product to leave a comment.");
        //     }
        // }