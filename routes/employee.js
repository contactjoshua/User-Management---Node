const express = require('express')
const router = express.Router()

const EmployeeController = require('../controllers/EmployeeController')
const upload = require('../middleware/upload')
router.post("/upload", EmployeeController.imageupload)

router.get('/', EmployeeController.index)
router.get('/show/:employeeID',EmployeeController.show)
router.post('/store',upload.single('photo'), EmployeeController.store)
router.put('/update', EmployeeController.update)
router.delete('/delete/:id',EmployeeController.destroy)

module.exports = router
