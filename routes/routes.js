const router = require(`express`).Router()
const UserController = require("../controllers/userController")
const productRoutes = require (`./productRoutes`)

router.use(`/products`, productRoutes)
router.post(`/login`, UserController.login)



module.exports = router