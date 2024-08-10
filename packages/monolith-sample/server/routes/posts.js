const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/', postController.getPosts);

router.post('/', postController.createPost);

router.post('/:id/like', postController.likePost);

module.exports = router;
