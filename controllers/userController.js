const { User } = require(`../models/index`)
const { comparePassword, hashPassword }  = require(`../helpers/bcrypt`)

const { generateToken } = require("../helpers/jwt")

class UserController {
 
    static login (req, res, next){
        let {email, password} = req.body
        // console.log(hashPassword(password));
        User.findOne({where:{email}})
            .then(data=>{
                if(!data){
                    throw {name:"Username/Password Salah"}
                } else {
                    if(!comparePassword(password, data.password)){
                        throw {name:"Username/Password Salah"}
                    } else {
                        let token = generateToken({id:data.id, email:data.email, role:data.role})
                        res.status(201).json({access_token: token})
                    }
                }
            })
            .catch(err=>{
                next(err)
            })

    }
}

module.exports = UserController