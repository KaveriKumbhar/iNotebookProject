//const { header } = require('express-validator');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'kaverikumbhar200415';

const fetchuser=(req,res,next)=>{
    //get the user from token and add the user id
    const token = req.header("auth-token");
    if(!token)
    {
        res.status(401).send({error:"PLEASE ENTER RIGHT TOKEN"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user= data.user
        next()
    } catch (error) {
        res.status(401).send({error:"PLEASE ENTER RIGHT TOKEN"})
    }
    
}

module.exports = fetchuser