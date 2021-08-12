const {Cart, Product} = require(`../models/index.js`)

class KeranjangController {

  static getSemua (req, res, next) {

    let id = req.params.id
    Cart.findAll({where:{UserId:req.currentUser.id}, include:Product})
      .then(data=>{
        res.status(200).json(data)
      })
      .catch(err=>{
        res.status(500).json("AHHAAHHA")
      })
  }

  static deleteKeranjang (req, res, next){
    let deleted
    Cart.findAll({where:{UserId:req.currentUser.id}})
        .then(data=>{
            // if(data.length === 0){
            //     throw {name:"Product not found!"}
            // } else {
            deleted = data
            return Cart.destroy({where:{UserId:req.currentUser.id}})
            // }
        })
        .then(data=>{
            res.status(200).json(deleted)
        })
        .catch(err=>{
            next(err)
        })
  }

  static tambahKeranjang(req, res, next) {
    let itemId = Number(req.params.itemId)
    Cart.findAll({where:{UserId:req.currentUser.id}, include:Product})
      .then(data=>{
        let stock
        let quantity
        let found = false
        data.forEach(cart => {
          if(cart.ProductId === itemId) {
            found = true
            quantity = cart.quantity
            stock = cart.Product.stock
          }
        })
        // console.log(stock, quantity, found);
        if(found) {
          if(quantity < stock) {
            return Cart.increment('quantity', {by:1, where:{ProductId:itemId}, returning:true})
          } else {
            throw {name: "Stock tidak mencukup"}
          }
        } else {
          return Cart.create({UserId:req.currentUser.id, ProductId:itemId, quantity:1})
        }
      })
      .then(data=>{
        res.status(200).json(data)
      })
      .catch(err=>{
        next(err)
      })
  }

  static kurangKeranjang(req, res, next) {
    let itemId = Number(req.params.itemId)
    Cart.findAll({where:{UserId:req.currentUser.id}, include:Product})
      .then(data=>{
        let stock
        let quantity
        let found = false
        data.forEach(cart => {
          if(cart.ProductId === itemId) {
            found = true
            quantity = cart.quantity
            stock = cart.Product.stock
          }
        })
        console.log(stock, quantity, found);
        if(found) {
          if(quantity > 1) {
            return Cart.increment('quantity', {by:-1, where:{ProductId:itemId}, returning:true})
          } else {
            Cart.destroy({where:{ProductId:itemId}})
          }
        } else {
          throw {name:"Item not available in cart"}
        }
      })
      .then(data=>{
        res.status(200).json(data)
      })
      .catch(err=>{
        next(err)
      })
  }

  static editKeranjang (req, res, next) {
    let id = Number(req.params.cartId)
    let {ProductId, quantity} = req.body
    let UserId = req.currentUser.id
    let batas
    Product.findByPk(ProductId)
      .then(product => {
        batas = product.stock
        return Cart.findByPk(id) 
      })
    .then(cart => {
        // console.log(quantity, "INI QUANTITY");
        // console.log(cart.quantity, "INI CARTTTTT QUANTITY");
        if (quantity > batas) {
          throw {name: "Stock Tidak Mencukup"}
        } else {
          return Cart.update({UserId, ProductId, quantity}, {where: {id}, returning:true})
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = KeranjangController