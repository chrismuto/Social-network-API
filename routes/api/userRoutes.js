const { 
    getUsers,
    createUser,
    getOneUser
 } = require('../../controllers/userController');
const router = require('express').Router();

//GET /api/users
router.route('/').get(getUsers)
router.route('/:id').get(getOneUser)
router.route('/').post(createUser)

module.exports = router;