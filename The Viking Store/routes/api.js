const express = require('express');
const router = express.Router();
const UserDao = require('../models/UserDao');

// Procesar el registro de usuarios
router.post('/sessions/register', async (req, res) => {
  try {
    await UserDao.createUser(req.body);
    res.redirect('/login');
  } catch (error) {
    // Manejo de errores, por ejemplo, si el correo electrónico ya está en uso
    res.status(500).send(error.message);
  }
});

// Procesar el inicio de sesión
router.post('/sessions/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserDao.findUserByEmail(email);
    if (user && await UserDao.validatePassword(user, password)) {
      req.session.user = { id: user._id, name: user.first_name, role: user.role };
      res.redirect('/products');
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
