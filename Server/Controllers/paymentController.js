const { Users, Role, Products , ContactUs , Reaction, Order, Wishlist, Payments ,Recipient } = require('../Models');
const Stripe = require('stripe');
const { route } = require('../Routes/pagesRoutes');
const router = require('../Routes/pagesRoutes');
const { Sequelize } = require('sequelize');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

async function addRecipientInfo(req, res){
    try{
        const userID = 45;
        const {recipientName, phoneNumber, card_id, giftMessage, location, deliveryDate} = req.body;
        const recipient = await Recipient.create({
            recipient_name : recipientName,
            recipient_phone_number : phoneNumber,
            recipient_card_id : 66,
            card_text : giftMessage,
            recipient_location : location,
            recipient_date : deliveryDate,
        });
        const order_for = recipient.recipient_id;
        const allOrders = await Order.findAll({
            where: {
                user_order_id : userID,
                is_deleted : false,
                is_payed : false,
            }
        });
        await Order.update({ order_for },{
                where : {
                    order_id: { [Sequelize.Op.in]: allOrders.map(order => order.dataValues.order_id) },
                }
            });
        res.redirect(`http://localhost:8080/create-checkout-session`);
    }catch(error){
        console.log(error);
        res.status(500).json('error in Recipient Info');
    }
};

async function getPayment(req, res){
    try{
        const userID = 45;
        const allOrders = await Order.findAll({
            where : {
                user_order_id : userID,
                is_deleted : false,
                is_payed : false,
            }
        });
        let total = 0;
        let items = [];
        for (let i = 0; i < allOrders.length; i++){
            total = total + (allOrders[i].order_price * allOrders[i].order_count);
            let theProduct = await Products.findByPk(allOrders[i].product_order_id);
            items.push({
                price_data : {
                    currency : "usd",
                    product_data : {
                        name : `${theProduct.product_name}`,
                        images : [theProduct.img_url],
                        description : `${theProduct.description}`,
                    },
                    unit_amount : parseInt(allOrders[i].order_price),
                },
                quantity: parseInt(allOrders[i].order_count),
            })
        };
        const successUrl = `http://localhost:8080/homepage?orderIds=${allOrders.map(order => order.order_id).join(',')}&total=${total}`;
        const cancelUrl = `http://localhost:8080/notResponding`;
    const session = await stripe.checkout.sessions.create({
        line_items : items,
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
      });
      res.status(200).json(session.url);
    }catch(error){
        console.log(error);
        res.status(500).json('error in payment controller')
    }
};

async function afterPayment(req, res){
    try{
        const orderIds = req.query.orderIds.split(',');
        const total = req.query.total;
        for(let i = 0; i < orderIds.length; i++){
            await Payments.create({
                user_payment_id : 45,
                order_payment_id: orderIds[i],
                total : total,
                payment_at: new Date(),
              });
        };
        const is_deleted = true;
        const is_payed = true;
        for(let i = 0; i < orderIds.length; i++){
            await Order.update(
                {is_deleted, is_payed }, 
                {
                    where: { order_id: orderIds[i] },
                    returning: true,
                });
        };
        res.redirect('http://localhost:3000/');
    }catch(errro){
        console.log(errro);
        res.status(500).json('error in homepage router');
    };
};

module.exports = {
    getPayment,
    addRecipientInfo,
    afterPayment,
};


        // for (let i = 0; i < allOrders.length ; i++){
        //     let theOrder = await Order.update(
        //         {order_for}, 
        //         {
        //             where: { order_id : allOrders[i].dataValues.order_id },
        //             returning: true,
        //         });
        // };


        // shipping_address_collection: {
        //     allowed_countries: ['US', 'JO'],
        //   },
        //   shipping_options: [
        //     {
        //       shipping_rate_data: {
        //         type: 'fixed_amount',
        //         fixed_amount: {
        //           amount: 0,
        //           currency: 'usd',
        //         },
        //         display_name: 'Free shipping',
        //         delivery_estimate: {
        //           minimum: {
        //             unit: 'business_day',
        //             value: 5,
        //           },
        //           maximum: {
        //             unit: 'business_day',
        //             value: 7,
        //           },
        //         },
        //       },
        //     },
        //     {
        //       shipping_rate_data: {
        //         type: 'fixed_amount',
        //         fixed_amount: {
        //           amount: 1500,
        //           currency: 'usd',
        //         },
        //         display_name: 'Next day air',
        //         delivery_estimate: {
        //           minimum: {
        //             unit: 'business_day',
        //             value: 1,
        //           },
        //           maximum: {
        //             unit: 'business_day',
        //             value: 1,
        //           },
        //         },
        //       },
        //     },
        //   ],

            //   const payment = Payments.create({
    //     user_payment_id : userID,
    //     order_payment_id: orderID,
    //     total : total,
    //     payment_for : payment_for_id
    //   });

    // const is_deleted = true;
    //   const order = await Order.update(
    //     {is_deleted}, 
    //     {
    //         where: { order_id: order_id },
    //         returning: true,
    //     });