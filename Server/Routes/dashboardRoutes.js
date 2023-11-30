const express = require('express');
const router = express.Router();
const dashboardcontroller = require('../Controllers/dashboardController');
const multer = require('../Middleware/multer');

router.get('/allusers', dashboardcontroller.getUsers);
router.put('/updateuser/:user_id', dashboardcontroller.updateUsers);
router.put('/deleteuser/:user_id', dashboardcontroller.deleteUser);

router.get('/getproducts', dashboardcontroller.getallProducts);
router.post('/addproduct', multer.uploadImg, dashboardcontroller.addProduct);
router.put('/updateproduct/:id', dashboardcontroller.updateProduct);
router.put('/deleteproduct/:id', dashboardcontroller.deleteProduct);
router.get('/getPaginationProduct/:page/:limit' , dashboardcontroller.getProduactsWithPagination);

router.get('/getcontact', dashboardcontroller.getContact);

//get all the orders
//delete order
//update order

module.exports = router;