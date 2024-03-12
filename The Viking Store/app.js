const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const Handlebars = require('express-handlebars');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

// Configuración de la base de datos
mongoose.connect('tu_cadena_de_conexión_a_mongoDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Configuración de Handlebars
app.engine('handlebars', Handlebars());
app.set('view engine', 'handlebars');

// Configuración de middleware
app.use(express.urlencoded({ extended: true })); // Para parsear application/x-www-form-urlencoded
app.use(express.json()); // Para parsear application/json

// Configuración de sesión con almacenamiento en MongoDB
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'tu_cadena_de_conexión_a_mongoDB' }),
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Rutas
app.use('/', indexRouter);
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
