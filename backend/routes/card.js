const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');
const {
  validationCard,
  validationCardId,
} = require('../middlewares/celebrate');

router.get('/cards', auth, getCards);

router.post('/cards', auth, validationCard, createCard);

router.delete('/cards/:cardId', auth, validationCardId, deleteCard);

router.put('/cards/:cardId/likes', auth, validationCardId, likeCard);

router.delete('/cards/:cardId/likes', auth, validationCardId, dislikeCard);

module.exports = {
  router,
};
