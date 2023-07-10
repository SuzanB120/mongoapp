import express, { request, response } from "express";
const router = express.Router();
import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Account from '../models/Account.js';
import category from "../models/category.js";
import Auth from './auth.js'
import product from "../models/product.js";

router.get('/getProductByCategory/:id', Auth, async(request,response) =>{
    const cid = request.params.id;
    product.find({associateCategory: cid})
    .populate('associateAccount')
    .populate('associateCategory')
    .then(product_added => {
        return response.status(200).json({
            message: allProduct
        });
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        });
    })
})

router.get('/getAllProduct', Auth, async(request,response) =>{
    product.find()
    .populate('associateAccount')
    .populate('associateCategory')
    .then(product_added => {
        return response.status(200).json({
            message: allProduct
        });
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        });
    })
})


router.post('/addProduct',Auth, async(request, response) =>{

    const{
        associateCategory,
        productName,
        productPrice,
        productDescription,
        productImage,
        productStatus
    } = request.body;

    const id = mongoose.Types.ObjectId();

    const _product = new product({
        _id: id,
        associateAccount: request.user._id,
        associateCategory: associateCategory,
        productName :  productName,
        productPrice : productPrice,
        productDescription: productDescription,
        productImage: productImage,
        productStatus: productStatus
    });
    _product.save()
    .then(product_added => {
        return response.status(200).json({
            message: product_added
        });
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        });
    })

    return response.status(200).json({
        message: request.user
    });
})

router.get('/getCategories', async(request ,response) => {
    const categories = await category.find();    
    response.status(200).json({
        categories: categories
    })
})

router.post('/createNewCategory', async(request,response) => {

    const id = new mongoose.Types.ObjectId();
    const categoryName = request.body.categoryName; 
    const _category = new category ({
        _id: id,
        categoryName: categoryName  
    })
    _category.save()
    .then(results => {
        return response.status(200).json({
            results: results
        })
    })
    .catch(error => {console.log(error.message)})
})

//AUTH FUNCTION 
//REGISTER
router.post('/register', async(request,response) => {
    //get account info from body
    const {firstName,lastName,email,password} = request.body;
    //check if user (email) exist
    const isAccountExist = await Account.findOne({email: email});
    if(isAccountExist){
        return response.status(200).json({
            message: 'Account Exist'
        });
    }
    //password crypt
    const hash_password = await bcryptjs.hash(password, 10);
    //create user in db
    const id = mongoose.Types.ObjectId();
    const _account = new Account({
        _id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash_password 
    })
    _account.save()
    .then(results => {
        return response.status(200).json({
            results: results
        })
    })
    .catch(error => {console.log(error.message)})
})
//LOGIN
router.post('/login', async(request,response) => {
    //get account info from client
    const {email,password} = request.body;
    //check if user exist by email
    Account.findOne({email: email})
    .then(async account => {
        if(!account){
            return response.status(200).json({
                message: 'Account not  Exist'
            });
        }
    

    //compare passwords
    const isMatch = await bcryptjs.compare(password, account.password);
    if(!isMatch){
        return response.status(200).json({
            message: 'password not  match'
        });
    }
    //generate JWT token
    const dataToToken = {
        _id: account._id,
        name: account.firstName + " " + account.lastName,
        email: account.email,
        avatar: account.avatar
    }
    const token = await jwt.sign({dataToToken}, process.env.JWT_KEY, {expiresIn:'30d'});
    
    //response
    return response.status(200).json({
        message: account,
        token: token
    })
    })
  
    .catch(error => {
        return response.status(500).json({
            message: error.message
        })
    })

})
export default router;