import { Router } from 'express';
const router = Router();

import { mainPage, loginFormPage, getUserInfo, addProductPage, addNewProduct, logout } from '../controllers/maincontroller.js';

//MIDDLEWARE
function authSesssion(req, res, next) {
    if(req.session.username) {
        next();
    } else {
        res.status(301).redirect('/login');
    };
};

function loginAuthorization(req, res, next) {
    if(req.session.username) {
        res.status(200).redirect('/');
    } else {
        next();
    }
};

//Main route to show products and chats - GET
router.get('/', authSesssion, mainPage);

//route to login - GET
router.get('/login', loginAuthorization, loginFormPage);

//route to login - POST
router.post('/login', loginAuthorization, getUserInfo);

//route products - GET
router.get('/products', authSesssion, addProductPage);

//route create a new product and add to db - POST
router.post('/products', authSesssion, addNewProduct);

//LOGOUT
router.get('/logout', authSesssion, logout);

export default router;