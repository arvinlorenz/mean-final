const express = require('express');
const router = express.Router();
const {userLogin, createUser } = require('../controllers/users');

router.post("/signup", createUser);

router.post("/login", userLogin);

module.exports = router;