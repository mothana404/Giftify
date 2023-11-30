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
        console.log('here');
        // const user_id =  req.user.authorization;
        const productID = req.params.id;
        const product = await Products.findByPk(productID);
        const reactions = await Reaction.findAll({
            where : {
                product_reaction_id : productID,
            }
        });
        res.status(200).json({product, reactions});
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
        const userID = 45;
        const  price = req.body.productData.price;
        // console.log(req.body.productData.price);
        const order = await Order.create({
            user_order_id : userID,
            product_order_id : 66,
            order_price : price,
            order_count : 1,
            is_payed : false,
            order_for : null
        });
        res.status(201).json(order);
    }catch(error){
        console.log(error);
        res.status(500).json("error in add To Oreders");
    }
};

async function addToWishlist(req, res){
    try{
        const userID = 45;
        const productID = req.params.id;
        const wishlist = await Wishlist.create({
            user_wishlist_id : userID,
            product_wishlist_id : productID,
        });
        res.status(201).json(wishlist);
    }catch(error){
        console.log(error);
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
};

async function removeFromOrders(req, res){
    try{
        const userID = 45;
        const OrderID = req.params.itemId;
        console.log(OrderID);
        const deletedOrder = await Order.findOne({
            where : {
                user_order_id : userID,
                order_id : OrderID,
            }
        });
        deletedOrder.update({
            is_deleted : true,
        });
        res.status(201).json(deletedOrder);
    }catch(error){
        res.status(500).json("error in remove from orders");
    }
};

async function updateReaction(){
    try{

    }catch(error){
        res.status(500).json('error in update reaction');
    }
};

async function deleteReaction(req, res){
    try{

    }catch(error){
        res.status(500).json('error in delete reaction');
    }
};

async function getOrders(req, res){
    try{
        // const userID = req.user.id;
        const userID = 45;
        const orders = await Order.findAll({
            where : {
                user_order_id : userID,
                is_deleted : false,
            }
        });
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json('error in get orders');
    }
};

async function increment(req ,res){
    try{
        const userID = 45;
        const orderID = req.params.itemId;
        const orderIncrement = await Order.findOne({
            where : {
                order_id : orderID,
                user_order_id : userID
            },
            returning: true
        });
        await orderIncrement.update({
            order_count: orderIncrement.order_count + 1,
          });
        console.log(11111111111, orderIncrement);
        res.status(201).json(orderIncrement);
    }catch(error){
        res.status(500).json('error in increment controller');
    }
};

async function decrement(req, res){
    try{
        const userID = 45;
        const orderID = req.params.itemId;
        const orderIncrement = await Order.findOne({
            where : {
                order_id : orderID,
                user_order_id : userID
            },
            returning: true
        });
        await orderIncrement.update({
            order_count: orderIncrement.order_count - 1,
          });
        console.log(11111111111, orderIncrement);
        res.status(201).json(orderIncrement);
    }catch(error){
        res.status(500).json('error in Decrement controller')
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
    removeFromOrders,
    updateReaction,
    deleteReaction,
    getOrders,
    increment,
    decrement,
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