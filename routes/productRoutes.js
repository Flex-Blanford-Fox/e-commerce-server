const ProductController = require("../controllers/productController")
const {authentication, authorization} = require(`../middlewares/auth`)

const router = require(`express`).Router()

router.use(authentication)
router.get(`/`, ProductController.getProducts)
router.use(authorization)
router.post(`/`, ProductController.postProduct)
router.put(`/:id`, ProductController.putProduct)
router.patch(`/:id`, ProductController.patchProduct)
router.delete(`/:id`, ProductController.deleteProduct)

module.exports = router