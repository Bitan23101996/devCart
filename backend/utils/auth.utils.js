const jwt = require('jsonwebtoken');
const response = require('./../libs/responseLib');
require("dotenv").config();
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        // return res.status(401).json({message: 'Authorization header missing'});
        return res.status(401).json(response.generate(true, 'Authorization header missing', 401, null)) 
    }
    const token = authHeader.split(' ')[1];
    if(!token){
        // return res.status(401).json({message: 'Token is missing'});
        return res.status(401).json(response.generate(true, 'Token is missing', 401, null)) 

    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            // return res.status(403).json({message: 'Invalid or expired token'});
            return res.status(403).json(response.generate(true, 'Invalid or expired token', 403, null))
        }
        next();
    })
}
module.exports = authenticateToken;