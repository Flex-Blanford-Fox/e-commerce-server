const {Product} = require (`../models/index`)

class ProductController {
    static getProducts(req, res, next){
        Product.findAll()
            .then(data=>{
                res.status(200).json(data)
            })
            .catch(err=>{
                next(err)
            })
    }

    static findProduct(req, res, next) {
        Product.findOne({where:{id:req.params.id}})
            .then(data=>{
                res.status(200).json(data)
            })
            .catch(err=>{
                next(err)
            })
    }

    static postProduct(req, res, next){
        let {name, image_url, price, stock} = req.body
        // console.log(typeof(price), typeof(stock));
        // if(typeof(price) !== "number" || typeof(stock) !== number){
        //   next ({name:"Price and Stock has to be NUMBER"})
        // } else {
          // let {id, name, email} = req.currentUser
          Product.create({name, image_url, price, stock}, {returning:true})
              .then(data=>{
                  res.status(201).json(data)
              })
              .catch(err=>{
                  next(err)
              })
        // }
    }

    static putProduct (req, res, next){
        let {name, image_url, price, stock} = req.body
        // let UserId = req.currentUser.id
        Product.update({name, image_url, price, stock}, {where: {id:req.params.id}, returning:true})
            .then(data=>{
                res.status(201).json(data)
            })
            .catch(err=>{
                next(err)
            })
    }

    static patchProduct (req, res, next){
        let {stock} = req.body
        Product.update({stock}, {where:{id:req.params.id}, returning:true})
            .then(data=>{
                res.status(201).json(data)
            })
            .catch(err=>{
                next(err)
            })
    }

    static deleteProduct (req, res, next){
        let deleted
        Product.findByPk(req.params.id)
            .then(data=>{
                if(!data){
                    throw {name:"Prooduct not found!"}
                } else {
                    deleted = data
                    return Product.destroy({where:{id:req.params.id}})
                }
            })
            .then(data=>{
                res.status(200).json(deleted)
            })
            .catch(err=>{
                next(err)
            })
    }
}

module.exports = ProductController