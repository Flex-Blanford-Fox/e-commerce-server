const router = require(`express`).Router()
const UserController = require("../controllers/userController")
const productRoutes = require (`./productRoutes`)
const keranjangRoutes = require('./keranjangRoutes')

router.use(`/products`, productRoutes)
router.use(`/keranjang`, keranjangRoutes)
router.post(`/login`, UserController.login)
router.post(`/register`, UserController.register)




module.exports = router