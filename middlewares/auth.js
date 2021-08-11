const {verifyToken} = require(`../helpers/jwt.js`)
const {User, Product} = require(`../models/index`)


function authentication (req, res, next){
  console.log(req.headers.access_token, "Sampe Ke sini")
  try {
    let decoded = verifyToken(req.headers.access_token)
    console.log(decoded);
    User.findOne({where:{email:decoded.email}})
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
    } catch (err) {
        next(err)
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
          // console.log(req.params.id);
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