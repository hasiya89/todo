//import { pool } from "../helper/db.js";
import { postRegistration,postLogin } from "../controllers/userController.js";
import  { Router } from "express";
//import { sign } from "jsonwebtoken";

//import { compare } from "bcrypt";
//import { hash } from "bcrypt";
//import jwt from "jsonwebtoken";
//import { insertUser,selectUserByEmail } from "../models/User.js";
//const {sign} = require('jsonwebtoken');




const router = Router();

router.post('/register', postRegistration);
router.post('/login', postLogin);






/*router.post('/register', (req, res, next) => {  
    hash(req.body.password, 10, (error, hashedPassword) => {
        if (error) {
            console.error('Hashing error:', error);
            return next(error);
        }
        try {
            pool.query(
                'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
                [req.body.email, hashedPassword],
                (error, result) => {
                    if (error) return next(error);
                    
                    return res.status(201).json({
                        id: result.rows[0].id,
                        email: result.rows[0].email
                    });

                }
            );
        } catch (error) {
            console.error('Unexpected error:', error);
            next(error);
        }
    });
});



router.post('/login', (req, res, next) => {
    const invalid_message = 'Invalid credentials.';
    try {
        pool.query(
            'SELECT * FROM users WHERE email = $1',
            [req.body.email],
            (error, result) => {
                if (error) return next(error);
                
                // Check if user exists
                if (result.rowCount === 0) {
                    return next(new Error(invalid_message));
                    
                }


                // Compare the provided password with the stored hashed password
                compare(req.body.password,result.rows[0].password, (error, match) => {
                    if (error) return next(error);

                    if (!match) 
                        // Password doesn't match
                        return next(new Error (invalid_message));
                    

                    // Generate token
                    const token = sign({ user: req.body.email }, process.env.JWT_SECRET_KEY);
                    const user = result.rows[0];

                    // Send successful response with user details and token
                    return res.status(200).json({
                        id: user.id,
                        email: user.email,
                        token: token
                    });
                });
            }
        );
    } catch (error) {
        return next(error);
    }
});*/



export default router;


                      