import apiData from './constants'

class Api {
  constructor(apiData) {
    this._adress = apiData.adress
  }

  _headerResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  _getTokenFromLocalStorege () {
    return `Bearer ${localStorage.getItem('jwt')}`
  }

  getInfoUser() {
    console.log('Токен получения данных юзера getInfoUser: ',  this._getTokenFromLocalStorege())
    return fetch(`${this._adress}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._getTokenFromLocalStorege(),
        'Content-Type': 'application/json'
      }
    })
      .then(this._headerResponse)
  }

  getInitialCards() {
    console.log('Токен получения данных карточек getInitialCards: ',  this._getTokenFromLocalStorege())
    return fetch(`${this._adress}/cards`, {
      headers: {
        authorization: this._getTokenFromLocalStorege(),
        'Content-Type': 'application/json'
      }
    })
      .then(this._headerResponse)
  }

  getDataUserAndCards() {
    return Promise.all([this.getInfoUser(), this.getInitialCards()]);
  }

  patchEditProfile({ name, about }) {
    return fetch(`${this._adress}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._getTokenFromLocalStorege(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
      .then(this._headerResponse)
  }

  postAddNewCard({ name, link }) {
    return fetch(`${this._adress}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._getTokenFromLocalStorege(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._headerResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._adress}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._getTokenFromLocalStorege(),
        'Content-Type': 'application/json'
      },
    })
      .then(this._headerResponse)
  }

  putHandlerLike(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._adress}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._getTokenFromLocalStorege(),
          'Content-Type': 'application/json'
        },
      })
        .then(this._headerResponse)
    } else {
      return fetch(`${this._adress}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this._getTokenFromLocalStorege(),
          'Content-Type': 'application/json'
        },
      })
        .then(this._headerResponse)
    }
  }

  patchRefreshAvatar({ avatar }) {
    console.log('patchRefreshAvatar API: ', this._getTokenFromLocalStorege())
    return fetch(`${this._adress}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._getTokenFromLocalStorege(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._headerResponse)
  }
}

const api = new Api(apiData)

export default api