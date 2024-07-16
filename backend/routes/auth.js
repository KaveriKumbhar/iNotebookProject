const express = require('express')
const User = require('../models/User')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'kaverikumbhar200415';

//ROUTE 1 : -----create s user using : POST "/api/auth/createuser" NO login required-----------
router.post('/createuser', [
    body('name', 'ENTER A VALID NAME').isLength({ min: 2 }),
    body('email', 'ENTER A VALID EMAIL').isEmail(),
    body('password').isLength({ min: 6 }),
], async (req, res) => {

    let success = false;
    //if there are errors then return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }

    //check weather user with the same email is already exist
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success,errors: "Sorry user with this email is already exist" });
        }

        //security of password using hashcode.Here use the bcrypt package
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })


        //create the token
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        //res.json(user);
        success=true;
        res.json({success,authToken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error is occur");
    }
})


//ROUTE 2 : --------Authenticate s user using : POST "/api/auth/login" NO login required-------------


router.post('/login', [
    body('email', 'ENTER A VALID EMAIL').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    //if there are errors then return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        return res.status(400).json({ errors: errors.array() });
    }
    //get the emial and password from user
    const { email, password } = req.body;
   

    //check weather user with the same email is already exist
    try {
        
        let user = await User.findOne({ email })
        if (!user) {
            success=false;
            return res.status(400).json({ success, errors: "Please try to login with corect credential" });
        }

        const passwordCompare =await bcrypt.compare(password,user.password)
        if (!passwordCompare) {
          // success=false;
            return res.status(400).json({ success, errors: "Please try to login with corect credential" });
        }

         //create the token
         const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success,authToken});

    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error is occur");
    }
})

//ROUTE 3 : --------GET A USER DETAILS USING TOKEN : POST "/api/auth/getuser"  login required-------------
router.post('/getuser',fetchuser, async (req, res) => {
try {
    const userId=req.user.id;
    const user = await User.findById(userId).select('-password')
    res.send(user)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error is occur");
}
})

module.exports = router