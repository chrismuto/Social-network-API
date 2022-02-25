const { postThoughts, getThoughts, getOneThought } = require('../../controllers/thoughtController');
const router = require('express').Router();

//GET /api/thoughts
router.route('/').post(postThoughts)
router.route('/:id').get(getOneThought)
router.route('/').get(getThoughts)

module.exports = router;