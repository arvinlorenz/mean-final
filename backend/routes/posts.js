const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const extractFile = require('../middleware/file');
const { createPost, getPosts, getPost, editPost, deletePost,  } = require('../controllers/posts');









router.post(
    '',
    checkAuth,
    extractFile,
    createPost
    );

router.get('', getPosts);

router.put('/:id', extractFile, editPost);



router.get("/:id", getPost);

router.delete('/:id',checkAuth, deletePost);


module.exports = router;