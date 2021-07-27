const {verifyToken} = require(`../helpers/jwt.js`)
const {User, Product} = require(`../models/index`)


function authentication (req, res, next){
    try {
        let decoded = verifyToken(req.headers.access_token)
        User.findByPk(decoded.id)
            .then(data=>{
                if(!data){
                    throw {name:"Authentication Failed!"}
                } else {
                    req.currentUser = {id:data.id, email:data.email, role:data.role}
                    next()
                }
            })
            .catch(err=>{
                next(err)
            })
    } catch (error) {
        throw {name:"Authentication Failed!"}
    }
}

function authorization(req, res, next){
    if(!req.params.id){
        if(req.currentUser.role !== "admin"){
            throw {name:"Authorization Failed!"}
        } else {
            next()
        }
    } else {
        Product.findByPk(req.params.id)
        .then(data=>{
            if(!data){
                throw {name: "Product not found"}
            } else {
                if(req.currentUser.role !== "admin"){
                    throw {name:"Authorization Failed!"}
                } else {
                    next()
                }
            }
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = {authentication, authorization}