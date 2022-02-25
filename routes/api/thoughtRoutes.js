const {
    postThoughts,
    getThoughts,
    getOneThought,
    deleteThought
} = require('../../controllers/thoughtController');
const router = require('express').Router();

//GET /api/thoughts
router.route('/').post(postThoughts)
router.route('/:id').get(getOneThought)
router.route('/').get(getThoughts)
router.route('/:id').delete(deleteThought)

module.exports = router;