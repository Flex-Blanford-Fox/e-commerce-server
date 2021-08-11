const router = require(`express`).Router()
const KeranjangController = require('../controllers/keranjangController')
const {authentication, authorization} = require(`../middlewares/auth`)

router.use(authentication)
router.get('/', KeranjangController.getSemua)
router.delete('/', KeranjangController.deleteKeranjang)
router.post('/:itemId', KeranjangController.tambahKeranjang)
router.delete('/:itemId', KeranjangController.kurangKeranjang)
router.put('/:cartId', KeranjangController.editKeranjang)



module.exports = router