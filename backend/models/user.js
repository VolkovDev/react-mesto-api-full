/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const isEmail = require('validator/lib/isEmail');
const AuthorisationError = require('../errors/AuthorisationError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validation: {
      validator: (v) => validator.isURL(v),
      message: 'Введите корректную ссылку',
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorisationError('Почта или пароль не верны'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorisationError('Почта или пароль не верны'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
