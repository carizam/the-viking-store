const express = require('express');
const router = express.Router();
const UserDao = require('../models/UserDao');

// Página de login
router.get('/login', (req, res) => {
  res.render('login');
});

// Página de registro
router.get('/register', (req, res) => {
  res.render('register');
});

// Página de productos
router.get('/products', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('products', { user: req.session.user });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
