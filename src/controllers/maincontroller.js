import { Products } from '../db/dbFBS.js';

//DATA
// let currentUser;

export const mainPage = async (req, res, next) => {
    try {
        let productsArr = [];

        const dataProducts = await Products.get();
        dataProducts.forEach(product => productsArr.push({ id: product.id, ...product.data() }));

        const userName = req.session.username;

        res.status(200).render('index', { userName, productsArr });
    } catch(err) {
        console.log(err);
    };
};

export const loginFormPage = (req, res, next) => {
    try {
        res.status(200).render('login');
    } catch(err) {
        console.log(err);
    };
};

export const getUserInfo = (req, res, next) => {
    try {
        req.session.username = req.body.nombreUser;
        res.status(201).redirect('/');

    } catch(err) {
        console.log(err);
    };
};

export const addProductPage = (req, res, next) => {
    try {
        res.status(200).render('products');
    } catch(err) {
        console.log(err);
    };
};

export const addNewProduct = async (req, res, next) => {
    try {
        const { nombre, price, stock, url } = req.body;

        const newProduct = {
            name: nombre,
            price,
            stock,
            url
        };

        await Products.add(newProduct);

        res.status(201).redirect('/');
    } catch(err) {
        console.log(err);
    };
};

export const logout = (req, res, next) => {
    try {
        const userName = req.session.username;

        req.session.destroy(err => {
            if(err) {
                res.status(500).redirect('/');
            };

            res.status(200).render('logout', { userName });
        });
    } catch(err) {
        console.log(err);
    };
};